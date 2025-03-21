import { environment } from "@env/environment.development"
import { InfoOrthography } from "src/app/interfaces";


export const orthographyUseCase = async(prompt:string)=>{
    try{
        const response = await fetch(`${environment.backendAPI}/orthography-check`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt})
        })

        if (!response.ok)  throw new Error("No se pudo realizar la petición");
        const data = await response.json() as InfoOrthography;
        return {
            ok:true,
            ...data            
        }

    }catch(error){
        return {
            ok:false,
            userScore:0,
            errors:[],
            message:"Error"
        }

    }
}
  