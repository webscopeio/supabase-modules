"use client";

import * as React from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUpdateUser } from "@/modules/user/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const NewResetPasswordForm: React.FC = () => {
  const router = useRouter();

  // #region useUpdateUser
  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
  } = useUpdateUser({
    onSuccess: () => {
      router.push("/settings");
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });
  // #endregion useUpdateUser

  return (
    <NewResetPasswordFormComponent
      updateUser={updateUser}
      isPending={isPending}
      isError={isError}
      errorMessage={error?.message}
    />
  );
};

const FormSchema = z.object({
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

const NewResetPasswordFormComponent: React.FC<{
  updateUser: ({ password }: { password: string }) => void;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({ updateUser, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-4xl font-semibold tracking-tight">New Password</h2>
        <p>Please fill out the form below</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ password }) => {
            updateUser({ password });
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isError && (
            <Alert variant="destructive">
              <CrossCircledIcon className="size-4" />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>
                {errorMessage ?? "Unknown error"}
              </AlertDescription>
            </Alert>
          )}
          <footer className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" disabled={isPending}>
              {isPending && <CircleIcon className="mr-2 size-4 animate-spin" />}
              Set new password
            </Button>
            <Button asChild variant="link">
              <Link href="/login">Back to Login</Link>
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
};
