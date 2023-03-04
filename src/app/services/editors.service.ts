import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Editor } from '../models/editor';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class EditorsService {
  private path = '/editors/';
  private editorStore: AngularFirestore;
  private editorCollection: AngularFirestoreCollection<Editor>;

  constructor(private db: AngularFirestore) {
    this.editorStore = db;
    this.editorCollection = db.collection(this.path);
  }

  json2Editor(json: any): Editor {
    return new Editor(
      json.companyname,
      json.festivalId,
      json.companycontacts,
      json.id
    );
  }

  getAllEditors(festivalId: string): Observable<Editor[]> {
    // return this.editorCollection.valueChanges({ idField: 'id' }).pipe(
    //   // tap((doc) => {
    //   //   this.messageService.log(`doc=${JSON.stringify(doc)}`);
    //   // }),
    //   map((data) => data.map((doc) => this.json2Editor(doc)))
    // );
    return this.editorStore
      .collection<Editor>(this.path, (ref) =>
        ref.where('festivalId', '==', festivalId)
      )
      .valueChanges({ idField: 'id' })
      .pipe(map((data) => data.map((doc) => this.json2Editor(doc))));
  }

  addUpdateEditor(editor: Editor) {
    if (editor.id == null) {
      editor.id = this.editorStore.createId();
    }
    this.editorCollection.doc(editor.id).set(Object.assign({}, editor));
  }
  addNewEditor(editor: Editor) {
    if (editor.id == null) {
      editor.id = this.editorStore.createId();
    }
    this.editorCollection
      .doc(editor.id)
      .get()
      .subscribe((doc) => {
        if (!doc.exists) {
          this.editorCollection.doc(editor.id).set(Object.assign({}, editor));
        } // else doc exists!
      });
  }

  deleteEditor(editor: Editor) {
    this.editorStore.doc<Editor>(this.path + editor.id).delete();
  }
  getEditor(id: any): Observable<Editor> {
    var itemDoc = this.editorStore.doc<Editor>(this.path + id);
    return itemDoc.valueChanges().pipe(map((fest) => this.json2Editor(fest)));
  }
}
