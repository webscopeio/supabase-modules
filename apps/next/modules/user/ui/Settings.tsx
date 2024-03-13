"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CircleIcon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDownIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetProfile, useSignOut } from "@/modules/user/hooks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    <SettingsContainer
      username={data.username}
      preferredName={data.preferred_name}
      email={data.email}
    />
  );
};

export const SettingsContainer: React.FC<{
  username: string;
  preferredName: string | null;
  email: string;
}> = ({ username, preferredName, email }) => {
  const router = useRouter();

  const {
    mutate: signOut,
    isPending: isLoading,
    isError,
    error,
  } = useSignOut({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });
  return (
    <SettingsComponent
      username={username}
      preferredName={preferredName}
      email={email}
      signOut={signOut}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
    />
  );
};

const SettingsComponent: React.FC<{
  username: string;
  preferredName: string | null;
  email: string;
  signOut: () => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({
  username,
  preferredName,
  email,
  signOut,
  isLoading,
  isError,
  errorMessage,
}) => {
  return (
    <div className="space-y-6 flex flex-col">
      <header className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/settings">Settings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="font-semibold text-4xl">Settings</h2>
        <p>{preferredName ? `Hello, ${preferredName}!` : "Hi there!"}</p>
      </header>
      <div className="flex gap-x-4 items-center">
        <Avatar>
          <AvatarImage src="https://ui.shadcn.com/avatars/04.png" />
          <AvatarFallback>
            {username.toUpperCase().substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold">@{username}</h4>
          <p>{email}</p>
        </div>
        <div className="flex ml-auto items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button
            onClick={() => signOut()}
            disabled={isLoading}
            variant="secondary"
            className="px-3 shadow-none"
          >
            {isLoading && <CircleIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign out
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuItem>
                <Link href="/settings/profile">Profile settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings/account">Account settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={true}>
                <TrashIcon className="mr-2 h-4 w-4" /> Remove account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isError && (
        <Alert variant="destructive">
          <CrossCircledIcon className="h-4 w-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{errorMessage ?? "Unknown error"}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
