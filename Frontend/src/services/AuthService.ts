import axios from "axios";
import { LogInModel } from "../interfaces/login-model";
import { UserModel } from "../interfaces/users";
import { AuthenticationModel } from "../interfaces/auth-model";
import { RegisterModel } from "../interfaces/register-model";
import { ToastContainer, toast } from "react-toastify";

export class AuthService {
  private static BaseUrl = "https://localhost:7254/api/Account/";
  public static LoggedInUser: UserModel | null = null;
  public static token: string | null = null;
  public static role: string | null = null;

  public static async Login(user: LogInModel): Promise<AuthenticationModel> {
    try{
      const response = await axios.post<AuthenticationModel>(
        `${AuthService.BaseUrl}login`,
        user
      );
      console.log(response);
      if(!response.data){
        return null!;
      }
      localStorage.setItem("jwt", response.data.token);
      AuthService.token = response.data?.token;
      localStorage.setItem("userModel", JSON.stringify(response.data.userData));
      AuthService.LoggedInUser = response.data?.userData;
      localStorage.setItem("role", response.data.userRole);
      AuthService.role = response.data?.userRole;
      toast.success("Logged in successfuly");
      return response.data;
    }
    catch(e){
      return null!;
    }
  }

  public static LogOut(): void {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userModel");
    localStorage.removeItem("role");
  }

  public static async Register(model: RegisterModel): Promise<void> {
    const result = await axios.post(`${AuthService.BaseUrl}register`, model);
    toast.success("Registered Successfuly", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  public static GetUserRole(): string | null {
    return localStorage.getItem("role");
  }
}
