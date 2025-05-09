import { z } from "zod";

export const formSchema = z.object({
  message: z.string().min(10).max(1000),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.union([
    z.literal("mentorship"),
    z.literal("consulting"),
    z.literal("job-opportunity"),
    z.literal("collaboration"),
    z.literal("others"),
  ]),
});
