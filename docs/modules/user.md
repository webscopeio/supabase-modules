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

<<< ../../apps/next/database/auth.ts#signUpWithEmailPassword

### `signInWithEmailPassword`

<<< ../../apps/next/database/auth.ts#signInWithEmailPassword

### `signInWithOtp`

<<< ../../apps/next/database/auth.ts#signInWithOtp

### `signInAnonymously`

<<< ../../apps/next/database/auth.ts#signInAnonymously

### `verifyOtp`

<<< ../../apps/next/database/auth.ts#verifyOtp

### `signOut`

<<< ../../apps/next/database/auth.ts#signOut

### `resetPasswordForEmail`

<<< ../../apps/next/database/auth.ts#resetPasswordForEmail

### `updateUser`

<<< ../../apps/next/database/auth.ts#updateUser

## Profile

### `getProfile`

<<< ../../apps/next/database/profiles.ts#getProfile

### `updateProfile`

<<< ../../apps/next/database/profiles.ts#updateProfile
