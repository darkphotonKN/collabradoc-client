"use client";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";

type LiveSession = {
	sessionId: string;
};

export type Doc = {
	id: number;
	title?: string;
	createdAt?: string;
	updatedAt?: string;
	comment?: string;
	userId?: number;
	liveSession: LiveSession;
};

export default function DocumentBlock({ doc }: { doc: Doc }) {
	return (
		<div className="my-4 py-[12px] px-[15px] flex flex-col gap-2 justify-between w-[240px] h-[140px] border border-black rounded">
			<div>{format(doc.createdAt ?? "", "MMMM do, yyyy")}</div>
			<div>{doc.title}</div>
			<div>{doc.comment}</div>
			<div className="flex justify-between items-between">
				<Link
					href={`/docs-live?documentId=${doc.id}&sessionId=${doc.liveSession.sessionId}`}
				>
					<button className="w-[100px] border border-black rounded cursor-pointer">
						Edit
					</button>
				</Link>
				<button className="w-[100px] border border-black rounded cursor-pointer">
					Preview
				</button>
			</div>
		</div>
	);
}
