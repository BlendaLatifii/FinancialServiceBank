import axios from "axios";
import { CreditCardsModel } from "../interfaces/creditCards-model";

export class CreditCardsService {
    private static baseUrl = "https://localhost:7254/api/CreditCards";
    public static async DeleteCreditCards(id: string): Promise<void> {
      var result = await axios.delete(`${CreditCardsService.baseUrl}/${id}`);
    }
  
    public static async GetAllCreditCards(): Promise<CreditCardsModel[]> {
      const result = await axios.get(CreditCardsService.baseUrl);
      return result.data;
    }
    public static async GetCreditCardsDetails(id: string): Promise<CreditCardsModel> {
        const result = await axios.get(`${CreditCardsService.baseUrl}/${id}`);
        return result.data;
    }

   public static async EditOrAddCreditCards(model: CreditCardsModel): Promise<void> {
    const result = await axios.post(`${CreditCardsService.baseUrl}`, model);
  }
}
  