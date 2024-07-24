import Nav from "@/components/Nav";
import MainTitle from "@/components/MainTitle";

function Header() {
	return (
		<div className="p-4 border-b border-black">
			<MainTitle title="Collabradoc" />
			<div className="flex justify-end">
				<Nav />
			</div>
		</div>
	);
}

export default Header;
