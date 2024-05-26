import axios from "axios";
import { BankAccountModel } from "../interfaces/bankAcc-model";
import { ListItemModel } from "../interfaces/list-item-model";

export class BankAccountService {
    private static baseUrl = "https://localhost:7254/api/BankAccount";
    public static async DeleteBankAcc(id: string): Promise<void> {
      var result = await axios.delete(`${BankAccountService.baseUrl}/${id}`);
    }
  
    public static async GetAllBankAcc(): Promise<BankAccountModel[]> {
      const result = await axios.get(BankAccountService.baseUrl);
      return result.data;
    }
    public static async GetBankAccDetails(id: string): Promise<BankAccountModel> {
        const result = await axios.get(`${BankAccountService.baseUrl}/${id}`);
        return result.data;
    }

   public static async EditOrAddBankAcc(model: BankAccountModel): Promise<void> {
    const result = await axios.post(`${BankAccountService.baseUrl}`, model);
  }
  public static async GetSelectList(): Promise<ListItemModel[]>{
    const result = await axios.get<ListItemModel[]>(`${BankAccountService.baseUrl}/GetBankAccountSelectList`);
    return result.data;
  }
}
  