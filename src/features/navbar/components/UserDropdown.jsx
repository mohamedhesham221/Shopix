// components/navbar/UserDropdown.jsx
"use client";
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	SignOutButton,
	useUser,
} from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";
export function UserDropdown() {
	const { user } = useUser();

	return (
		<div className="hidden md:block">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<SignedOut>
						<span className="flex items-center gap-2 cursor-pointer">
							<Avatar>
								<AvatarImage
									src="/assets/avatar-guest.png"
									alt="Guest Icon"
									className="opacity-70"
								/>
								<AvatarFallback>G</AvatarFallback>
							</Avatar>
							<span className="font-inter">Sign in</span>
						</span>
					</SignedOut>
					<SignedIn>
						<Avatar className="cursor-pointer">
							{user && user.imageUrl && (
								<AvatarImage src={user.imageUrl} alt={user.fullName} />
							)}
							<AvatarFallback>
								{user && user.firstName.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</SignedIn>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className={"relative z-[9999]"}>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<SignedIn>
						{user && (
							<div className="flex flex-col items-center gap-1 px-2">
								<span className="text-sm font-medium">{user.fullName}</span>
								<span className="text-sm font-medium text-gray-600">
									{user.emailAddresses[0]?.emailAddress || "No email"}
								</span>
							</div>
						)}
						<DropdownMenuSeparator />
						<SignOutButton>
							<Button
								variant="destructive"
								className="w-full hover:bg-red-900 cursor-pointer"
							>
								Sign Out
							</Button>
						</SignOutButton>
					</SignedIn>
					<SignedOut>
						<SignInButton>
							<DropdownMenuItem>
								<Button variant="outline" className="w-full text-left">
									Login
								</Button>
							</DropdownMenuItem>
						</SignInButton>
						<SignUpButton>
							<DropdownMenuItem>
								<Button className="w-full text-left">Register</Button>
							</DropdownMenuItem>
						</SignUpButton>
					</SignedOut>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
