import axios from "axios";
import { TypesOfCreditCardsModel } from "../interfaces/TypesOfCreditCards-model";
import { ListItemModel } from "../interfaces/list-item-model";
import { ListItemIntModel } from "../interfaces/list-itemInt-model";

export class TypesOfCreditCardsService {
    private static baseUrl = "https://localhost:7254/api/TypesOfCreditCards";
    public static async DeleteType(id: number): Promise<void> {
      var result = await axios.delete(`${TypesOfCreditCardsService.baseUrl}/${id}`);
    }
  
    public static async GetAllTypes(): Promise<TypesOfCreditCardsModel[]> {
      const result = await axios.get(TypesOfCreditCardsService.baseUrl);
      return result.data;
    }
    public static async GetTypesOfCreditCardsDetails(id: number): Promise<TypesOfCreditCardsModel> {
        const result = await axios.get(`${TypesOfCreditCardsService.baseUrl}/${id}`);
        return result.data;
    }

   public static async EditOrAddType(model: TypesOfCreditCardsModel): Promise<void> {
    const result = await axios.post(`${TypesOfCreditCardsService.baseUrl}`, model);
  }
  public static async GetSelectList(): Promise<ListItemIntModel[]>{
    const result = await axios.get<ListItemIntModel[]>(`${TypesOfCreditCardsService.baseUrl}/GetTypesOfCreditCardsSelectList`);
    return result.data;
  }
}
  