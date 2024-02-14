"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useSignOut } from "@/modules/auth";
import {
  ChevronDownIcon,
  CircleIcon,
  CrossCircledIcon,
  SlashIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

export const AccountsList: React.FC<{
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
    <AccountsListComponent
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

const AccountsListComponent: React.FC<{
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
    <div className="space-y-6 min-h-dvh flex flex-col justify-center">
      <header className="space-y-2">
        <nav className="flex gap-x-1 items-center">
          <Link href="/">
            <Button className="px-1 h-fit text-muted-foreground" variant="link">
              Home
            </Button>
          </Link>
          <SlashIcon className="h-3 w-3" />
          <Link href="/settings">
            <Button className="px-1 h-fit text-muted-foreground" variant="link">
              Settings
            </Button>
          </Link>
        </nav>
        <h2 className="font-semibold text-4xl">Settings</h2>
        <p>{preferredName ? `Hello, ${preferredName}!` : "Hi there!"}</p>
      </header>
      <div className="space-y-6">
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
              {isLoading && (
                <CircleIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
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
