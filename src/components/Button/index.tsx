import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
	text: string;
	width?: number;
	height?: number;
	color?: string;
	onClick?: () => any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ text, color, type, width, height, onClick }: ButtonProps) {
	const widthVal = width ? `w-[${width}px]` : "w-full";
	const heightVal = height ? `h-[${height}px]` : "h-auto";

	console.log("@Button height:", height);
	console.log("@Button heightVal:", heightVal);
	return (
		<button
			type={type}
			className={`${widthVal} ${heightVal} rounded border text-white ${color ? color : "bg-gray-700"} hover:bg-gray-300 p-2 mt-8 hover:text-gray-500 transition`}
			onClick={onClick ? onClick : undefined}
		>
			{text}
		</button>
	);
}

export default Button;
