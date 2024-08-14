export interface CreditCardsModel {
    id:string| null;
    cvv:string |null;
    balance:number;
    limite:number| null;
    clientBankAccountId: string |null;
    clientAccountNumber:string | null;
    typesOfCreditCardsID: number;
    validThru: string | null;
}