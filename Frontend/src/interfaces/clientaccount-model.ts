import { BankAccountModel } from "./bankAcc-model";
import {ClientModel} from "./client-model";

export interface ClientBankAccountModel {
    id:string | null;
    userId: string | null;
    accountNumberGeneratedID: string | null;
    personalNumber: string |null ;
    currentBalance: number | null ;
    dateCreated: Date | null;
    dateLastUpdated : Date | null;
    bankAccountId: string | null;
    branchId:string | null;
    userName: string | null;
    createdByUserId: string | null;        
    lastUpdatedByUserId: string | null;

}