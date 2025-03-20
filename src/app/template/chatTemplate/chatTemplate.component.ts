import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from 'src/app/interfaces';
import { OpenAiService } from 'src/app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  imports: [],
  templateUrl: './chatTemplate.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages =signal<Message[]>([]);

  public openAiService= inject(OpenAiService);
  
  public isLoading = signal<boolean>(false);


  handleMessageWithFile(promtWithFile: TextMessageEvent) {
    console.log(promtWithFile);
  }

  handleMessage(promt: string) {
    console.log(promt);
  }

  hangleMessageWithSelect(promtWithSelect: TextMessageBoxEvent) {
     console.log(promtWithSelect);

  }

 }
