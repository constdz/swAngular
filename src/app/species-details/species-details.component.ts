import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterInfo, SpeciesInfo } from '../../types/types';
import { Subscription, tap } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTable } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-species-details',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf],
  templateUrl: './species-details.component.html',
  styleUrl: './species-details.component.scss'
})
export class SpeciesDetailsComponent implements OnInit, OnDestroy {
  speciesId   !: string;
  species !:SpeciesInfo;
  private subscriptions : Subscription[] = []

  constructor(
    private restService : RestService,
    private activatedRoute : ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    // fetching parameter
    const subId = this.activatedRoute.paramMap
      .pipe(
        tap((params: ParamMap) => {
          let specId = params.get('id')!;
          this.speciesId = specId;
        }
      )
    ).subscribe();
    this.subscriptions.push(subId);

    const subSpeciesInfo = this.restService.getSpeciesInformation(this.speciesId).subscribe(
      (values: SpeciesInfo) => {
        this.species = values
        console.log(this.species);

      });
    this.subscriptions.push(subSpeciesInfo);
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getId(text:string) : string {
    if (!text) {
      return "";
    }
    let words = text.split('/');
    return words[words.length-2];
  }

  goFilm(id:string) {
    this.router.navigate(["films/"+id]);
  } 

  goStarship(id:string) {
    this.router.navigate(["starships/"+id]);
  } 

  goVehicle(id:string) {
    this.router.navigate(["vehicles/"+id]);
  } 

  goPlanet(id:string) {
    this.router.navigate(["planets/"+id]);
  } 

  goSpecies(id:string) {
    this.router.navigate(["species/"+id]);
  } 

  goCharacter(id:string) {
    this.router.navigate(["people/"+id]);
  } 

}
