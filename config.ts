import { Customer, Transaction } from "./types";
import * as path from "path";

export const SERVER_PORT = process.env.PORT || 3000;
export const SERVER_API_ROOT = process.env.SERVER_API_ROOT || "/";
export const DB_DSN = process.env.DSN || ":memory:";
export const SEED_DEBIT: number = (process.env.SEED_DEBIT || 100) as number;

export const GRAPHQL_SCHEAM_FILE = path.join(__dirname, "./schema.graphqls");

const USER_ONE = {
    email: "one@domain.tld",
    name: "User One"
};

const USER_TWO = {
    email: "two@domain.tld",
    name: "User TWO"
};

export const DB_INITIAL_CUSTOMER: Customer = {
    id: 1,
    ...USER_ONE,
    balance: SEED_DEBIT
};

export const DB_INITIAL_DEBIT_TRANSACTION: Transaction = {
    id: 1,
    created: `${Date.now()}`,
    nostro: USER_ONE.email,
    vostro: USER_TWO.email,
    amount: 37
};
export const DB_INITIAL_CREDIT_TRANSACTION: Transaction = {
    id: 2,
    created: `${Date.now()}`,
    nostro: USER_TWO.email,
    vostro: USER_ONE.email,
    amount: 13
};
