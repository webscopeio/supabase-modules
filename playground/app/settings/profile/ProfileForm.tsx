"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
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
import { useUpdateProfile } from "@/modules/profile";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const ProfileForm: React.FC<{
  id: string;
  username: string;
  fullName: string | null;
  preferredName: string | null;
}> = ({ id, username, fullName, preferredName }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: onSubmit,
    isPending: isLoading,
    isError,
    error,
  } = useUpdateProfile({
    onSuccess: (data) => {
      data?.id && queryClient.invalidateQueries({ queryKey: [data.id] });
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });
  return (
    <ProfileFormComponent
      key={JSON.stringify({ username, fullName, preferredName })}
      id={id}
      username={username}
      fullName={fullName}
      preferredName={preferredName}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
    />
  );
};

const FormSchema = z.object({
  username: z.string().min(3, { message: "Must be 3 or more characters long" }),
  full_name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  preferred_name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
});

const ProfileFormComponent: React.FC<{
  id: string;
  username: string;
  fullName: string | null;
  preferredName: string | null;
  onSubmit: ({
    id,
    username,
    full_name,
    preferred_name,
  }: {
    id: string;
    username: string;
    full_name: string;
    preferred_name?: string;
  }) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({
  id,
  username,
  fullName,
  preferredName,
  onSubmit,
  isLoading,
  isError,
  errorMessage,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username,
      full_name: fullName ?? "",
      preferred_name: preferredName ?? "",
    },
  });

  return (
    <div className="space-y-6 min-h-dvh flex flex-col justify-center">
      <header className="space-y-2">
        <h2 className="font-semibold text-4xl">Profile Settings</h2>
        <p>Manage your profile settings</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            ({ username, full_name, preferred_name }) => {
              onSubmit({ id, username, full_name, preferred_name });
            }
          )}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="sosa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Hector Sosa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferred_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred name</FormLabel>
                <FormControl>
                  <Input placeholder="Hector" {...field} />
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
            <Link href="/settings/account">
              <Button variant="link">Account Settings</Button>
            </Link>
          </footer>
        </form>
      </Form>
    </div>
  );
};
