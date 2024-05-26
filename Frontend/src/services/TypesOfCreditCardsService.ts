import axios from "axios";
import { TypesOfCreditCardsModel } from "../interfaces/TypesOfCreditCards-model";

export class TypesOfCreditCardsService {
    private static baseUrl = "https://localhost:7254/api/TypesOfCreditCards";
    public static async DeleteType(id: string): Promise<void> {
      var result = await axios.delete(`${TypesOfCreditCardsService.baseUrl}/${id}`);
    }
  
    public static async GetAllTypes(): Promise<TypesOfCreditCardsModel[]> {
      const result = await axios.get(TypesOfCreditCardsService.baseUrl);
      return result.data;
    }
    public static async GetTypesOfCreditCardsDetails(id: string): Promise<TypesOfCreditCardsModel> {
        const result = await axios.get(`${TypesOfCreditCardsService.baseUrl}/${id}`);
        return result.data;
    }

   public static async EditOrAddType(model: TypesOfCreditCardsModel): Promise<void> {
    const result = await axios.post(`${TypesOfCreditCardsService.baseUrl}`, model);
  }
}
  