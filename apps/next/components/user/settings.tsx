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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetProfile } from "@/modules/user/profile";
import { useSignOut } from "@/modules/user/auth";

export const Settings: React.FC<{ userId: string }> = ({ userId }) => {
  // #region useGetProfile
  const { data, isLoading, isError, error } = useGetProfile({ id: userId });
  // #endregion useGetProfile

  if (isLoading) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center">
        <div className="animate-pulse">
          <CircleIcon className="size-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-dvh flex-col py-6">
        <Alert variant="destructive">
          <CrossCircledIcon className="size-4" />
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
      <div className="flex min-h-dvh flex-col py-6">
        <Alert>
          <InfoCircledIcon className="size-4" />
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

  // #region useSignOut
  const {
    mutate: signOut,
    isPending,
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
  // #endregion useSignOut

  return (
    <SettingsComponent
      username={username}
      preferredName={preferredName}
      email={email}
      signOut={signOut}
      isPending={isPending}
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
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({
  username,
  preferredName,
  email,
  signOut,
  isPending,
  isError,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col space-y-6">
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
        <h2 className="text-4xl font-semibold">Settings</h2>
        <p>{preferredName ? `Hello, ${preferredName}!` : "Hi there!"}</p>
      </header>
      <div className="flex items-center gap-x-4">
        <Avatar>
          <AvatarImage src="https://ui.shadcn.com/avatars/04.png" />
          <AvatarFallback>
            {username.toUpperCase().substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold">{username}</h4>
          <p>{email}</p>
        </div>
        <div className="bg-secondary text-secondary-foreground ml-auto flex items-center space-x-1 rounded-md">
          <Button
            onClick={() => signOut()}
            disabled={isPending}
            variant="secondary"
            className="px-3 shadow-none"
          >
            {isPending && <CircleIcon className="mr-2 size-4 animate-spin" />}
            Sign out
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDownIcon className="text-secondary-foreground size-4" />
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
                <TrashIcon className="mr-2 size-4" /> Remove account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isError && (
        <Alert variant="destructive">
          <CrossCircledIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{errorMessage ?? "Unknown error"}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
