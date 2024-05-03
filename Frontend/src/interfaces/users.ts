import { Role } from "./role";

export interface UserModel {
  id: string | null | undefined;
  email: string | null;
  userName: string | null;
  lastName: string | null;
  password: string | null;
  role: Role | null;
}
