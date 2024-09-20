import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
export default function UserAvatar({ image }: { image?: string }) {
  return (
    <div>
      {image ? (
        <Image src={getImageUrl(image)} width={30} height={30} alt="user" className="rounded-full h-10 w-10" />
      ) : (
        <Image src="/avatar.svg" width={30} height={30} alt="logo" className="rounded-full"/>
      )}
    </div>
  );
}
