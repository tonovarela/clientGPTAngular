import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from 'src/app/interfaces';
import { OpenAiService } from '../../services/openai.service';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-text-to-audio-page',
  imports: [    
    ChatMessageComponent, MyMessageComponent, TypingLoaderComponent,TextMessageBoxSelectComponent
  ],
  templateUrl: './textToAudioPage.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {

  public messages =signal<Message[]>([]);

  public openAiService= inject(OpenAiService);
  
  public isLoading = signal<boolean>(false);

  public voices =[
    {id:"nova",text:"Nova"},
    {id:"alloy",text:"Alloy"},
    {id:"echo",text:"Echo"},
    {id:"fable",text:"Fable"},
    {id:"onyx",text:"Onyx"},
    {id:"shimmer",text:"Shimmer"},
  ]

  
  async hangleMessageWithSelect({prompt,selectedOption}: TextMessageBoxEvent) {
    const message =`${selectedOption} - ${prompt}`;
    this.messages.update(prev=>[...prev, { text: message, isGpt: false }]);
    this.isLoading.set(true);
    this.openAiService.textToAudio(prompt, selectedOption).subscribe(({message,audioUrl}) => {
      this.isLoading.set(false);
      this.messages.update(prev=>[...prev, { text: message, isGpt: true, audioUrl }]);
    });


     
  }




}