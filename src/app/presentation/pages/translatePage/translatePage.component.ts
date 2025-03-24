import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';


import { Message } from 'src/app/interfaces';
import { OpenAiService } from '../../services/openai.service';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';

import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';


@Component({
  selector: 'app-translate-page',
  imports: [ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxSelectComponent,
    TypingLoaderComponent,    
  ],
  templateUrl: './translatePage.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {
  public messages = signal<Message[]>([]);
  public langs = [
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]

  public openAiService = inject(OpenAiService);

  public isLoading = signal<boolean>(false);




  hangleMessageWithSelect(promtWithSelect: TextMessageBoxEvent) {
    const { prompt, selectedOption } = promtWithSelect;
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev,
    {
      text: prompt,
      isGpt: false
    }
    ]);
    this.openAiService.translate(prompt, selectedOption).subscribe((response) => {
      this.messages.update((prev) => [...prev,
      {
        text: response.content || '',
        isGpt: true
      }
      ]);
      this.isLoading.set(false);
    });

  }

}
