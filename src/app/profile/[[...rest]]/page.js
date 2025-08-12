import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fefefe] pt-5">
    <UserProfile appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "border-0 shadow-none bg-transparent",
              navbar: "border-0",
              navbarButton: "border-0"
            }
          }}/>
    </div>
  );
}
