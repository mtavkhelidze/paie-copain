import { Customer } from "../../types";
import { AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class Accounts extends Model<Accounts> implements Customer {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Unique
    @Column
    public email: string;

    @Column
    public name: string;

    @Column
    public balance: number;
}
