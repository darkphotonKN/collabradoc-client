import Nav from "@/components/Nav";
import PageTitle from "@/components/PageTitle";

function Header() {
	return (
		<div className="p-4">
			<PageTitle title="Collabradoc" />
			<div className="flex justify-end">
				<Nav />
			</div>
		</div>
	);
}

export default Header;
