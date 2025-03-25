import { environment } from "@env/environment.development"

export const textToAudioUseCase = async(prompt:string,voice:string)=>{
    try{
        const response = await fetch(`${environment.backendAPI}/text-to-audio`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt,voice})
        })

        if (!response.ok)  throw new Error("No se pudo generar el audio");
        const audioFile = await response.blob() as Blob;
        const url = URL.createObjectURL(audioFile);
        return {
            ok:true,
            message:prompt,
            audioUrl:url
        }

    }catch(error){
        return {
            ok:false,                        
            message:"No se pudo generar el audio",
            audioUrl:""
        }

    }
}
  