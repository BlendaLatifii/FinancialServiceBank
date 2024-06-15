import axios from "axios";
import { ClientModel } from "../interfaces/client-model";
import { toast } from "react-toastify";

export class ClientService {
    private static baseUrl = "https://localhost:7254/api/Client";
    public static async DeleteClient(id: string): Promise<void> {
      var result = await axios.delete(`${ClientService.baseUrl}/${id}`);
    }
  
    public static async GetAllClients(): Promise<ClientModel[]> {
      const result = await axios.get(ClientService.baseUrl);
      return result.data;
    }
    public static async GetClientDetails(id: string): Promise<ClientModel> {
        const result = await axios.get(`${ClientService.baseUrl}/${id}`);
        return result.data;
    }

   public static async EditOrAddClient(model: ClientModel): Promise<void> {
    const result = await axios.post(`${ClientService.baseUrl}`, model);
    toast.success("Registered Successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  public static async CountAccount(): Promise<number> {
    const result = await axios.get(`${this.baseUrl}/count`);
    return result.data;
}
}
  