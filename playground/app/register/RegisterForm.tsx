"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSignUpWithEmailPassword } from "@/modules/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const {
    mutate: onSubmit,
    isPending: isLoading,
    isError,
    error,
  } = useSignUpWithEmailPassword({
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

  return (
    <RegisterFormComponent
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

const RegisterFormComponent: React.FC<{
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({ onSubmit, isLoading, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="space-y-6 min-h-screen flex flex-col justify-center">
      <header className="space-y-2">
        <h2 className="font-semibold text-4xl">Create an account</h2>
        <p>Please fill out the form below</p>
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
              Create account
            </Button>
            <Link href="/login">
              <Button variant="link">I already have an account</Button>
            </Link>
          </footer>
        </form>
      </Form>
    </div>
  );
};
