import { Role } from "./role";

export interface UserModel {
  id: string | null | undefined;
  email: string | null;
  personalNumberId:string | null;
  userName: string | null;
  middleName:string |null;
  lastName: string | null;
  password: string | null;
  role: Role | null;
}
