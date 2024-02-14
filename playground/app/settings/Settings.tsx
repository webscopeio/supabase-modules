"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetProfile } from "@/modules/profile";
import {
  CircleIcon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import * as React from "react";
import { AccountsList } from "./AccountsList";

export const Settings: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, isError, error } = useGetProfile({ id: userId });

  if (isLoading) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <CircleIcon className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-dvh flex flex-col py-6">
        <Alert variant="destructive">
          <CrossCircledIcon className="h-4 w-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Unknown error"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-dvh flex flex-col py-6">
        <Alert>
          <InfoCircledIcon className="h-4 w-4" />
          <AlertTitle>No data found!</AlertTitle>
          <AlertDescription>
            Please contact the administrator for more information.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <AccountsList
      username={data.username}
      preferredName={data.preferred_name}
      email={data.email}
    />
  );
};
