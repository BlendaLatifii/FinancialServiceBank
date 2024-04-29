import { UserModel } from "./users";

export interface AuthenticationModel{
    token:string,
    refreshToken: string,
    expiresAt: Date,
    userData:UserModel,
    userRole: string,
}