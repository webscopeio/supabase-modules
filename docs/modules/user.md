# User Module

If you are starting from an example project - all types, utilities, and modules are installed by default. Therefore, you can continue reviewing information about usage.

## Installation

::: code-group

```bash [Install module]
cd modules
degit iamhectorsosa/supabase-modules/apps/next/modules/user user
```

```bash [Install components]
cd components
degit iamhectorsosa/supabase-modules/apps/next/components/user user
```

:::

Then copy, paste and execute the contents of file `modules/user/migration.sql` in your Supabase SQL Editor.

## Authentication

Authentication supports the following methods:
* Sign ups using email and password
* Sign ins using email and password
* Sign ins using email One-Time password (OTP workflow)
* Password reset using email (Magic Link workflow)
* Updating credentials email and/or password

### `useSignUpWithEmailPassword`

::: code-group
<<< ../../apps/next/components/user/register-form.tsx#useSignUpWithEmailPassword
:::

### `useSignInWithEmailPassword`

::: code-group
<<< ../../apps/next/components/user/login-form.tsx#useSignInWithEmailPassword
:::

### `useSignInWithEmailOtp`

::: code-group
<<< ../../apps/next/components/user/login-form.tsx#useSignInWithEmailOtp
:::

### `useVerifyOtp`

::: code-group
<<< ../../apps/next/components/user/otp-login-form.tsx#useVerifyOtp
:::


### `useResetPasswordForEmail`

::: code-group
<<< ../../apps/next/components/user/reset-password-form.tsx#useResetPasswordForEmail
:::

### `useSignOut`

::: code-group
<<< ../../apps/next/components/user/settings.tsx#useSignOut
:::

### `useUpdateUser`

::: code-group
<<< ../../apps/next/components/user/account-form.tsx#useUpdateUser
:::

## Profile

Profile supports the following methods:
* Get Profile information
* Update Profile information

### `useGetProfile`

::: code-group
<<< ../../apps/next/components/user/settings.tsx#useGetProfile
:::

### `useUpdateProfile`

::: code-group
<<< ../../apps/next/components/user/profile-form.tsx#useUpdateProfile
:::
