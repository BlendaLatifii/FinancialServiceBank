import axios from "axios";
import { TransactionModel } from "../interfaces/transaction-model";

export class TransactionService {
  private static baseUrl = "https://localhost:7254/api/Transaction";
  public static async DeleteTransaction(id: string): Promise<void> {
    var result = await axios.delete(`${TransactionService.baseUrl}/${id}`);
  }

  public static async GetAllTransactions(): Promise<TransactionModel[]> {
    const result = await axios.get(TransactionService.baseUrl);
    return result.data;
  }
  public static async GetTransactionDetails(id: string): Promise<TransactionModel> {
    const result = await axios.get(`${TransactionService.baseUrl}/${id}`);
    return result.data;
  }
  public static async EditOrAddTransaction(model: TransactionModel): Promise<void> {
    const result = await axios.post(`${this.baseUrl}`, model);
  }
}
