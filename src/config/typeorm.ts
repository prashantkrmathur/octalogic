import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
        type: 'postgres',
    host: `${process.env.PGHOST}`,
    port: parseInt(`${process.env.PGPORT}`, 10),
    username: `${process.env.PGUSER}`,
    password: `${process.env.PGPASSWORD}`,
    database: `${process.env.PGDATABASE}`,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,  
    logging: false, 
    ssl: {
        rejectUnauthorized: false
    }
}


export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);