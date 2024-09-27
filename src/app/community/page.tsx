"use client";
import DocumentBlock, { Doc } from "@/components/DocumentList/DocumentBlock";
import useData from "@/hooks/useData";

export default function CommunityPage() {
  const { response, error } = useData<Doc[], any>("/doc/community");

  console.log("response:", response);

  return (
    <div className="py-[40px] px-[60px]">
      <div className="font-semibold text-[20px] text-right">Community</div>

      {response?.data?.map((doc) => (
        <DocumentBlock key={doc.id} doc={doc} communityDoc />
      ))}
    </div>
  );
}
