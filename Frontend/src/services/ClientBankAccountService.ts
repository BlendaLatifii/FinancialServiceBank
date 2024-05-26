import axios from "axios";
import { ClientBankAccountModel } from "../interfaces/clientaccount-model";

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

   public static async EditOrAddBankAcc(model: ClientBankAccountModel): Promise<void> {
    const result = await axios.post(`${ClientBankAccountService.baseUrl}`, model);
  }
}