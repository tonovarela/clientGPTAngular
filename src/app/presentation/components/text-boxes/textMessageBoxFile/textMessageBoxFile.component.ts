import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export  interface  TextMessageEvent {
  prompt: string | null;
  file: File;
}

@Component({
  selector: 'text-message-box-file',
  imports: [ReactiveFormsModule],
  templateUrl: './textMessageBoxFile.component.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {


  @Input() placeholder: string = '';
  
  @Output() onMessage = new EventEmitter<TextMessageEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [''],
    file:[null,Validators.required]
  });


  public file :File | undefined= undefined;


  handleSelectedFile(event: any) {  
    const file = event.target.files[0];    
    this.form.controls.file.setValue(file);
  }


  handleSubmit() {
    if (this.form.invalid) return
    const { prompt ='',file } = this.form.value;
    this.onMessage.emit({prompt,file:file!});
    this.form.reset();

 }
}


