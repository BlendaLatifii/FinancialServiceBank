import { BankAccountModel } from "./bankAcc-model";
import {ClientModel} from "./client-model";

export interface ClientBankAccountModel {
    id:string | null;
    accountNumberGeneratedID: string | null;
    personalNumber: string ;
    currentBalance: number | null ;
    dateCreated: Date | null;
    dateLastUpdated : Date | null;
    clientId : string,
    bankAccountId: string | null,
}