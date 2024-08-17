import axios from "axios";
import { BranchModel } from "../interfaces/branch-model";
import { ListItemModel } from "../interfaces/list-item-model";

export class BranchService {
    private static baseUrl = "https://localhost:7254/api/Branch";
    public static async DeleteBranch(branchId: string): Promise<void> {
      var result = await axios.delete(`${BranchService.baseUrl}/${branchId}`);
    }
  
    public static async GetAllBranches(): Promise<BranchModel[]> {
      const result = await axios.get(BranchService.baseUrl);
      return result.data;
    }
    public static async GetBranchDetails(branchId: string): Promise<BranchModel> {
        const result = await axios.get(`${BranchService.baseUrl}/${branchId}`);
        return result.data;
    }

   public static async EditOrAddBranch(model: BranchModel): Promise<void> {
    const result = await axios.post(`${BranchService.baseUrl}`, model);
    }
    public static async GetSelectList(): Promise<ListItemModel[]>{
      const result = await axios.get<ListItemModel[]>(`${BranchService.baseUrl}/GetBranchesSelectList`);
      return result.data;
    }
}
  