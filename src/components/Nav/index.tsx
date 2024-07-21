import { navData } from "@/data/nav";
import Link from "next/link";

function Nav() {
  return (
    <>
      <nav className="mt-3 mr-4">
        <ul className="flex gap-3">
          {navData.map((navItem) => (
            <li
              key={navItem.link}
              className="-gray-900 transition-colors duration-200 ease-in
							hover:text-gray-500 cursor-pointer"
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
