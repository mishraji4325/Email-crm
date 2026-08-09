"use client";

import Link from "next/link";

interface Stat {
  label: string;
  value: string | number;
}

interface EntityCardProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  stats?: Stat[];
  href: string;
  buttonText?: string;
  children?: React.ReactNode;
}

export default function EntityCard({
  emoji,
  title,
  subtitle,
  stats = [],
  href,
  buttonText = "Open",
  children,
}: EntityCardProps) {
  return (
    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">
            {emoji} {title}
          </h2>
          {subtitle && (
            <p className="text-gray-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <Link
          href={href}
          className="border rounded-lg px-4 py-2"
        >
          {buttonText}
        </Link>
      </div>

      {stats.length > 0 && (
        <div className="grid grid-cols-3 gap-6 mt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-gray-500 text-sm">
                {stat.label}
              </p>

              <h3 className="text-xl font-bold">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>
      )}

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}