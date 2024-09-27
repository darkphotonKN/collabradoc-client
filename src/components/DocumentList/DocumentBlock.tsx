"use client";
import { Privacy } from "@/constants/doc";
import { isErrorResponse, patchRequest } from "@/lib/api/requestHelpers";
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
  privacy?: string;
  liveSession: LiveSession;
  averageRating?: number;
};

export default function DocumentBlock({
  doc,
  communityDoc,
}: {
  doc: Doc;
  communityDoc: boolean;
}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [blockHover, setBlockHover] = useState(false);

  // create live session when user attempts to edit document
  async function handleLiveSession(isPrivateDoc: boolean) {
    if (!isPrivateDoc) {
      return;
    }

    // only create live session if this is not a community document
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

  // makes document public to be shared to the entire community
  async function handleTogglePrivacy(docId: number) {
    const res = await patchRequest<Doc>(`/doc/privacy/${docId}`, {}, true);

    if (isErrorResponse(res)) {
      console.log("Error while toggling privacy:", res.message);
    }
  }

  function renderRating(rating?: number) {
    if (!rating) {
      return null;
    }

    const ratingTiers = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    let ratingTierIndex = 0;
    let smallestDiff: number;

    // find closest rating, store index of the closest rating
    ratingTiers.forEach((tierVal, index) => {
      const diff = Math.abs(rating - tierVal);

      if (index == 0) {
        // store it no matter what on the first iteration
        smallestDiff = diff;
      }
      // else we only update the largest difference when its smaller
      else if (diff < smallestDiff) {
        smallestDiff = diff;
        ratingTierIndex = index;
      }
    });

    const ratingsArrLength = Math.floor(ratingTiers[ratingTierIndex]);
    const ratingsArr = new Array(ratingsArrLength).fill(0);
    const stars = ratingsArr.map((rating) => (
      <Image
        key={rating}
        width={16}
        height={16}
        src="/images/star-icon.png"
        alt="star-icon"
      />
    ));

    // add on half array if that rating tier value had a 0.5, i.e. its an odd index
    if (ratingTierIndex % 2 != 0) {
      stars.push(
        <Image
          key={rating}
          width={16}
          height={18}
          src="/images/half-star-icon.png"
          alt="star-icon"
        />,
      );
    }

    return stars;
  }

  return (
    <div
      className={
        "bg-white text-md my-4 p-5 flex flex-col gap-2 justify-between w-[260px] h-[180px] border border-customBorderGray rounded-2xl transition-shadow shadow-customBlockShadow hover:shadow-customBlockShadowHover"
      }
      onMouseEnter={() => setBlockHover(true)}
      onMouseLeave={() => setBlockHover(false)}
    >
      <div className="flex justify-between">
        <div className="text-xs">
          {format(doc.createdAt ?? "", "MMMM do, yyyy")}
        </div>

        {blockHover && (doc.privacy === Privacy.PRIVATE || !communityDoc) && (
          <Image
            className="cursor-pointer"
            height={18}
            width={18}
            alt={"edit-icon"}
            src={"/images/privacy-icon.png"}
            onClick={() => handleTogglePrivacy(doc.id)}
          />
        )}
      </div>
      <div className="font-medium">{doc.title}</div>
      <div>{doc.comment}</div>

      {/* Rating */}
      <div className="flex gap-1">{renderRating(doc.averageRating)}</div>

      <div className="flex">
        <button
          onClick={() => handleLiveSession(doc.privacy === Privacy.PRIVATE)}
          className="text-sm h-[32px] w-[32px] hover:w-[74px] transition-all duration-300 rounded-[50%] hover:rounded-3xl border border-customBorderGray cursor-pointer"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="flex gap-2 justify-center items-center content-center">
            {hover ? "Edit" : ""}
            <Image
              height={15}
              width={15}
              alt={"edit-icon"}
              src={"/images/edit-icon.png"}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
