"use client";
import { useEffect, useState } from "react";

type EditorProps = {
	ws: WebSocket | null;
};

function Editor({ ws }: EditorProps) {
	const [editorContent, setEditorContent] = useState("");

	function handleEditorContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setEditorContent(event.target.value);
	}

	useEffect(() => {
		if (editorContent) {
			console.log("sending back to websocket");
			ws?.send(JSON.stringify({ action: "edit", value: editorContent }));
		}
	}, [editorContent]);

	console.log("editorContent:", editorContent);
	console.log("editorContent newlines:", editorContent.split("\n"));

	return (
		<div className="mt-4 rounded bg-white w-full h-screen px-[40px] py-[35px]">
			<textarea
				className="h-full w-full resize-none outline-none border-none"
				onChange={handleEditorContent}
				value={editorContent}
			/>
		</div>
	);
}

export default Editor;
