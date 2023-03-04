import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent {
  @Input() game!: Game;

  gameGroup!: FormGroup;

  constructor(
    // public festivalService: FestivaljsonService
    private route: ActivatedRoute,
    public gameService: GamesService
  ) {}

  ngOnChanges(): void {
    this.gameGroup = new FormGroup({
      name: new FormControl(this.game!.name),
    });
  }

  ngOnInit(): void {
    if (this.route!.snapshot.paramMap.has('festivalId')) {
      const id = this.route!.snapshot.paramMap.get('festivalId');
      this.gameService.getGame(id).subscribe((fest) => {
        if (fest === undefined) {
          return;
        }
        this.game = fest;
        this.updateFormFromGame();
      });
    } else {
      this.updateFormFromGame();
    }
  }
  updateFormFromGame() {
    this.gameGroup = new FormGroup({
      name: new FormControl(this.game!.name),
    });
  }

  validate(): void {
    this.game!.name = this.gameGroup.get('name')!.value;
    this.gameService.addUpdateGame(this.game);
  }

  setValue(): void {
    this.gameGroup.patchValue({
      companyname: this.game!.name,
    });
  }

  delete(): void {
    this.gameService.deleteGame(this.game);
  }
}
