// components/navbar/MobileMenu.jsx
"use client";
import { SignInButton, SignUpButton, SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CategoriesMobile from "./CategoriesMobile";
export function MobileMenu() {
  const { user } = useUser();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent side="left" className={'overflow-y-scroll'}>
          <VisuallyHidden>
            <DialogTitle>Mobile Menu</DialogTitle>
            <DialogDescription>
              Navigation and user account options
            </DialogDescription>
          </VisuallyHidden>
          <div className="mt-6 space-y-6 px-5">
            <div >
            <p className="text-lg font-semibold">Browse by categories</p>
            <CategoriesMobile />
            </div>
            <div className="my-2">
              <p className="text-lg font-semibold">Account</p>
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" className="w-full text-left">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full text-left">Register</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                {user && (
                  <div className="flex items-center gap-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.fullName}
                      />
                      <AvatarFallback>
                        {user && user.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {user.fullName}
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
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

