import axios from "axios";
import { LogInModel } from "../interfaces/login-model";
import { UserModel } from "../interfaces/users";
import { AuthenticationModel } from "../interfaces/auth-model";
import { RegisterModel } from "../interfaces/register-model";
import { ToastContainer, toast } from "react-toastify";

export class AuthService {
  private static BaseUrl = "https://localhost:7254/api/Account/";
  public static token: string | null = null;
  public static role: string | null = null;

  public static async Login(user: LogInModel): Promise<AuthenticationModel> {
    try{
      const response = await axios.post<AuthenticationModel>(
        `${AuthService.BaseUrl}login`,
        user
      );
      if(!response.data){
        return null!;
      }
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      AuthService.token = response.data?.token;
      localStorage.setItem("userModel", JSON.stringify(response.data.userData));
      localStorage.setItem("role", response.data.userRole);
      AuthService.role = response.data?.userRole;
      toast.success("Logged in Successfully");
      return response.data;
    }
    catch(e){
      return null!;
    }
  }

  public static LogOut(): void {
    localStorage.removeItem("jwt");
    AuthService.token = null;
    localStorage.removeItem("userModel");
    localStorage.removeItem("role");
    AuthService.role = null;
  }

  public static async Register(model: RegisterModel): Promise<void> {
    const result = await axios.post(`${AuthService.BaseUrl}register`, model);
    toast.success("Registered Successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  public static LoggedInUser(): UserModel | null{
    let model = localStorage.getItem("userModel");
    if(model == null){
      return null;
    }
    return JSON.parse(localStorage.getItem("userModel")!);
  }

  public static GetUserRole(): string | null {
    console.log(localStorage.getItem("role"));
    return localStorage.getItem("role");
  }
}
