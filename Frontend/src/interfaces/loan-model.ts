import {LoansTypeModel} from "./loanstype-model";

export interface LoanModel {
    id:string | null;
    loanAmount: string | null;
    interestRate:number|null;
    monthlyPayment:string|null;
    loanPeriod:number|null;
    income:string|null;
    loanInstallment:number|null;
    employmentStatus:string|null;
    clientBankAccountId: string |null;
    clientAccountNumber:string | null;
    loansTypeId: string | null ;
}