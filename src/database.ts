import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseLoggerService implements OnApplicationBootstrap {
    constructor(private readonly sequelize: Sequelize) { }

    async onApplicationBootstrap() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}