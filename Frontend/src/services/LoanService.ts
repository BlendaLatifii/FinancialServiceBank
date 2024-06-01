import axios from "axios";
import { LoanModel } from "../interfaces/loan-model";
import { toast } from "react-toastify";

export class LoanService {
    private static baseUrl = "https://localhost:7254/api/CreditCards";
    public static async DeleteLoan(id: string): Promise<void> {
      var result = await axios.delete(`${LoanService.baseUrl}/${id}`);
    }
  
    public static async GetAllLoans(): Promise<LoanModel[]> {
      const result = await axios.get(LoanService.baseUrl);
      return result.data;
    }
    public static async GetLoanDetails(id: string): Promise<LoanModel> {
        const result = await axios.get(`${LoanService.baseUrl}/${id}`);
        return result.data;
    }

   public static async EditOrAddLoan(model: LoanModel): Promise<void> {
    const result = await axios.post(`${LoanService.baseUrl}`, model);
    toast.success("The loan application was made successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
}
  