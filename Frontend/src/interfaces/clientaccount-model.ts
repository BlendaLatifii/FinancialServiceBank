import { BankAccountModel } from "./bankAcc-model";
import {ClientModel} from "./client-model";

export interface ClientBankAccountModel {
    id:string | null;
    accountNumberGeneratedID: string | null;
    personalNumber: string |null ;
    currentBalance: number | null ;
    dateCreated: Date | null;
    dateLastUpdated : Date | null;
    clientId : string | null,
    bankAccountId: string | null,
}