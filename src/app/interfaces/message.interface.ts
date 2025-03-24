import { InfoOrthography } from "./orthography.response";

export interface Message {
    id?:string;
    text:string;
    isGpt:boolean;
    info?:InfoOrthography
    
}

