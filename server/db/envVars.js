import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS={
    MONGODB_URL:process.env.MONGODB_URL,
    PORT:process.env.PORT||5000,

    JWT_KEY:process.env.JWT_KEY,
   
}