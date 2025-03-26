import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from 'src/app/interfaces';
import { OpenAiService } from '../../services/openai.service';


@Component({
  selector: 'app-audio-to-text-page',
  imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent,TextMessageBoxFileComponent],
  templateUrl: './audioToTextPage.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  public messages =signal<Message[]>([]);

  public openAiService= inject(OpenAiService);
  
  public isLoading = signal<boolean>(false);


  handleMessageWithFile(promtWithFile: TextMessageEvent) {
    this.isLoading.set(true);
    const { file,prompt} = promtWithFile;
    this.openAiService.audioToText(file,prompt!).subscribe(({text}) => {
      this.isLoading.set(false);      
      const texto =" ## Transcripción de audio ## \n"+ text;
      this.messages.update((messages)=>[...messages,{ text:texto,isGpt:true}]);

    }); 
      
    
  }


 }
