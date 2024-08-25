import axios from "axios";
import { ClientBankAccountModel } from "../interfaces/clientaccount-model";
import { toast } from "react-toastify";
import { ListItemModel } from "../interfaces/list-item-model";

export class ClientBankAccountService {
    private static baseUrl = "https://localhost:7254/api/ClientBankAccount";
    public static async DeleteBankAcc(id: string): Promise<void> {
      var result = await axios.delete(`${ClientBankAccountService.baseUrl}/${id}`);
    }

    public static async GetAllBankAcc(): Promise<ClientBankAccountModel[]> {
      const result = await axios.get(ClientBankAccountService.baseUrl);
      return result.data;
    }
    public static async GetBankAccDetails(id: string): Promise<ClientBankAccountModel> {
        const result = await axios.get(`${ClientBankAccountService.baseUrl}/${id}`);
        return result.data;
    }
    public static async CountAccount(): Promise<number> {
      const result = await axios.get(`${this.baseUrl}/count`);
      return result.data;
  }

   public static async EditOrAddBankAcc(model: ClientBankAccountModel): Promise<void> {
    const result = await axios.post(`${ClientBankAccountService.baseUrl}`, model);
    toast.success("Completed successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  public static async GetSelectList(): Promise<ListItemModel[]>{
    const result = await axios.get<ListItemModel[]>(`${ClientBankAccountService.baseUrl}/GetClientAccountSelectList`);
    return result.data;
  }
  public static async GetStudentAccountClients(): Promise<string[]> {
    const result = await axios.get(`${ClientBankAccountService.baseUrl}/student-accounts/clients`);
    return result.data;
}
  public static async DeductMaintenanceFeesAfterAMonth(): Promise<void> {
  const result = await axios.post(`${ClientBankAccountService.baseUrl}/deduct-maintenance-fees-after-a-month`);
     }
  }
