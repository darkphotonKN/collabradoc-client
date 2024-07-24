"use client";
import { navData } from "@/data/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Nav() {
  const pathname = usePathname();

  console.log(" pathname:", pathname);

  return (
    <>
      <nav className="mt-3 mr-4">
        <ul className="flex gap-3">
          {navData.map((navItem) => (
            <li
              key={navItem.link}
              className={`-gray-900 transition-colors duration-200 ease-in
							hover:text-gray-500 cursor-pointer ${navItem.link === pathname ? "font-semibold" : ""}`}
            >
              <Link href={navItem.link}>{navItem.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
