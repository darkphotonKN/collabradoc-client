import Button from "../Button";

type ModalProps = {
	height?: number;
	width?: number;
};

function Modal({ height = 300, width = 350 }: ModalProps) {
	// className= {`absolute w-[350px] h-[300px] bg-white rounded-2xl border border-customBorderGray`
	return (
		<div className="flex justify-center items-center w-screen h-full position fixed bg-gray-700 bg-opacity-40">
			<div
				className={`flex flex-col p-4 w-[${width}px] h-[${height}px] bg-white rounded-2xl border border-customBorderGray`}
			>
				{/* Title Area */}
				<div className="flex-grow h-[12%] font-semibold">Confirm</div>

				{/* Content Area */}
				<div className="flex-grow h-[60%]">Some content</div>

				{/* Action Area */}
				<div className="flex-grow h-[28%] flex gap-3">
					<Button text="Confirm" />

					<Button text="Cancel" color="bg-red-500" />
				</div>
			</div>
		</div>
	);
}
export default Modal;
