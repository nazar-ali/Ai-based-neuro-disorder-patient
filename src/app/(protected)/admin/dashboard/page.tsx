"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PendingUsers from "@/components/PendingUsers";
import ApprovedUsers from "@/components/Approved";
import RejectedUsers from "@/components/RejectUser";

export default function UsersTabsPage() {

  return (
    <div className="p-3">
      <div className="bg-white shadow-lg rounded-2xl p-6 border p-3 border-gray-200">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          User Management
        </h1>

        <Tabs defaultValue="pending" className="">
          <TabsList className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">

            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600
                         data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              Pending Users
            </TabsTrigger>

            <TabsTrigger
              value="approved"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600
                         data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              Approved Users
            </TabsTrigger>

            <TabsTrigger
              value="rejected"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600
                         data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              Rejected Users
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="pending">
              <PendingUsers />
            </TabsContent>

            <TabsContent value="approved">
              <ApprovedUsers />
            </TabsContent>

            <TabsContent value="rejected">
              <RejectedUsers />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      
    </div>
  );
}
