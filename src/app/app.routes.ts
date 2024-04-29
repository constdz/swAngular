import { Routes } from '@angular/router';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { AppComponent } from './app.component';
import { SpeciesDetailsComponent } from './species-details/species-details.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { FilmDetailsComponent } from './film-details/film-details.component';

export const routes: Routes = [
    // {
    //     path: '', 
    //     component: AppComponent,
    //     pathMatch : 'full'
    // },
    {
        path: 'people/:id',
        component: CharacterDetailsComponent
    },
    {
        path: 'species/:id',
        component: SpeciesDetailsComponent
    },
    {
        path: 'planets/:id',
        component: PlanetDetailsComponent
    },
    {
        path: 'starships/:id',
        component: StarshipDetailsComponent
    },
    {
        path: 'vehicles/:id',
        component: VehicleDetailsComponent
    },
    {
        path: 'films/:id',
        component: FilmDetailsComponent
    }
];
