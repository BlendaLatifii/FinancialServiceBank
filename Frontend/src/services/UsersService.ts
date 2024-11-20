import axios from "axios";
import { UserModel } from "../interfaces/users";
import { ListItemModel } from "../interfaces/list-item-model";

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
  public static async GetSelectList(): Promise<ListItemModel[]>{
    const result = await axios.get<ListItemModel[]>(`${UserService.baseUrl}/GetUsersSelectList`);
    return result.data;
  }
}
