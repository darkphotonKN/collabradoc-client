import EditorList from "../EditorList";
import Editor from ".";
import useWebsocketServer from "@/hooks/useWebsocketServer";

type LiveEditorProps = {
	sessionId?: string;
	documentId?: string;
};

export default function LiveEditor({ sessionId, documentId }: LiveEditorProps) {
	// setup websocket
	const { ws, users, systemMsg, systemMsgPopup } = useWebsocketServer({
		sessionId,
		documentId,
	});

	console.log("systemMsgPopup", systemMsgPopup);

	return (
		<div>
			<EditorList users={users} />

			{/* System Message */}
			<div
				className={`absolute top-[95vh] left-1/2 transform -translate-x-1/2 rounded-md border border-gray-900 p-2 transition ease-in duration-350 ${systemMsgPopup ? "opacity-100 -translate-y-[15px]" : "opacity-0"}`}
			>
				{systemMsg}
			</div>
			<div className="py-[20px] px-[80px] bg-gray-400">
				<Editor ws={ws} />
			</div>
		</div>
	);
}
