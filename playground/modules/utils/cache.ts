"use server";

import { revalidatePath } from "next/cache";

export const clearCache = async (options?: { path: string }) => {
  try {
    if (options?.path) {
      return revalidatePath(options.path, "layout");
    }
    return revalidatePath("/", "layout");
  } catch (error) {
    if (error instanceof Error) {
      return console.error(`clearCache util: ${error.message}`);
    }
    return console.error(`clearCache util: Unknown error`);
  }
};
