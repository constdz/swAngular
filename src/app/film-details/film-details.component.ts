import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { FilmInfo } from '../../types/types';
import { MatCardModule } from '@angular/material/card';
import { MatTable } from '@angular/material/table';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [MatCardModule, NgFor],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss'
})
export class FilmDetailsComponent {
  filmId   !: string;
  film  !: FilmInfo;
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
          let fid = params.get('id')!;
          this.filmId = fid;
        }
      )
    ).subscribe();
    this.subscriptions.push(subId);

    const subFilmInfo = this.restService.getFilmInformation(this.filmId).subscribe(
      (values: FilmInfo) => {
        this.film = values
        console.log(this.film);

      });
    this.subscriptions.push(subFilmInfo);
    
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
