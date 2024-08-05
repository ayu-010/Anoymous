import 'next-auth'
import { DefaultSession } from 'next-auth';



// next auth module me hum next auth ke user ko redefine kar rhe h 

// yeha bta rhe h jo purana user h wo gya ab naya user h jo hum bta rhe h wo aisha h 
declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }

    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
        } & DefaultSession['user'];
    }
}


declare module 'next-auth/jwt'{
    interface JWT{
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}