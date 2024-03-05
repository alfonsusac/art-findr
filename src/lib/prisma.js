import { PrismaClient } from "@prisma/client"
import { createSingleton } from "./utils"

export const prisma = createSingleton("prisma", () => {
  return new PrismaClient()
})
