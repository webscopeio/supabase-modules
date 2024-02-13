"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useUpdateUser } from "@/modules/auth";
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export const AccountForm: React.FC<{ userId: string; userEmail: string }> = ({
  userId,
  userEmail,
}) => {
  const router = useRouter();

  const {
    mutate: onSubmit,
    isPending: isLoading,
    isError,
    error,
  } = useUpdateUser({
    onSuccess: (data) => {
      console.log({ data });
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });

  console.log({ userId });

  return (
    <AccountFormComponent
      userEmail={userEmail}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
    />
  );
};

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

const AccountFormComponent: React.FC<{
  userEmail: string;
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({ userEmail, onSubmit, isLoading, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: userEmail,
      password: "",
    },
  });

  return (
    <div className="space-y-6 min-h-screen flex flex-col justify-center">
      <header className="space-y-2">
        <h2 className="font-semibold text-4xl">Account Settings</h2>
        <p>Manage your account settings</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ email, password }) => {
            onSubmit({ email, password });
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
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <CircleIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Settings
            </Button>
            <Link href="/register">
              <Button variant="link">Go Home</Button>
            </Link>
          </footer>
        </form>
      </Form>
    </div>
  );
};
