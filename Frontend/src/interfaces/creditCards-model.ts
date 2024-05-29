import {TypesOfCreditCardsModel} from "./TypesOfCreditCards-model";

export interface CreditCardsModel {
    id:string | null;
    cvv: string | null;
    clientBankAccountId: string |null;
    clientAccountNumber:string | null;
    typesOfCreditCardsID: string | null ;
    validThru: string | null;
}