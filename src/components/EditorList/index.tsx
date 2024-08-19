import { useEffect, useState } from "react";

type EditorListProps = {
	users: string[] | null;
};

type UserHovered = {
	index: number;
	hovered: boolean;
};

export default function EditorList({ users }: EditorListProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [userHovered, setUserHovered] = useState<UserHovered[]>([]);

	useEffect(() => {
		// initialize user hovered for tracking

		const userHoveredFromData =
			users?.map((_, index) => ({
				index,
				hovered: false,
			})) || [];

		setUserHovered(userHoveredFromData);
	}, [users]);

	const handleUserHovered = (index: number, hovered: boolean) => {
		const userHoveredCopy = [...userHovered];

		const originalHoveredUser =
			userHoveredCopy.find((user) => user.index == index) || {};

		// replace the target with new hovered state
		Object.assign(originalHoveredUser, {
			index,
			hovered,
		});

		setUserHovered(userHoveredCopy);
	};

	return (
		<div
			className={`absolute right-[20px] bottom-[10vh] text-sm rounded-md p-2 bg-white w-[140px] h-[100px] cursor-pointer 
transition-shadow ${isHovered ? "shadow-2xl" : "shadow-lg"}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="font-semibold mb-2">Current Editors</div>
			{users?.map((user, index) => (
				<div
					className={`transition duration-400 ease-in ${userHovered.length ? (userHovered[index]?.hovered ? "font-semibold" : "font-normal") : ""}`}
					key={index + user}
					onMouseEnter={() => handleUserHovered(index, true)}
					onMouseLeave={() => handleUserHovered(index, false)}
				>
					{user}
				</div>
			))}
		</div>
	);
}
