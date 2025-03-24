import { environment } from "@env/environment.development";


export async function* prosConsStreamUseCase (prompt:string,abortSignal:AbortSignal) {
    try{
        const response = await fetch(`${environment.backendAPI}/pros-cons-dicusser-stream`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt}),
            signal:abortSignal
        })

        if (!response.ok)  throw new Error("No se pudo realizar la petición");
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No se pudo obtener el reader");
        const decoder = new TextDecoder();
        let text = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            const decodedChunk = decoder.decode(value, { stream: true });
            text += decodedChunk;
            yield text;
        }
        return text;

    }catch(error){
        return null
    }
}
  