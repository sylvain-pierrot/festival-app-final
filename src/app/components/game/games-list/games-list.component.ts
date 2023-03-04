import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent {
  @Input() games: Game[] | null = null;
  @Input() festivalId!: string;
  @Output() gameSelected: EventEmitter<Game> = new EventEmitter();

  gameCreateGroup!: FormGroup;

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.gameCreateGroup = new FormGroup({
      name: new FormControl(''),
    });
  }

  emitGame(game: Game): void {
    this.gameSelected.emit(game);
  }

  createGame(): void {
    const name = this.gameCreateGroup.get('name')!.value;

    const newGame: Game = new Game(name, this.festivalId);

    this.gameService.addNewGame(newGame);
  }

  constructor(public gameService: GamesService) {}
}
