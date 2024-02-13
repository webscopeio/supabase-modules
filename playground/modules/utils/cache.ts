"use server";

import { revalidatePath } from "next/cache";

export const revalidateCache = async (options?: { path: string }) => {
  try {
    if (options?.path) {
      return revalidatePath(options.path, "layout");
    }
    return revalidatePath("/", "layout");
  } catch (error) {
    if (error instanceof Error) {
      return console.error(`revalidateCache util: ${error.message}`);
    }
    return console.error(`revalidateCache util: Unknown error`);
  }
};
