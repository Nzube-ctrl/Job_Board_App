import { Column, DataType, Model, PrimaryKey, Table, HasMany } from "sequelize-typescript";
import { JobApplication } from "./jobApplication.model";

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    resume: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    location: string;

    @HasMany(() => JobApplication, {
        onDelete: "CASCADE", // Deletes applications if the user is deleted
        onUpdate: "CASCADE", // Updates foreign key references if the user is updated
    })
    appliedJobs: JobApplication[];

    // @Column({})
    // appliedJobs: string;
}