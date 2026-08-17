import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { prisma } from "../lib/prisma.js";

function pickField(
  row: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  const normalized = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key.trim().toLowerCase().replace(/^\ufeff/, ""),
      value,
    ])
  );

  for (const key of keys) {
    const value = normalized[key.toLowerCase()];
    if (value != null && String(value).trim() !== "") {
      return String(value).trim();
    }
  }

  return undefined;
}

export default async function importLeads(req: AuthRequest, res: Response) {
  try {
    const rows = req.body;

    if (!Array.isArray(rows)) {
      return res.status(400).json({ message: "Request body must be an array of leads" });
    }

    const formattedLeads = rows
      .map((row: Record<string, unknown>) => {
        const name = pickField(row, "name");
        const emails = pickField(row, "email", "emails", "e-mail", "email address");
        const company = pickField(row, "company", "organization", "org");
        const role = pickField(row, "role", "title", "job title");

        if (!name || !emails) {
          return null;
        }

        return {
          name,
          emails,
          company: company ?? null,
          role: role ?? null,
          userId: req.userId!,
        };
      })
      .filter((lead): lead is NonNullable<typeof lead> => lead !== null);

    if (formattedLeads.length === 0) {
      return res.status(400).json({
        message:
          "No valid leads found. Each row needs name and email (or emails) columns.",
      });
    }

    const result = await prisma.lead.createMany({
      data: formattedLeads,
    });

    res.json({
      message: "Leads imported successfully",
      imported: result.count,
      skipped: rows.length - formattedLeads.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error importing leads" });
  }
}
