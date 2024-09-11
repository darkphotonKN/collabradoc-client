"use client";
import { createLiveSession } from "@/lib/auth/live-session";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
	const [hover, setHover] = useState(false);
	const router = useRouter();

	// create live session when user attempts to edit document
	async function handleLiveSession() {
		const liveSessionLink = await createLiveSession(doc.id);
		console.log("liveSessionLink:", liveSessionLink);

		if (liveSessionLink) {
			router.push(liveSessionLink);
		}
	}

	// custom hover timing
	function handleHover(hoverState: boolean) {
		setTimeout(() => setHover(hoverState), 100);
	}

	return (
		<div
			className={
				"my-4 p-5 flex flex-col gap-2 justify-between w-[260px] h-[180px] border border-customBorderGray rounded-2xl transition-shadow shadow-customBlockShadow hover:shadow-customBlockShadowHover"
			}
		>
			<div>{format(doc.createdAt ?? "", "MMMM do, yyyy")}</div>
			<div>{doc.title}</div>
			<div>{doc.comment}</div>
			<div className="flex">
				<button
					onClick={handleLiveSession}
					className="text-sm h-[32px] w-[32px] hover:w-[60px] transition-all duration-300 rounded-[50%] hover:rounded-3xl border border-customBorderGray cursor-pointer"
					onMouseEnter={() => handleHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					{doc.liveSession.sessionId ? (
						<div className="flex gap-2 justify-center items-center content-center">
							<Image
								height={15}
								width={15}
								alt={"edit-icon"}
								src={"/images/edit-icon.png"}
							/>
							{hover ? "edit" : ""}
						</div>
					) : (
						<div className="flex justify-between items-center content-center">
							<Image
								height={15}
								width={15}
								alt={"edit-icon"}
								src={"/images/edit-icon.png"}
							/>
							{hover ? "Create" : ""}
						</div>
					)}
				</button>
			</div>
		</div>
	);
}
