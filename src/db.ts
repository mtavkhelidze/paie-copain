import { Sequelize } from "sequelize-typescript";

import * as path from "path";
import * as debug from "debug";

import {
    DB_DSN,
    DB_INITIAL_CREDIT_TRANSACTION,
    DB_INITIAL_CUSTOMER,
    DB_INITIAL_DEBIT_TRANSACTION
} from "../config";

import { Accounts } from "./models/Accounts";
import { Txs } from "./models/Txs";
import { Customer, CustomerInput, TransactionInput } from "../types";

const log = debug("pc:dbc");

export type DatabaseHandler = Sequelize;

let dbHandler: DatabaseHandler;

const updateBalance = async (email: string, amount: number) => {
    const acc = await Accounts.findOne({
        where: {
            email
        }
    });
    if (acc) {
        acc.balance = acc.balance + amount;
        acc.save();
        log(`Update balance of ${acc.name} <${acc.email}> to ${acc.balance}`);
    }
    return acc;
};

export const createTx = async (txData: TransactionInput): Promise<Txs> => {
    const tx = await Txs.create(txData);

    await updateBalance(tx.nostro, -tx.amount);
    await updateBalance(tx.vostro, tx.amount);
    log(`Create transaction from ${tx.nostro} to ${tx.vostro} of ${tx.amount}`);
    return tx;
};

export const createAccount = async (accData: CustomerInput): Promise<Customer> => {
    const acc = await Accounts.create(accData);

    const txs = await Txs.findAll({
        where: Sequelize.or({
                vostro: acc.email
            },
            {
                nostro: acc.email
            }
        )
    });

    acc.balance = (acc.balance || 0) + txs
        .map(tx => tx.nostro === acc.email ? -tx.amount : +tx.amount)
        .reduce((r, n) => r + n, 0);

    log(`Create account ${acc.name} <${acc.email}> balance: ${acc.balance}`);
    return await acc.save();
};

const populateTables = async (): Promise<any> => {
    await createAccount(DB_INITIAL_CUSTOMER);
    await createTx(DB_INITIAL_DEBIT_TRANSACTION);
    await createTx(DB_INITIAL_CREDIT_TRANSACTION);
    return Promise.resolve();
};

const dbInit = async (): Promise<DatabaseHandler> => {
    log("Connecting to database");
    dbHandler = new Sequelize({
        // https://github.com/RobinBuschmann/sequelize-typescript/issues/153#issuecomment-334103376
        operatorsAliases: false,
        database: "",
        username: "",
        password: "",
        dialect: "sqlite",
        storage: DB_DSN,
        modelPaths: [path.join(__dirname, "./models")],
        logging: false
    });
    dbHandler.addModels([Txs, Accounts]);
    await dbHandler.sync({
        force: true
    });

    log("Seeding initial data");
    await populateTables();

    return dbHandler;
};

export {
    dbInit
};
