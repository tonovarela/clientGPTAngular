import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from 'src/app/interfaces';
import { OpenAiService } from '../../services/openai.service';


@Component({
  selector: 'app-pros-con-stream-page',
  imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent],
  templateUrl: './prosConStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConStreamPageComponent {

  public messages = signal<Message[]>([]);
  public openAiService = inject(OpenAiService);
  public isLoading = signal<boolean>(false);

  public abortSignal = new AbortController();



  async handleMessage(promt: string) {
    this.abortSignal.abort();
    this.abortSignal = new AbortController();
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev,
    {
      id:crypto.randomUUID(),
      text: promt,
      isGpt: false
    },
    {
      id:crypto.randomUUID(),
      isGpt: true,
      text: "..."
    }
    ]);
    const stream = this.openAiService.prosConsStream(promt,this.abortSignal.signal)
    for await (const text of stream) {
     this.handleStreamResponse(text);
    }
    this.isLoading.set(false);
  }


  handleStreamResponse(message: string) {
    
     this.messages().pop();
     console.log(this.messages());
     const messages= this.messages();
      this.messages.set([...messages,
      {
        id:crypto.randomUUID(),
        text: message,
        isGpt: true
      }
      ])
    
  }
}
