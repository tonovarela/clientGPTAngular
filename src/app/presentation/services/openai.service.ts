import { Injectable } from '@angular/core';
import { textToAudioUseCase } from '@use-cases/audios/text-to-audio.use-case';
import { orthographyUseCase } from '@use-cases/ortography/orthography.use-case';
import { prosConsStreamUseCase } from '@use-cases/pros-cons/pros-cons-stream.use-case';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { translateUseCase } from '@use-cases/translate/translate.use-case';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));  
  }

  prosCons(promt:string){
    return from(prosConsUseCase(promt));  
  }

  prosConsStream(promt:string,abortSignal:AbortSignal){
    return prosConsStreamUseCase(promt,abortSignal);  
  }

  translate(prompt:string,lang:string){
    return from(translateUseCase({prompt,lang}));
  }

  textToAudio(prompt:string,voice:string){
    return from(textToAudioUseCase(prompt,voice));
  }


}
