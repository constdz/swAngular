import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { CharacterInfo, StarshipInfo } from '../../types/types';
import { MatCardModule } from '@angular/material/card';
import { MatTable } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [MatCardModule, MatTable, NgFor, NgIf],
  templateUrl: './starship-details.component.html',
  styleUrl: './starship-details.component.scss'
})
export class StarshipDetailsComponent implements OnInit, OnDestroy {
  starshipId   !: string;
  starship !:StarshipInfo;
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
          let shipId = params.get('id')!;
          this.starshipId = shipId;
        }
      )
    ).subscribe();
    this.subscriptions.push(subId);

    const subStarshipInfo = this.restService.getStarshipInformation(this.starshipId).subscribe(
      (values: StarshipInfo) => {
        this.starship = values
        console.log(values);
        console.log(this.starship);

      });
    this.subscriptions.push(subStarshipInfo);    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getId(text:string) : string {
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
