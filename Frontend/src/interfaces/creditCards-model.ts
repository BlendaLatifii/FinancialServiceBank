export interface CreditCardsModel {
    id:string| null;
    userId:string|null;
    cvv:string |null;
    balance:number;
    limite:number| null;
    clientBankAccountId: string |null;
    clientAccountNumber:string | null;
    typesOfCreditCardsID: number;
    validThru: string | null;
    userName:string|null;
}