import { useState } from "react";

type EditorListProps = {
	users: string[] | null;
};

export default function EditorList({ users }: EditorListProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`absolute right-[20px] bottom-[10vh] text-sm rounded-md p-2 bg-white w-[140px] h-[100px] 
transition-shadow ${isHovered ? "shadow-2xl" : "shadow-lg"}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="font-semibold mb-2">Current Editors</div>
			{users?.map((user, index) => (
				<div className="" key={index + user}>
					{user}
				</div>
			))}
		</div>
	);
}
