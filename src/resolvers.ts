import { Accounts } from "./models/Accounts";
import { Txs } from "./models/Txs";
import { Source } from "graphql";
import { CustomerInput, TransactionInput } from "../types";
import { Options } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { createAccount, createTx } from "./db";

const customer = (root: Source, args: CustomerInput, ctx: Options) =>
    Accounts.findById(args.id, ctx);

const transaction = (root: Source, args: TransactionInput, ctx: Options) =>
    Txs.findById(args.id, ctx);

const customers = (root: Source, args: any, ctx: Options) =>
    Accounts.findAll(ctx);

const transactions = (root: Source, args: any, ctx: Options) =>
    Txs.findAll(ctx);

const customerTransactions = async (acc: Accounts) =>
    Txs.findAll({
            where: Sequelize.or(
                {
                    nostro: acc.email
                },
                {
                    vostro: acc.email
                })
        }
    );

const initResovers = () => ({
    RootQuery: {
        customer,
        customers,
        transaction,
        transactions
    },
    RootMutations: {
        createCustomer: (root: Source, args: any) => createAccount(args.input),
        createTransaction: (root: Source, args: any) => createTx(args.input)
    },
    Customer: {
        transactions: customerTransactions
    }
});

export {
    initResovers
};
