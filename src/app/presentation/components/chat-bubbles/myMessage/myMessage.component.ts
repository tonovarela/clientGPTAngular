import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'my-message',
  imports: [],
  templateUrl: './myMessage.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  class MyMessageComponent {

  @Input({required: true}) text!: string;
 }
