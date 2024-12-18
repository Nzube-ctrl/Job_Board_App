import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";
import { JobPost } from "./jobPost.model";

@Table({
    tableName: "companies",
    timestamps: true,
})
export class Company extends Model<Company> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    website: string; // Optional field for the company's website

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    location: string; // Headquarters or primary location

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    industry: string; // Industry category (e.g., IT, Healthcare)

    @HasMany(() => JobPost, {
        onDelete: "CASCADE", // Deletes job posts if the company is deleted
        onUpdate: "CASCADE", // Updates foreign key references if the company is updated
    })
    jobPosts: JobPost[];
}