import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'chat-message',
  imports: [],
  templateUrl: './chatMessage.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  class ChatMessageComponent { 

  @Input({required:true}) text!: string;
}
