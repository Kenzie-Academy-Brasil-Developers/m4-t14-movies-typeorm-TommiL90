import { z } from "zod";

export const userSchema = z.object({
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().max(120),
  admin: z.boolean(),
  active: z.boolean(),
  id: z.number().positive().int(),
});

export const createUserSchema = userSchema.omit({
  id: true,
  active: true,
}).partial({
  admin:true
});

export const createUserReturnSchema = userSchema.omit({ password: true });

export const loginUserSchema = userSchema.pick({
  email: true,
  password: true,
});

export const usersList = createUserReturnSchema.array();

export const updateUserSchema = userSchema
  .omit({
    id: true,
    admin: true,
    active: true,
  })
  .partial({
    name: true,
    password: true,
    email: true,
  });
