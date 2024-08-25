import EditorList from "../EditorList";
import Editor from ".";
import useWebsocketServer from "@/hooks/useWebsocketServer";
import EditorOptions from "./EditorOptions";

type LiveEditorProps = {
	sessionId?: string;
	documentId?: string;
};

export default function LiveEditor({ sessionId, documentId }: LiveEditorProps) {
	// setup websocket
	const { ws, liveSessionAuthorized, users, systemMsg, systemMsgPopup } =
		useWebsocketServer({
			sessionId,
			documentId,
		});

	console.log("systemMsgPopup", systemMsgPopup);

	if (!liveSessionAuthorized) {
		return (
			<div className="h-[100vh] flex justify-center items-center">
				You are unauthorized to view this page. Please request an invite or ask
				check your email for unaccepted ones.
			</div>
		);
	}

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
				{/* Editor Options*/}
				<EditorOptions />

				{/* Document Editor*/}
				<Editor ws={ws} />
			</div>
		</div>
	);
}
