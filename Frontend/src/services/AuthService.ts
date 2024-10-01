import axios from "axios";
import Cookies from "js-cookie";
import { LogInModel } from "../interfaces/login-model";
import { UserModel } from "../interfaces/users";
import { AuthenticationModel } from "../interfaces/auth-model";
import { RegisterModel } from "../interfaces/register-model";
import { ToastContainer, toast } from "react-toastify";

export class AuthService {
  private static BaseUrl = "https://localhost:7254/api/Account/";
  public static token: string | null = null;
  public static role: string | null = null;
  public static refreshToken: string | null = null;
  public static isRefreshing: boolean = false;


  public static async Login(user: LogInModel): Promise<AuthenticationModel> {
    try {
      const response = await axios.post<AuthenticationModel>(
        `${AuthService.BaseUrl}login`,
        user
      );
      if (!response.data) {
        return null!;
      }
      Cookies.set("jwt", response.data.token);
      Cookies.set("refreshToken", response.data.refreshToken);
      AuthService.refreshToken = response.data.refreshToken;
      AuthService.token = response.data.token;

      Cookies.set("userModel", JSON.stringify(response.data.userData));
      Cookies.set("role", response.data.userRole);

      const expiresAt = new Date(response.data.expiresAt);
      Cookies.set("expiresAt", `${expiresAt}`);

      AuthService.role = response.data.userRole;
      toast.success("Logged in Successfully");
      return response.data;
    } catch (e) {
      console.log('problem');
      return null!;
    }
  }

  public static isAuthenticated() {
    if (AuthService.token) {
      return true;
    }
    const token = Cookies.get("jwt");
    return token != null;
  }
  public static async RefreshToken(): Promise<boolean> {
    if (this.isRefreshing) {
      return true;
    }
    this.isRefreshing = true;
    const refreshToken = AuthService.refreshToken ?? Cookies.get("refreshToken");
    const token = AuthService.token ?? Cookies.get("jwt");
    if (!refreshToken || !token) {
      console.log(AuthService.token,AuthService.refreshToken,Cookies.get("refreshToken"),Cookies.get("jwt"))
      console.log('none tokens');
      return false;
    }

    try {
      const response = await axios.post<AuthenticationModel>(
        `${AuthService.BaseUrl}RefreshToken`,
        { token, refreshToken }
      );
      if (!response.data) {
        return false;
      }
      Cookies.set("refreshToken", response.data.refreshToken);
      AuthService.refreshToken = response.data.refreshToken;
      const expiresAt = new Date(response.data.expiresAt); 
      Cookies.set("expiresAt", expiresAt.toString());
      Cookies.set('jwt', response.data?.token);
      AuthService.token = response.data?.token;
      Cookies.set("role", response.data?.userRole);
      AuthService.role = response.data?.userRole;
      
      return true;
    } catch (e) {
      console.log(e,'error');
      AuthService.LogOut();
      return false;
    } finally {
      this.isRefreshing = false;
    }
  }
  public static async GetToken(): Promise<string | null> {
    const expiresAt = Cookies.get("expiresAt");
    console.log(expiresAt,'expiresAt');
    if (expiresAt && new Date(expiresAt) <= new Date()) {
      const refreshed = await this.RefreshToken();
      if (!refreshed) {
        return null;
      }
    }
    AuthService.token = Cookies.get("jwt")!;
    return AuthService.token;
  }

  public static LogOut(): void {
    console.log('logged out');
    Cookies.remove("jwt");
    Cookies.remove("expiresAt");
    Cookies.remove("refreshToken");
    Cookies.remove("userModel");
    Cookies.remove("role");

    AuthService.token = null;
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

  public static LoggedInUser(): UserModel | null {
    let model = Cookies.get("userModel");
    if (model == null) {
      return null;
    }

    return JSON.parse(Cookies.get("userModel")!);
  }

  public static GetUserRole(): string | null {
    return Cookies.get("role")!;
  }

  public static isAdmin(): boolean{
    console.log(AuthService.GetUserRole());
     return AuthService.GetUserRole() == 'Admin';
  }
}
