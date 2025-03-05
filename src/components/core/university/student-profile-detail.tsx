"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect } from "react";
import EditStudentForm from "./edit-student";
import { Crown, HomeIcon, IdCard, LucidePhone, MailOpen } from "lucide-react";
import { FIELD_PARAMS } from "@/constant/params";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserFieldProps } from "@/types/user-field";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

const StudentProfileDetail = ({ userData }: UserFieldProps) => {
  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  const studentName = `${capitalize(userData.first_name)} ${capitalize(
    userData.last_name
  )}`;

  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Student", href: "university/student" },
      { label: `${studentName}`, href: "" },
    ]);
  }, [setBreadcrumbs]);
  return (
    <Card className="px-10 py-9 bg-zinc-50 rounded-sm shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-blue-500 text-white text-lg font-bold">
              {userData[FIELD_PARAMS.FIRST_NAME].charAt(0).toUpperCase()}
              {userData[FIELD_PARAMS.LAST_NAME].charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-3">
            <h2 className="text-2xl font-semibold">
              {userData[FIELD_PARAMS.FIRST_NAME]}{" "}
              {userData[FIELD_PARAMS.LAST_NAME]}
            </h2>
            <EditStudentForm userData={userData} />
          </div>
        </div>
        <Badge
          className={
            userData.status
              ? "bg-[#84CC16] text-white"
              : "bg-red-500 text-white"
          }
        >
          {userData.status ? "Active" : "Not Active"}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: "Role ID",
              value: userData[FIELD_PARAMS.ROLE_ID],
              icon: <IdCard size={22} className="text-blue-500" />,
            },
            {
              label: "Licence",
              value: userData[FIELD_PARAMS.LICENSE_NUMBER],
              icon: <Crown size={22} className="text-blue-500" />,
              action: "Remove Licence",
            },
            {
              label: "Email",
              value: userData.email,
              icon: <MailOpen size={22} className="text-blue-500" />,
            },
            {
              label: "Contact",
              value: userData.contact,
              icon: <LucidePhone size={22} className="text-blue-500" />,
            },
            {
              label: "Address",
              value: userData.address,
              icon: <HomeIcon size={22} className="text-blue-500" />,
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="flex items-center rounded-md justify-between px-5 py-6"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
              {item.action && (
                <Button variant="ghost" size="sm">
                  {item.action}
                </Button>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfileDetail;
