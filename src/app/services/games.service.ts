import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from '../models/game';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private path = '/games/';
  private gameStore: AngularFirestore;
  private gameCollection: AngularFirestoreCollection<Game>;

  constructor(private db: AngularFirestore) {
    this.gameStore = db;
    this.gameCollection = db.collection(this.path);
  }

  json2Game(json: any): Game {
    return new Game(
      json.name,
      json.festivalId,
      json.id,
      json.type,
      json.agemin,
      json.agemax,
      json.numberofplayersmin,
      json.numberofplayersmax,
      json.durationofthegame
    );
  }

  getAllGames(festivalId: string): Observable<Game[]> {
    // return this.gameCollection
    //   .valueChanges({ idField: 'id' })
    //   .pipe(map((data) => data.map((doc) => this.json2Game(doc))));
    return this.gameStore
      .collection<Game>(this.path, (ref) =>
        ref.where('festivalId', '==', festivalId)
      )
      .valueChanges({ idField: 'id' })
      .pipe(map((data) => data.map((doc) => this.json2Game(doc))));
  }

  addUpdateGame(game: Game) {
    if (game.id == null) {
      game.id = this.gameStore.createId();
    }
    this.gameCollection.doc(game.id).set(Object.assign({}, game));
  }
  addNewGame(game: Game) {
    if (game.id == null) {
      game.id = this.gameStore.createId();
    }
    this.gameCollection
      .doc(game.id)
      .get()
      .subscribe((doc) => {
        if (!doc.exists) {
          this.gameCollection.doc(game.id).set(Object.assign({}, game));
        } // else doc exists!
      });
  }

  deleteGame(game: Game) {
    this.gameStore.doc<Game>(this.path + game.id).delete();
  }
  getGame(id: any): Observable<Game> {
    var itemDoc = this.gameStore.doc<Game>(this.path + id);
    return itemDoc.valueChanges().pipe(map((fest) => this.json2Game(fest)));
  }
}
