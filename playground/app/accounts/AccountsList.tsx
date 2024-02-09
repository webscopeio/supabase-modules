"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/modules/auth";
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
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
    <div className="space-y-4">
      <header className="space-y-2">
        <h2 className="font-semibold text-4xl">Sign in</h2>
        <p>Hello, {userId}!</p>
      </header>
      <Button onClick={() => signOut()} disabled={isLoading} className="w-full">
        {isLoading && <CircleIcon className="mr-2 h-4 w-4 animate-spin" />}
        Sign out
      </Button>
      {isError && (
        <Alert variant="destructive">
          <CrossCircledIcon className="h-4 w-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{errorMessage ?? "Unknown error"}</AlertDescription>
        </Alert>
      )}
      <footer className="flex justify-center">
        <Link href="/">
          <Button variant="link">Go Home</Button>
        </Link>
      </footer>
    </div>
  );
};
