import { environment } from "@env/environment.development";
import { ProsConsResponse } from "src/app/interfaces";


export const prosConsUseCase = async(prompt:string) =>{
    try{
        const response = await fetch(`${environment.backendAPI}/pros-cons-dicusser`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt})
        })

        if (!response.ok)  throw new Error("No se pudo realizar la petición");
        const data = await response.json() as ProsConsResponse;
        return {
            ok:true,
            message:data.content
        }

    }catch(error){
        return {
            ok:false,                        
            message:"Error"
        }

    }
}
  