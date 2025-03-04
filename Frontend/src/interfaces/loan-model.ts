import { loanType } from "./LoanType";
import { employmentStatus } from "./employmentStatus";

export interface LoanModel {
    id:string | null;
    userId:string | null;
    loanAmount: string | null;
    interestRate:number;
    monthlyPayment:string|null;
    loanPeriod:string | null;
    income:string|null;
    employmentStatus:employmentStatus;
    clientBankAccountId: string |null;
    clientAccountNumber:string ;
    loansTypesId: loanType ;
    userName:string|null;
}