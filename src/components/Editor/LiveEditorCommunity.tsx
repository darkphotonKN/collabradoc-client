import EditorList from "../EditorList";
import Editor from ".";
import EditorOptions from "./EditorOptions";
import useWebsocketCommunityServer from "@/hooks/useWebsocketCommunityServer";

type LiveEditorProps = {
  documentId: string;
};

export default function LiveEditorCommunity({ documentId }: LiveEditorProps) {
  // setup websocket server connection and state
  const { ws, communitySessionAuthorized, users, systemMsg, systemMsgPopup } =
    useWebsocketCommunityServer({
      documentId,
    });

  console.log("communitySessionAuthorized", communitySessionAuthorized);

  if (!communitySessionAuthorized) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        This document is not public and available for editing in the community.
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
