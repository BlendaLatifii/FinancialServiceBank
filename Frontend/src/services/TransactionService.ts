import axios from "axios";
import { TransactionModel } from "../interfaces/transaction-model";
import { toast } from "react-toastify";
import { TransactionTypePercentageModel } from "../interfaces/TransactionTypePercentageModel";

export class TransactionService {
  private static baseUrl = "https://localhost:7254/api/Transaction";
  public static async DeleteTransaction(id: string): Promise<void> {
    var result = await axios.delete(`${TransactionService.baseUrl}/${id}`);
  }

  public static async GetAllTransactions(): Promise<TransactionModel[]> {
    const result = await axios.get(TransactionService.baseUrl);
    return result.data;
  }
  public static async GetAllTransactionsPercentage(): Promise<TransactionTypePercentageModel[]> {
    const result = await axios.get<TransactionTypePercentageModel[]>(`${TransactionService.baseUrl}/type_percentages`);
    return result.data;
  }
  public static async GetTransactionDetails(id: string): Promise<TransactionModel> {
    const result = await axios.get(`${TransactionService.baseUrl}/${id}`);
    return result.data;
  }
  public static async EditOrAddTransaction(model: TransactionModel): Promise<void> {
    const result = await axios.post(`${this.baseUrl}`, model);
    toast.success("The transaction was completed successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
}
