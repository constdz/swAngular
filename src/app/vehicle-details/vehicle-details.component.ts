import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { CharacterInfo, VehicleInfo } from '../../types/types';
import { MatCardModule } from '@angular/material/card';
import { MatTable } from '@angular/material/table';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [MatCardModule, MatTable, NgFor],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicleId   !: string;
  vehicle  !: VehicleInfo;
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
          let vehicId = params.get('id')!;
          this.vehicleId = vehicId;
        }
      )
    ).subscribe();
    this.subscriptions.push(subId);

    const subVehicleInfo = this.restService.getVehicleInformation(this.vehicleId).subscribe(
      (values: VehicleInfo) => {
        this.vehicle = values
        console.log(this.vehicle);

      });
    this.subscriptions.push(subVehicleInfo);
    
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
