import dotenv from 'dotenv';

dotenv.config();

const POKE_API_URL = process.env?.POKE_API_URL;
export { POKE_API_URL };
