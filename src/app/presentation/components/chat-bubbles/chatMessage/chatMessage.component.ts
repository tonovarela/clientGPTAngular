import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {  MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'chat-message',
  imports: [MarkdownModule],
  templateUrl: './chatMessage.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  class ChatMessageComponent { 

  @Input({required:true}) text!: string;
}
