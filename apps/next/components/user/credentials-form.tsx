"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/modules/user/auth";

export const CredentialsForm: React.FC<{ userEmail: string }> = ({
  userEmail,
}) => {
  const router = useRouter();

  // #region useUpdateUser
  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
  } = useUpdateUser({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });
  // #endregion useUpdateUser

  return (
    <CredentialsFormComponent
      userEmail={userEmail}
      updateUser={updateUser}
      isPending={isPending}
      isError={isError}
      errorMessage={error?.message}
    />
  );
};

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z.string().optional(),
});

const CredentialsFormComponent: React.FC<{
  userEmail: string;
  updateUser: ({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }) => void;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({ userEmail, updateUser, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: userEmail,
      password: "",
    },
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Credentials Settings
        </h2>
        <p>Manage your credentials settings</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ email, password }) => {
            const updates: { email?: string; password?: string } = {};

            if (email) updates.email = email;
            if (password) updates.password = password;

            if (Object.keys(updates).length > 0) {
              updateUser(updates);
            }
            form.reset();
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="sosa@webscope.io" {...field} />
                </FormControl>
                <FormDescription>
                  (Optional) the new email you would like to use
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  (Optional) the new password you would like to use
                </FormDescription>
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
              Update Settings
            </Button>
            <Button asChild variant="link">
              <Link href="/settings/profile">Profile Settings</Link>
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
};
