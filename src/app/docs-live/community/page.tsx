"use client";
import LiveEditor from "@/components/Editor/LiveEditor";
import LiveEditorCommunity from "@/components/Editor/LiveEditorCommunity";
import { useSearchParams } from "next/navigation";

export default function DocsLiveCommunity() {
  const params = useSearchParams();
  const documentId = params.get("documentId");

  if (!documentId) {
    return <LiveEditorError />;
  }

  console.log("page documentId:", documentId);
  return <LiveEditorCommunity documentId={documentId ? documentId : ""} />;
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
