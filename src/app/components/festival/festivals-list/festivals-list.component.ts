import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Festival } from 'src/app/models/festival';
import { FestivalsService } from 'src/app/services/festivals.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css'],
})
export class FestivalsListComponent {
  @Input() festivals: Festival[] | null = null;
  @Output() festivalSelected: EventEmitter<Festival> = new EventEmitter();

  festivalCreateGroup!: FormGroup;

  ngOnInit(): void {
    this.logger.log(
      `Afficahe de la liste de festivals - ${this.festivals?.length} festivals`
    );
  }

  ngOnChanges(): void {
    this.festivalCreateGroup = new FormGroup({
      name: new FormControl(''),
    });
  }

  emitFestival(festival: Festival): void {
    this.festivalSelected.emit(festival);
    this.logger.log(JSON.stringify(festival));
  }

  createFestival(): void {
    const name = this.festivalCreateGroup.get('name')!.value;
    const newFestival: Festival = new Festival(name);

    // newFestival.name = this.festivalCreateGroup.get('tablemax_1')!.value;
    // newFestival.name = this.festivalCreateGroup.get('tablemax_2')!.value;
    // newFestival.name = this.festivalCreateGroup.get('tablemax_3')!.value;
    // newFestival.name = this.festivalCreateGroup.get('tableprice_1')!.value;
    // newFestival.name = this.festivalCreateGroup.get('tableprice_2')!.value;
    // newFestival.name = this.festivalCreateGroup.get('tableprice_3')!.value;
    // newFestival.name = this.festivalCreateGroup.get('sqmprice_1')!.value;
    // newFestival.name = this.festivalCreateGroup.get('sqmprice_2')!.value;
    // newFestival.name = this.festivalCreateGroup.get('sqmprice_3')!.value;

    this.festivalService.addNewFestival(newFestival);
  }

  constructor(
    public logger: MessageService,
    public festivalService: FestivalsService
  ) {}
}
