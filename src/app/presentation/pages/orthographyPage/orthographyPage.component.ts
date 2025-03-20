import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '../../components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from 'src/app/interfaces';
import { OpenAiService } from '../../services/openai.service';




@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxComponent,    
    TypingLoaderComponent,
    
  ],
  templateUrl: './orthographyPage.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent { 

  public messages =signal<Message[]>([{
    text: 'Hola, soy tu asistente virtual, ¿en qué puedo ayudarte hoy?',
    isGpt:true
  }]);

  public openAiService= inject(OpenAiService);
  
  public isLoading = signal<boolean>(false);




  handleMessage(promt: string) {
    console.log(promt);
  }



}
