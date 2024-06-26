import {TypesOfCreditCardsModel} from "./TypesOfCreditCards-model";

export interface CreditCardsModel {
    id:number| null;
    balance:number;
    limite:number| null;
    clientBankAccountId: string |null;
    clientAccountNumber:string | null;
    typesOfCreditCardsID: number;
    validThru: string | null;
}