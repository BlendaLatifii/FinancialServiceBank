import axios from "axios";
import { TypesOfCreditCardsModel } from "../interfaces/TypesOfCreditCards-model";
import { ListItemModel } from "../interfaces/list-item-model";

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
  public static async GetSelectList(): Promise<ListItemModel[]>{
    const result = await axios.get<ListItemModel[]>(`${TypesOfCreditCardsService.baseUrl}/GetTypesOfCreditCardsSelectList`);
    return result.data;
  }
}
  