import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { CharacterInfo, Characters } from '../../types/types';
import { MatCardModule } from '@angular/material/card';
import { MatTable } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {

  characterId   !: string;
  character !:CharacterInfo;
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
          let charId = params.get('id')!;
          this.characterId = charId;
          this.updateState(charId);
        }
      )
    ).subscribe();
    this.subscriptions.push(subId);
  }
  updateState(charId: string) {
    const subCharacterInfo = this.restService.getCharacterInformation(this.characterId).subscribe(
      (values: CharacterInfo) => {
          this.character = values
          console.log(this.character);
      });
    this.subscriptions.push(subCharacterInfo);
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

  

}
