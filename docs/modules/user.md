# User Module

If you are starting from an example project - all types, utilities, and modules are installed by default. Therefore, you can continue reviewing information about usage.

## Installation

::: code-group

```bash [Install module]
cd modules
degit webscopeio/supabase-modules/apps/next/modules/user user
```

```bash [Install components]
cd components
degit webscopeio/supabase-modules/apps/next/components/user user
```

:::

Then copy, paste and execute the contents of file `modules/user/migration.sql` in your Supabase SQL Editor.

## Authentication

Authentication supports the following methods:

- Sign ups using email and password
- Sign ins using email and password
- Sign ins using email One-Time password (OTP workflow)
- Anonymous Sign ins
- Sign outs
- Password reset using email (Magic Link workflow)
- Updating credentials email and/or password

### `signUpWithEmailPassword`

<<< ../../apps/next/modules/user/auth.ts#signUpWithEmailPassword

### `signInWithEmailPassword`

<<< ../../apps/next/modules/user/auth.ts#signInWithEmailPassword

### `signInWithOtp`

<<< ../../apps/next/modules/user/auth.ts#signInWithOtp

### `signInAnonymously`

<<< ../../apps/next/modules/user/auth.ts#signInAnonymously

### `verifyOtp`

<<< ../../apps/next/modules/user/auth.ts#verifyOtp

### `signOut`

<<< ../../apps/next/modules/user/auth.ts#signOut

### `resetPasswordForEmail`

<<< ../../apps/next/modules/user/auth.ts#resetPasswordForEmail

### `updateUser`

<<< ../../apps/next/modules/user/auth.ts#updateUser

## Profile

### `getProfile`

<<< ../../apps/next/modules/user/profile.ts#getProfile

### `updateProfile`

<<< ../../apps/next/modules/user/profile.ts#updateProfile
