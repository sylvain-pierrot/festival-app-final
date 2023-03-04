import { Optional } from '@angular/core';

type GameType = 'enfant' | 'famille' | 'initié' | 'expert' | 'jeux de rôle';

export class Game {
  public name: string;
  public id?: string;
  public type: GameType;
  public agemin: number;
  public agemax: number;
  public numberofplayersmin: number;
  public numberofplayersmax: number;
  public durationofthegame: number;
  public festivalId?: string;

  public constructor(
    name: string,
    festivalId: string,

    @Optional() id?: string,
    @Optional() type: GameType = 'jeux de rôle',
    @Optional() agemin: number = 9,
    @Optional() agemax: number = 13,
    @Optional() numberofplayersmin: number = 5,
    @Optional() numberofplayersmax: number = 15,
    @Optional() durationofthegame: number = 600
  ) {
    this.festivalId = festivalId;
    this.name = name;
    this.id = id;
    this.type = type;
    this.agemin = agemin;
    this.agemax = agemax;
    this.numberofplayersmin = numberofplayersmin;
    this.numberofplayersmax = numberofplayersmax;
    this.durationofthegame = durationofthegame;
  }
}
