import { Component, Input, OnInit } from '@angular/core';
import { Festival } from 'src/app/models/festival';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { FestivaljsonService } from 'src/app/services/festivaljson.service';
import { FestivalsService } from 'src/app/services/festivals.service';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css'],
})
export class FestivalDetailsComponent implements OnInit {
  @Input() festival!: Festival;

  festivalGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    // public festivalService: FestivaljsonService
    public festivalService: FestivalsService
  ) {}

  ngOnChanges(): void {
    this.festivalGroup = new FormGroup({
      name: new FormControl(this.festival!.name),
      entrancePrice: new FormControl(this.festival!.tableprice_1),
      mainRoomPrice: new FormControl(this.festival!.tableprice_2),
    });
  }

  ngOnInit(): void {
    if (this.route!.snapshot.paramMap.has('festivalId')) {
      const id = this.route!.snapshot.paramMap.get('festivalId');
      this.festivalService.getFestival(id).subscribe((fest) => {
        if (fest === undefined) {
          return;
        }
        this.festival = fest;
        this.updateFormFromFestival();
      });
    } else {
      this.updateFormFromFestival();
    }
  }
  updateFormFromFestival() {
    this.festivalGroup = new FormGroup({
      name: new FormControl(this.festival!.name),
      entrancePrice: new FormControl(this.festival!.tableprice_1),
      mainRoomPrice: new FormControl(this.festival!.tableprice_2),
    });
  }

  validate(): void {
    this.festival!.name = this.festivalGroup.get('name')!.value;
    this.festival!.tableprice_1 =
      this.festivalGroup.get('entrancePrice')!.value;
    this.festival!.tableprice_2 =
      this.festivalGroup.get('mainRoomPrice')!.value;

    this.festivalService.addUpdateFestival(this.festival);
  }

  setValue(): void {
    this.festivalGroup.patchValue({
      name: this.festival!.name,
      entrancePrice: this.festival!.tableprice_1,
      mainRoomPrice: this.festival!.tableprice_2,
    });
  }

  delete(): void {
    this.festivalService.deleteFestival(this.festival);
  }
}
