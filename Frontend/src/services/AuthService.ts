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
  public static isRefreshing:boolean = false;

  public static async Login(user: LogInModel): Promise<AuthenticationModel> {
    try{
      const response = await axios.post<AuthenticationModel>(
        `${AuthService.BaseUrl}login`,
        user
      );
      if(!response.data){
        return null!;
      }
     // localStorage.setItem("jwt", response.data.token);
     // localStorage.setItem("refreshToken", response.data.refreshToken);
     // localStorage.setItem("expiresAt", response.data.expiresAt.toString());
     // AuthService.token = response.data?.token;
     // localStorage.setItem("userModel", JSON.stringify(response.data.userData));
      //localStorage.setItem("role", response.data.userRole);
    //  AuthService.role = response.data?.userRole;
      Cookies.set("jwt", response.data.token); 
      Cookies.set("refreshToken", response.data.refreshToken);
      AuthService.token = response.data.token;
      Cookies.set("userModel", JSON.stringify(response.data.userData));
      Cookies.set("role", response.data.userRole);
      Cookies.set("expiresAt", response.data.expiresAt.toString());
      AuthService.role = response.data?.userRole;
     toast.success("Logged in Successfully");
     console.log(Cookies.get("jwt"), Cookies.get("refreshToken"), Cookies.get("expiresAt"));
     return response.data;

    }
    catch(e){
      return null!;
    }
  }
  public static async RefreshToken(): Promise<boolean> {
    if(this.isRefreshing){
      return true;
    }
    this.isRefreshing = true;
   // const refreshToken = localStorage.getItem("refreshToken");
   // const token = localStorage.getItem("jwt");
   const refreshToken = Cookies.get("refreshToken");
   const token = Cookies.get("jwt");   
    if (!refreshToken || !token) {
      return false;
    }
  
    try {
      const response = await axios.post<AuthenticationModel>(
        `${AuthService.BaseUrl}RefreshToken`,
        { token, refreshToken }
      );
      console.log(response);
      if (!response.data) {
        return false;
      }
   Cookies.set("jwt", response.data.token);
   Cookies.set("refreshToken", response.data.refreshToken);
   Cookies.set("expiresAt", response.data.expiresAt.toString());
    //  localStorage.setItem("jwt", response.data.token);
     // localStorage.setItem("refreshToken", response.data.refreshToken);
     // localStorage.setItem("expiresAt", response.data.expiresAt.toString());
  
      AuthService.token = response.data?.token;
      AuthService.role = response.data?.userRole;
      
      
      return true;
    } catch (e) {
      console.log(e);
      AuthService.LogOut();
      return false;
    }
    finally{
      this.isRefreshing= false;
    }
  }
  public static async GetToken(): Promise<string | null> {
  //  const expiresAt = localStorage.getItem("expiresAt");
    const expiresAt= Cookies.get("expiresAt");
    if (expiresAt && new Date(expiresAt) <= new Date()) {
      const refreshed = await this.RefreshToken();
      if(!refreshed){
        return null;
      }
    }

   // AuthService.token = localStorage.getItem("jwt");
   AuthService.token = Cookies.get("jwt")!;
    return AuthService.token;
  }

  public static LogOut(): void {
 // localStorage.removeItem("jwt");
  //AuthService.token = null;
  // localStorage.removeItem("userModel");
  // localStorage.removeItem("role");
   //AuthService.role = null;
    Cookies.remove("jwt");
    AuthService.token = null;
    Cookies.remove("userModel");
    Cookies.remove("role");
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
 //   let model = localStorage.getItem("userModel");
    let model= Cookies.get("userModel");
    if(model == null){
      return null;
    }
    return JSON.parse(localStorage.getItem("userModel")!);
  }

  public static GetUserRole(): string | null {
  
   // return localStorage.getItem("role");
    return Cookies.get("role") ?? null;
  }
}
