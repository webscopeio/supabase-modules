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
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

export const AccountsList: React.FC<{ userId: string }> = ({ userId }) => {
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
      userId={userId}
      signOut={signOut}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
    />
  );
};

const AccountsListComponent: React.FC<{
  userId: string;
  signOut: () => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({ userId, signOut, isLoading, isError, errorMessage }) => {
  return (
    <div className="space-y-6 min-h-screen flex flex-col justify-center">
      <header className="space-y-2">
        <h2 className="font-semibold text-4xl">Accounts</h2>
        <p>Hello, {userId}!</p>
      </header>
      <div className="space-y-6">
        <div className="flex gap-x-4 items-center">
          <Avatar>
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">Hector Sosa</h4>
            <p>hello@hectorsosa.me</p>
          </div>
          <div className="flex ml-auto items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
            {false && (
              <>
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
              </>
            )}
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
                <DropdownMenuItem disabled={true}>
                  <Link href="/settings/account">Account settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <TrashIcon className="mr-2 h-4 w-4" /> Remove account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <Avatar>
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">Hector Sosa (Work)</h4>
            <p>sosa@webscope.io</p>
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
                <DropdownMenuItem disabled={false}>
                  <Link href="/settings/account">Account settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
      <footer>
        <Link href="/">
          <Button variant="link">Go Home</Button>
        </Link>
      </footer>
    </div>
  );
};
