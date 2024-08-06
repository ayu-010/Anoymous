import { Message } from "@/model/User";

// api reponse jo hum bhejnge 
export interface ApiResponse{
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean

    messages?:Array<Message>

}