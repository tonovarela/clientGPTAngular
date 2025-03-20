import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'typing-loader',
  imports: [],
  templateUrl: './typingLoader.component.html',
  styleUrl: './typingLoader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingLoaderComponent { }
