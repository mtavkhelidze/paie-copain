import { Transaction } from "../../types";

import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Txs extends Model<Txs> implements Transaction {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public created: string;

    @Column
    public nostro: string;

    @Column
    public vostro: string;

    @Column
    public amount: number;

}
