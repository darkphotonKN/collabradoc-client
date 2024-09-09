"use client";
import DocumentBlock, { Doc } from "@/components/DocumentList/DocumentBlock";
import useData from "@/hooks/useData";

type ApiRes<T> = {
  status: number;
  message: string;
  data: T;
};

export default function Docs() {
  const { data, error } = useData<any, ApiRes<Doc[]>>("/doc", [], true);
  const { data: liveInviteData, error: liveInviteError } = useData<
    any,
    ApiRes<Doc[]>
  >("/livesession/all-invites", [], true);

  console.log("data:", data);
  console.log("error", error);

  console.log("liveInviteData:", liveInviteData);
  console.log("liveInviteError", liveInviteError);

  return (
    <div className="py-[40px] px-[60px]">
      <div className="font-semibold text-[20px] text-right">Documents</div>

      {/* Document List */}
      <div className="flex flex-row align-center justify-center gap-[120px]">
        {/* Personal */}
        <div>
          <div className="font-semibold">Personal</div>
          {data?.data?.map((document: Doc) => (
            <DocumentBlock doc={document} key={document.id} />
          ))}
        </div>

        {/* Invited  */}
        <div>
          <div className="font-semibold">Invited</div>

          {liveInviteData?.data?.map((document: Doc) => (
            <DocumentBlock doc={document} key={document.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
