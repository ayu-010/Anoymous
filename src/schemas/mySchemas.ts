import {z} from "zod"

 export const mySchemas=z.object({
     name:z.string().min(6, { message: 'Password must be at least 6 characters' }),
});