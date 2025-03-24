import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { GptMessageOrthographyComponent } from '@components/chat-bubbles/gpt-messageOrthography/gpt-messageOrthography.component';
import { Message } from 'src/app/interfaces';
import { OpenAiService } from '../../services/openai.service';


@Component({
  selector: 'app-orthography-page',
  imports: [
    MyMessageComponent,
    GptMessageOrthographyComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,

  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent implements AfterViewInit {

  @ViewChild('chatContainer') public chatContainer!: ElementRef;

  public openAiService = inject(OpenAiService);

  public isLoading = signal<boolean>(false);

  public messages = signal<Message[]>([
    {
      text: 'Hola, ¿en qué puedo ayudarte?',
      isGpt: true
    },
    {
      text: 'Hola, ¿en qué puedo ayudarte?',
      isGpt: false
    }
  ]);
  scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        const element = this.chatContainer.nativeElement;
        element.scrollTo({
          top: element.scrollHeight + 200,
          behavior: 'smooth'
        });
      }
      console.log('scrolling');

    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }



  handleMessage(promt: string) {

    this.messages.update((prev) => [...prev,
    {
      text: promt,
      isGpt: false
    }
    ]);
    this.isLoading.set(true);
    setTimeout(() => {
      this.scrollToBottom();

    }, 100);

    this.openAiService.checkOrthography(promt).subscribe((response) => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: response.message,
          info: response
        }
      ]);
      setTimeout(() => {
        this.scrollToBottom();

      }, 100);

    });

  };




}
