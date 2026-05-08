import { prisma } from "./lib/prisma";

async function testDB() {
  await prisma.user.findMany();
  console.log("DB Connected");
}

testDB();