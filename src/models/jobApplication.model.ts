import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { JobPost } from "./jobPost.model";


@Table({
    tableName: 'job_applications',
    timestamps: true,
})
export class JobApplication extends Model<JobApplication> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    userId: string;

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => JobPost)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    jobId: string;

    @BelongsTo(() => JobPost)
    job: JobPost;

    @Column({
        type: DataType.ENUM("pending", "reviewed", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
    })
    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    coverLetter: string; // Optional field for users to submit a cover letter

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    resume: string; // URL or path to a custom resume for this application
}