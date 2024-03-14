"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  CircleIcon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
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
import { useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetProfile, useUpdateProfile } from "@/modules/user/profile";

export const ProfileForm: React.FC<{ userId: string }> = ({ userId }) => {
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
    <ProfileFormContainer
      id={data.id}
      username={data.username}
      fullName={data.full_name}
      preferredName={data.preferred_name}
    />
  );
};

export const ProfileFormContainer: React.FC<{
  id: string;
  username: string;
  fullName: string | null;
  preferredName: string | null;
}> = ({ id, username, fullName, preferredName }) => {
  const router = useRouter();
  // #region useUpdateProfile
  const {
    mutate: updateProfile,
    isPending,
    isError,
    error,
  } = useUpdateProfile({
    onSuccess: () => {
      router.push("/settings");
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });
  // #endregion useUpdateProfile

  return (
    <ProfileFormComponent
      key={JSON.stringify({ username, fullName, preferredName })}
      id={id}
      username={username}
      fullName={fullName}
      preferredName={preferredName}
      updateProfile={updateProfile}
      isPending={isPending}
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
  updateProfile: ({
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
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({
  id,
  username,
  fullName,
  preferredName,
  updateProfile,
  isPending,
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/settings/profile">Profile</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="font-semibold text-4xl">Profile Settings</h2>
        <p>Manage your profile settings</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            ({ username, full_name, preferred_name }) => {
              updateProfile({ id, username, full_name, preferred_name });
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
          <footer className="flex justify-end space-x-2">
            <Button asChild variant="link">
              <Link href="/settings/account">Account Settings</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <CircleIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Settings
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
};
