import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'my-message',
  imports: [MarkdownModule],
  templateUrl: './myMessage.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  class MyMessageComponent {

  @Input({required: true}) text!: string;
 }
