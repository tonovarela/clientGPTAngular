import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfoOrthography, Message } from 'src/app/interfaces';

@Component({
  selector: 'gpt-message-orthography',
  imports: [],
  templateUrl: './gpt-messageOrthography.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent { 

    @Input() message!:Message


    get info():InfoOrthography{
        return this.message.info!
    }
}
