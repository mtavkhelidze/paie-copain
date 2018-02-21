import { Database } from "sqlite3";

declare module "*.json" {
    const value: any;
    export default value;
}

export interface Customer {
    id: number;
    email: string;
    name: string;
    balance: number;
}

export type CustomerInput = Partial<Customer>;

export interface Transaction {
    id: number;
    created: number;
    nostro: string;
    vostro: string;
    amount: number;
}

export type TransactionInput = Partial<Transaction>;
