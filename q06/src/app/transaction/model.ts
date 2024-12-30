import { CreditCard } from '../credit-card/model';

export interface Transaction {
  credit_card: CreditCard;
  uid: string; //"7e0fa1cf-2ee8-493f-8ef4-ab2ccbba323e",
  amount: number; //4.893942243004438,
  comment: string; //"",
  date: number; //1632755177923,  --- probably date
  currency: string; //"USD",
}

export interface TransactionDTO {
  credit_card_number: number;
  uid: string; //"7e0fa1cf-2ee8-493f-8ef4-ab2ccbba323e",
  amount: number; //4.893942243004438,
  comment: string; //"",
  date: number; //1632755177923,  --- probably date
  currency: string; //"USD",
}
