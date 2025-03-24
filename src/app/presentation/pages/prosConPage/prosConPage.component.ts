import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiService } from '../../services/openai.service';
import { Message, ProsConsResponse } from 'src/app/interfaces';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';

@Component({
  selector: 'app-pros-con-page',
  imports: [ChatMessageComponent,MyMessageComponent,TypingLoaderComponent,TextMessageBoxComponent],
  templateUrl: './prosConPage.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConPageComponent {

  public messages =signal<Message[]>([]);
  public openAiService= inject(OpenAiService);  
  public isLoading = signal<boolean>(false);



  handleMessage(promt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev,
      {
        text: promt,
        isGpt: false
      }
      ]);
    this.openAiService.prosCons(promt).subscribe((response) => {
      this.messages.update((prev) => [...prev,
        {
          text: response.message || '',
          isGpt: true
        }
        ]);
      this.isLoading.set(false);
    }
    );
  }
  

 }
