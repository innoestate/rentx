import { User } from "../user.entity";

export const formatUserDb = (user: User) => ({
  ...user,
  created_at: new Date(user.created_at as any).getTime(),//should be tested
  updated_at: new Date(user.updated_at as any).getTime(),
})