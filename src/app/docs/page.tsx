"use client";
import DocumentBlock, { Doc } from "@/components/DocumentList/DocumentBlock";
import useData from "@/hooks/useData";

type ApiRes<T> = {
  status: number;
  message: string;
  data: T;
};

export default function Docs() {
  const { response, error } = useData<any, ApiRes<Doc[]>>("/doc", [], true);
  const { response: liveInviteResponse, error: liveInviteError } = useData<
    any,
    ApiRes<Doc[]>
  >("/livesession/all-invites", [], true);

  console.log("response:", response);
  console.log("error", error);

  console.log("liveInviteResponse:", liveInviteResponse);
  console.log("liveInviteError", liveInviteError);

  return (
    <div className="py-[40px] px-[60px]">
      <div className="font-semibold text-[20px] text-right">Documents</div>

      {/* Document List */}
      <div className="flex flex-row align-center justify-center gap-[120px]">
        {/* Personal */}
        <div>
          <div className="font-semibold">Personal</div>
          {response?.data?.map((document: Doc) => (
            <DocumentBlock doc={document} key={document.id} />
          ))}
        </div>

        {/* Invited  */}
        <div>
          <div className="font-semibold">Invited</div>

          {liveInviteResponse?.data?.map((document: Doc) => (
            <DocumentBlock doc={document} key={document.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
