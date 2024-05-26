import axios from "axios";
import { LoansTypeModel } from "../interfaces/loanstype-model";


export class LoansTypeService {
    private static baseUrl = "https://localhost:7254/api/LoansType";
    public static async DeleteLoansType(id: string): Promise<void> {
      var result = await axios.delete(`${LoansTypeService.baseUrl}/${id}`);
    }
  
    public static async GetAllLoansType(): Promise<LoansTypeModel[]> {
      const result = await axios.get(LoansTypeService.baseUrl);
      return result.data;
    }
    public static async GetLoansTypeDetails(id: string): Promise<LoansTypeModel> {
        const result = await axios.get(`${LoansTypeService.baseUrl}/${id}`);
        return result.data;
    }

   public static async EditOrAddLoansType(model: LoansTypeModel): Promise<void> {
    const result = await axios.post(`${LoansTypeService.baseUrl}`, model);
  }
}
  