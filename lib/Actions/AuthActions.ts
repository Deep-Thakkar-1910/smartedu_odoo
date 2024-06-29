"use server";

import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import db from "../Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Server action for Regitsering users
// NOTE: The omit type is used to remove the fields that are not required for the backend
export const registerUser = async (
  userData: Omit<User, "id" | "createdAt" | "updatedAt" | "image" | "role">
) => {
  try {
    const newUser = await db.user.create({
      data: {
        ...userData,
        email: userData?.email!.toLowerCase(),
        password: await hash(userData.password!, 11),
      },
    });

    // returning the newly created user without password
    return newUser;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      // if the email already exists
      if (err.code === "P2002") {
        return "This Email is already registered";
      }
    }
  }
};
