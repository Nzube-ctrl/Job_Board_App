import { Column, BelongsTo, ForeignKey, HasMany, Table, Model, DataType } from "sequelize-typescript";
import { JobApplication } from "./jobApplication.model";
import { Company } from "./company.model";


@Table({
    tableName: "job_posts",
    timestamps: true, 
  })
  export class JobPost extends Model<JobPost> {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    })
    id: string;
  
    @ForeignKey(() => Company)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    companyId: string;
  
    @BelongsTo(() => Company)
    company: Company;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: `unique_job_post`
    })
    title: string;
  
    @Column({
      type: DataType.TEXT,
      allowNull: false,
    })
    description: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: `unique_job_post`,
    })
    location: string; 
  
    @Column({
      type: DataType.ENUM("full-time", "part-time", "contract", "freelance", "internship"),
      allowNull: false,
    })
    jobType: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    salaryRange: string; // e.g., "$50,000 - $70,000"
  
    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    applicationDeadline: Date;
  
    @Column({
      type: DataType.ENUM("active", "closed"),
      allowNull: false,
      defaultValue: "active",
    })
    status: string;
  
    @HasMany(() => JobApplication, {
      onDelete: "CASCADE", // Deletes applications if the job post is deleted
      onUpdate: "CASCADE", // Updates foreign key references if the job post is updated
    })
    applications: JobApplication[];
  }
// @Table({
//     tableName: "job_posts",
//     timestamps: true, 
//   })
//   export class JobPost extends Model<JobPost> {
//     @Column({
//       type: DataType.UUID,
//       defaultValue: DataType.UUIDV4,
//       primaryKey: true,
//     })
//     id: string;
  
//     @ForeignKey(() => User)
//     @Column({
//       type: DataType.UUID,
//       allowNull: false,
//     })
//     companyId: string;
  
//     @BelongsTo(() => User)
//     company: User;
  
//     @Column({
//       type: DataType.STRING,
//       allowNull: false,
//     })
//     title: string;
  
//     @Column({
//       type: DataType.TEXT,
//       allowNull: false,
//     })
//     description: string;
  
//     @Column({
//       type: DataType.STRING,
//       allowNull: false,
//     })
//     location: string; // e.g., City, State, or Remote
  
//     @Column({
//       type: DataType.ENUM("full-time", "part-time", "contract", "freelance", "internship"),
//       allowNull: false,
//     })
//     jobType: string;
  
//     @Column({
//       type: DataType.STRING,
//       allowNull: true,
//     })
//     salaryRange: string; // e.g., "$50,000 - $70,000"
  
//     @Column({
//       type: DataType.DATE,
//       allowNull: true,
//     })
//     applicationDeadline: Date;
  
//     @Column({
//       type: DataType.ENUM("active", "closed"),
//       allowNull: false,
//       defaultValue: "active",
//     })
//     status: string;
  
//     @HasMany(() => JobApplication, {
//       onDelete: "CASCADE", // Deletes applications if the job post is deleted
//       onUpdate: "CASCADE", // Updates foreign key references if the job post is updated
//     })
//     applications: JobApplication[];
//   }