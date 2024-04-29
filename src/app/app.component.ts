import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatTable } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { NamesService } from '../services/names.service';
import { CommonModule, NgFor } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharacterDetailsComponent, MatInputModule, MatAutocompleteModule, NgFor, ReactiveFormsModule, 
    FormsModule, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'swApp';
  options  = [""];
  filteredOptions!: Observable<string[]>;
  formControl: FormControl = new FormControl();
  charactersId : any = {};
  inputCharacter: string = "";

  constructor(
    private namesService : NamesService,
    private router : Router,
    private _location: Location
  ) { }

  // filter for autocomplete
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  ngOnInit(): void {
    this.namesService.ngOnInit(); // fetching all the names from the API
    this.namesService.names$.subscribe(
      (values:Map<string,string>) => {
        this.options = Object.keys(values);
        this.charactersId = values;
      }
    );
    // filtering for the
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  goCharacter(name:string) {
    console.log(name);
    console.log(this.charactersId);
    this.router.navigate(["people/"+this.charactersId[name]]); 
  }
  
}
