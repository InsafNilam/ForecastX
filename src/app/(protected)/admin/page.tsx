"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const onAPIRouteClick = () => {
    fetch("api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route");
        console.log("OKAY");
      } else {
        toast.error("Forbidden API Route");
        console.error("FORBIDDEN");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success("Allowed API Route");
        console.log("OKAY");
      }
      if (data.error) {
        toast.error("Forbidden API Route");
        console.error("FORBIDDEN");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole="ADMIN">
          <FormSuccess message="Allowed to see the Content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">ADMIN ONLY API ROUTE</p>
          <Button onClick={onAPIRouteClick}>Click to Test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">ADMIN ONLY SERVER ROUTE</p>
          <Button onClick={onServerActionClick}>Click to Test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
