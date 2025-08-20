"use client";

import * as React from "react";
import { UserProfile } from "@clerk/nextjs";
import { ScrollArea } from "@/shared/ui/scroll-area";

const ProfileInfo = () => {
	return (
		<>
			<ScrollArea className="h-[80vh] rounded-md border p-4">
				<UserProfile
					appearance={{
						elements: {
							rootBox: "w-full",
							card: "shadow-none border-0 bg-transparent w-full",
							navbar: "hidden",
						},
					}}
				/>
			</ScrollArea>
		</>
	);
};

export default ProfileInfo;
