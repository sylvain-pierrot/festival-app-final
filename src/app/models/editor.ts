import { Optional } from '@angular/core';

export class Editor {
  public id?: string;
  public festivalId?: string;
  public companyname: string;
  public companycontacts: string;

  public constructor(
    companyname: string,
    festivalId: string,

    companycontacts: string,
    @Optional() id?: string
  ) {
    this.id = id;
    this.festivalId = festivalId;
    this.companyname = companyname;
    this.companycontacts = companycontacts;
  }
}
