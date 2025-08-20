import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { User, Heart, ShoppingBag } from "lucide-react";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import ProfileOrders from "@/features/profile/components/ProfileOrders";
import ProfileWishList from "@/features/profile/components/ProfileWishList";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:px-10 lg:px-50 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white font-inter">
        My Profile
      </h1>

      <Tabs defaultValue="profile" className="w-full">
        {/* Tabs Header */}
        <TabsList className="flex flex-wrap md:flex-nowrap gap-2 justify-start md:justify-between overflow-x-auto">
          <TabsTrigger value="profile" className="flex-1 flex items-center font-inter">
            <User className="h-4 w-4" />

            Profile
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex-1 flex items-center font-inter">
            <Heart className="h-4 w-4" />

            Wishlist
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex-1 flex items-center font-inter">
            <ShoppingBag className="h-4 w-4" />

            Orders
          </TabsTrigger>
        </TabsList>

        {/* Content */}
        <div className="mt-6">
          <TabsContent value="wishlist">
            <ProfileWishList />
          </TabsContent>

          <TabsContent value="orders">
            <ProfileOrders />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
