import { environment } from "@env/environment.development";
import { AudioToTextResponse } from "src/app/interfaces";



export const audioToText = async (file: File, prompt?: string) => {
    try {

        const formData = new FormData();    
        formData.append("file", file);  
        if (prompt) {
            formData.append("prompt", prompt);
        }
        const resp = await fetch(`${environment.backendAPI}/audio-to-text`, {
            method: "POST",
            body: formData
        });
        if (!resp.ok) {
            throw new Error("No se pudo convertir el audio a texto");
        }
        const data = await resp.json() as AudioToTextResponse;
        return data;
    

    } catch (error) {
        console.error(error);
        return {
            text: "Error al convertir el audio a texto",
        };
    }
    
}