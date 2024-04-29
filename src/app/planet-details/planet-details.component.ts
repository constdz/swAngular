import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { CharacterInfo, Characters, PlanetInfo } from '../../types/types';
import { MatCardModule } from '@angular/material/card';
import { MatTable } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf],
  templateUrl: './planet-details.component.html',
  styleUrl: './planet-details.component.scss'
})
export class PlanetDetailsComponent {
  planetId   !: string;
  planet  !: PlanetInfo;
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
          let planId = params.get('id')!;
          this.planetId = planId;
        }
      )
    ).subscribe();
    this.subscriptions.push(subId);

    const subPlanetInfo = this.restService.getPlanetInformation(this.planetId).subscribe(
      (values: PlanetInfo) => {
        this.planet = values
        console.log(this.planet);

      });
    this.subscriptions.push(subPlanetInfo);
    
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
