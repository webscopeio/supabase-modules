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

### `useSignUpWithEmailPassword`

::: code-group
<<< ../../apps/next/components/user/register-form.tsx#useSignUpWithEmailPassword
:::

### `useSignInWithEmailPassword`

::: code-group
<<< ../../apps/next/components/user/login-form.tsx#useSignInWithEmailPassword
:::

### `useSignInWithEmailPassword`

::: code-group
<<< ../../apps/next/components/user/login-form.tsx#useSignInWithEmailPassword
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

### `useGetProfile`

::: code-group
<<< ../../apps/next/components/user/settings.tsx#useGetProfile
:::

### `useUpdateProfile`

::: code-group
<<< ../../apps/next/components/user/profile-form.tsx#useUpdateProfile
:::
