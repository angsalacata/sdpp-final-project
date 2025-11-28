"use client";
// USE SINGLE QUOTES NOT BACK QUOTES

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "home", href: "/"},
  { name: "info", href: "/info" },
  { name: "archive", href: "/archive" },
  { name: "schedule", href: "/schedule" },
];

export default function NavLinks() {
  const currPathName = usePathname();

  return (
    <>
      {links.map((link) => {
        const selectclass = currPathName == link.href ? "selected" : "noselect";
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("menu-link", selectclass)}
          >
            <span className={selectclass}>(</span>
            {link.name}
            <span className={selectclass}>)</span>
          </Link>
        );
      })}
    </>
  );
}
