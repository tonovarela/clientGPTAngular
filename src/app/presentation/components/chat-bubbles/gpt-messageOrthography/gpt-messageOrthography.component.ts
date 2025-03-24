import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { InfoOrthography, Message } from 'src/app/interfaces';

@Component({
  selector: 'gpt-message-orthography',
  imports: [MarkdownModule],
  templateUrl: './gpt-messageOrthography.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent { 

    @Input() message!:Message


    get info():InfoOrthography{
        return this.message.info!
    }
}
