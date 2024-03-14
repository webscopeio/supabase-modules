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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const AccountForm: React.FC<{ userEmail: string }> = ({ userEmail }) => {
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
    <AccountFormComponent
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
  password: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .optional(),
});

const AccountFormComponent: React.FC<{
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
    <div className="space-y-6 min-h-dvh flex flex-col justify-center">
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/settings/account">Account</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="font-semibold text-4xl">Account Settings</h2>
        <p>Manage your account settings</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ email, password }) => {
            updateUser({ email, password });
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
              <CrossCircledIcon className="h-4 w-4" />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>
                {errorMessage ?? "Unknown error"}
              </AlertDescription>
            </Alert>
          )}
          <footer className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <CircleIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
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
