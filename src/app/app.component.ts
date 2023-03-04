import { Component } from '@angular/core';
import { Festival } from './models/festival';
import { first, Observable } from 'rxjs';
// import { FestivaljsonService } from './services/festivaljson.service';
import { FestivalsService } from './services/festivals.service';
import { Editor } from './models/editor';
import { EditorsService } from './services/editors.service';
import { Game } from './models/game';
import { GamesService } from './services/games.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FestivalApp';

  editors!: Observable<Editor[]>;
  editorSelected: Editor | null = null;

  festivals!: Observable<Festival[]>;
  festivalSelected: Festival | null = null;

  games!: Observable<Game[]>;
  gameSelected: Game | null = null;

  constructor(
    private festivalJson: FestivalsService,
    private editorJson: EditorsService,
    private gameJson: GamesService
  ) {
    // festivals
    this.festivals = this.festivalJson.getAllFestivals();
    this.festivals.pipe(first()).subscribe((festivals) => {
      this.festivalSelected = festivals[0];

      // games
      this.games = this.gameJson.getAllGames(festivals[0].id as string);
      this.games.pipe(first()).subscribe((games) => {
        this.gameSelected = games[0];
      });

      // editors
      this.editors = this.editorJson.getAllEditors(festivals[0].id as string);
      this.editors.pipe(first()).subscribe((editors) => {
        this.editorSelected = editors[0];
      });
    });
  }

  changeFestival(festival: Festival): void {
    this.festivalSelected = festival;
    this.editors = this.editorJson.getAllEditors(festival.id as string);
    this.games = this.gameJson.getAllGames(festival.id as string);
  }

  changeEditor(editor: Editor): void {
    this.editorSelected = editor;
  }

  changeGame(game: Game): void {
    this.gameSelected = game;
  }
}
