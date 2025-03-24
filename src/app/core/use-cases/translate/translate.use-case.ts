import { environment } from "@env/environment.development";
import { ProsConsResponse } from "src/app/interfaces";

interface Options {	
    prompt: string;
    lang: string;
}

export const translateUseCase = async ({prompt,lang}:Options) => {   

     try{
            const response = await fetch(`${environment.backendAPI}/translate`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({prompt,lang})
            })
    
            if (!response.ok)  throw new Error("No se pudo realizar la petición");
            const data = await response.json() as ProsConsResponse; 
            return {
                ok:true,
                content:data.content
                
            }
    
        }catch(error){
            return {
                ok:false,
                content:'',
            }
    
        }
    }