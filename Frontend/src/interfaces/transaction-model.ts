import { TranStatus } from "./TranStatus";
import { TranType } from "./TranType";

export interface TransactionModel {
    id:string | null;
    transactionAmount: number | null;
    sourceClientBankAccountId: string | null;
    destinationClientBankAccountId: string | null;
    sourceClientBankAccount: string | null;
    destinationClientBankAccount: string | null;
    transactionType: TranType;
    transactionDate: Date | null;
    transactionDateUpdated : Date | null;
}