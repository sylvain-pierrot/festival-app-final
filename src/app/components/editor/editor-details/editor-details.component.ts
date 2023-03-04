import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'src/app/models/editor';
import { EditorsService } from 'src/app/services/editors.service';

@Component({
  selector: 'app-editor-details',
  templateUrl: './editor-details.component.html',
  styleUrls: ['./editor-details.component.css'],
})
export class EditorDetailsComponent {
  @Input() editor!: Editor;

  editorGroup!: FormGroup;

  constructor(
    // public festivalService: FestivaljsonService
    private route: ActivatedRoute,
    public editorService: EditorsService
  ) {}

  ngOnChanges(): void {
    this.editorGroup = new FormGroup({
      companyname: new FormControl(this.editor!.companyname),
      companycontacts: new FormControl(this.editor!.companycontacts),
    });
  }

  ngOnInit(): void {
    if (this.route!.snapshot.paramMap.has('festivalId')) {
      const id = this.route!.snapshot.paramMap.get('festivalId');
      this.editorService.getEditor(id).subscribe((fest) => {
        if (fest === undefined) {
          return;
        }
        this.editor = fest;
        this.updateFormFromEditor();
      });
    } else {
      this.updateFormFromEditor();
    }
  }
  updateFormFromEditor() {
    this.editorGroup = new FormGroup({
      companyname: new FormControl(this.editor!.companyname),
      companycontacts: new FormControl(this.editor!.companycontacts),
    });
  }

  validate(): void {
    this.editor!.companyname = this.editorGroup.get('companyname')!.value;
    this.editor!.companycontacts =
      this.editorGroup.get('companycontacts')!.value;

    this.editorService.addUpdateEditor(this.editor);
  }

  setValue(): void {
    this.editorGroup.patchValue({
      companyname: this.editor!.companyname,
      companycontacts: this.editor!.companycontacts,
    });
  }

  delete(): void {
    this.editorService.deleteEditor(this.editor);
  }
}
