"use client";

import * as React from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useSignInWithEmailOtp,
  useSignInWithEmailPassword,
} from "@/modules/user/auth";

export const LoginForm: React.FC = () => {
  const router = useRouter();

  // #region useSignInWithEmailPassword
  const {
    mutate: signIn,
    isPending,
    isError,
    error,
  } = useSignInWithEmailPassword({
    onSuccess: () => {
      router.push("/settings");
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });
  // #endregion useSignInWithEmailPassword

  // #region useSignInWithEmailOtp
  const {
    mutate: signInWithOtp,
    isPending: isPendingWithOtp,
    isError: isErrorWithOtp,
    error: errorWithOtp,
  } = useSignInWithEmailOtp({
    onSuccess: (_, variables) => {
      router.push(`/login/otp?email=${variables.email}`);
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });
  // #endregion useSignInWithEmailOtp

  return (
    <LoginFormComponent
      signIn={({ email, password }) => {
        password ? signIn({ email, password }) : signInWithOtp({ email });
      }}
      isPending={isPending || isPendingWithOtp}
      isError={isError || isErrorWithOtp}
      errorMessage={error?.message ?? errorWithOtp?.message}
    />
  );
};

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

const FormSchemaWithOTP = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const LoginFormComponent: React.FC<{
  signIn: ({ email, password }: { email: string; password?: string }) => void;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
}> = ({ signIn, isPending, isError, errorMessage }) => {
  const [isLoginWithOTP, setIsLoginWithOTP] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(isLoginWithOTP ? FormSchemaWithOTP : FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-4xl font-semibold tracking-tight">Sign in</h2>
        <p>Welcome back!</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ email, password }) => {
            isLoginWithOTP ? signIn({ email }) : signIn({ email, password });
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
          {!isLoginWithOTP && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription className="pt-1">
                    <Link
                      className="underline-offset-4 hover:underline"
                      href="/login/reset-password"
                    >
                      Forgot password?
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {isError && (
            <Alert variant="destructive">
              <CrossCircledIcon className="size-4" />
              <AlertTitle>Something went wrong!</AlertTitle>
              <AlertDescription>
                {errorMessage ?? "Unknown error"}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex items-center space-x-2">
            <Switch
              checked={isLoginWithOTP}
              onCheckedChange={(v) => setIsLoginWithOTP(v)}
              id="OTP-login"
            />
            <Label htmlFor="OTP-login">Login with One-Time password</Label>
          </div>
          <footer className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" disabled={isPending}>
              {isPending && <CircleIcon className="mr-2 size-4 animate-spin" />}
              {isLoginWithOTP ? "Email me a One-Time password" : "Sign in"}
            </Button>
            <Button asChild variant="link">
              <Link href="/login/new">Create new account</Link>
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
};
