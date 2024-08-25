"use client";
import { createLiveSession } from "@/lib/auth/live-session";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
	const router = useRouter();

	// create live session when user attempts to edit document
	async function handleLiveSession() {
		const liveSessionLink = await createLiveSession(doc.id);

		if (liveSessionLink) {
			router.push(liveSessionLink);
		}
	}

	return (
		<div className="my-4 py-[12px] px-[15px] flex flex-col gap-2 justify-between w-[260px] h-[140px] border border-black rounded">
			<div>{format(doc.createdAt ?? "", "MMMM do, yyyy")}</div>
			<div>{doc.title}</div>
			<div>{doc.comment}</div>
			<div className="flex">
				<button
					onClick={handleLiveSession}
					className="w-[100px] border border-black rounded cursor-pointer"
				>
					{doc.liveSession.sessionId ? "edit" : "create"}
				</button>
			</div>
		</div>
	);
}
