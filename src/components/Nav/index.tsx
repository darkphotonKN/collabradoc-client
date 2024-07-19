import { navData } from "@/data/nav";
import styles from "./styles.module.css";
import Link from "next/link";

const Nav = () => {
	return (
		<>
			<nav className={styles.nav}>
				<ul>
					{navData.map((navItem) => (
						<li className={styles.navItem}>
							<Link href={navItem.link}>{navItem.name}</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default Nav;
