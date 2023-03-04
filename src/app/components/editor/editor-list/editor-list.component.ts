import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor } from 'src/app/models/editor';
import { EditorsService } from 'src/app/services/editors.service';

@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.css'],
})
export class EditorListComponent {
  @Input() editors: Editor[] | null = null;
  @Input() festivalId!: string;
  @Output() editorSelected: EventEmitter<Editor> = new EventEmitter();

  editorCreateGroup!: FormGroup;

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.editorCreateGroup = new FormGroup({
      companyname: new FormControl(''),
      companycontacts: new FormControl(''),
    });
  }

  emitEditor(editor: Editor): void {
    this.editorSelected.emit(editor);
  }

  createEditor(): void {
    const companyname = this.editorCreateGroup.get('companyname')!.value;
    const companycontacts =
      this.editorCreateGroup.get('companycontacts')!.value;

    const newEditor: Editor = new Editor(
      companyname,
      this.festivalId,
      companycontacts
    );

    this.editorService.addNewEditor(newEditor);
  }

  constructor(public editorService: EditorsService) {}
}
