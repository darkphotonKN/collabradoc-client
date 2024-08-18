"use client";
import LiveEditor from "@/components/Editor/LiveEditor";
import { useSearchParams } from "next/navigation";

export default function DocsLive() {
  const params = useSearchParams();
  const sessionId = params.get("sessionId");
  const documentId = params.get("documentId");

  if (!sessionId || !documentId) {
    return <LiveEditorError />;
  }

  console.log("@live query:", params);
  return <LiveEditor sessionId={sessionId} documentId={documentId} />;
}

function LiveEditorError() {
  return (
    <div>
      <h2>
        Request to Access this Document has been{" "}
        <span className="font-semibold">Denied</span>.
      </h2>
    </div>
  );
}
