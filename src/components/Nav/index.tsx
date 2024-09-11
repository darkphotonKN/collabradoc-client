"use client";
import { navData } from "@/data/nav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Nav() {
  const pathname = usePathname();

  return (
    <nav className="mt-[100px]">
      <ul className="flex flex-col gap-4">
        {navData.map((navItem) => (
          <li
            key={navItem.link}
            className={`w-full transition-colors duration-200 ease-in
							hover:text-gray-500 cursor-pointer ${navItem.link === pathname ? "font-semibold" : ""}`}
          >
            <Link href={navItem.link}>
              <div className="flex gap-2">{navItem.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
