import axios from "axios";
import { UserModel } from "../interfaces/users";

export class UserService {
  private static baseUrl = "https://localhost:7254/api/Users";
  public static async DeleteUser(id: string): Promise<void> {
    var result = await axios.delete(`${UserService.baseUrl}/${id}`);
  }

  public static async GetAllUsers(): Promise<UserModel[]> {
    const result = await axios.get(UserService.baseUrl);
    return result.data;
  }
  public static async GetUserDetails(id: string): Promise<UserModel> {
    const result = await axios.get(`${UserService.baseUrl}/${id}`);
    return result.data;
  }
  public static async EditOrAddUser(model: UserModel): Promise<void> {
    const result = await axios.post(`${this.baseUrl}`, model);
  }
}
