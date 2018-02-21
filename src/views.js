import { Customer } from "../types";
import { dbQuery } from "./old_db";

const viewAccount = (email: string): Promise<Customer | null> =>
    dbQuery("select * from account")
        .then(rows => rows.length ? {...rows[0]} : null)
        .catch(err => "Hello!");

export {
    viewAccount
};
