import { InfoOrthography } from "./orthography.response";

export interface Message {
    text:string;
    isGpt:boolean;
    info?:InfoOrthography
    
}

