import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CharacterInfo, Characters, FilmInfo, PlanetInfo, SpeciesInfo, StarshipInfo, VehicleInfo } from '../types/types';
import { EnvironmentService } from './environment.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private environment: EnvironmentService,
    private httpClient: HttpClient
  ) { }

  private readonly routes = {
    getPeople: `${this.environment.APIBaseUrl}/people`,
    getSpecies: `${this.environment.APIBaseUrl}/species`,
    getFilms: `${this.environment.APIBaseUrl}/films`,
    getVehicles: `${this.environment.APIBaseUrl}/vehicles`,
    getPlanets: `${this.environment.APIBaseUrl}/planets`,
    getStarships: `${this.environment.APIBaseUrl}/starships`
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      alert("Server returned code " + error.status + " body was: " + error.error.detail);
    }
    return throwError(() => new Error('Something wrong happened'));
  }


  public getCharacterInformation(id : string) : Observable<CharacterInfo>{
    return this.httpClient.get<CharacterInfo>(this.routes.getPeople + "/" + id).pipe(
      catchError(this.handleError)
    );
  }

  public getCharacters(page : number) : Observable<Characters>{
    return this.httpClient.get<Characters>(this.routes.getPeople + "/?page=" + page).pipe(
      catchError(this.handleError));
  }

  public getCharactersUrl(url : string) : Observable<Characters>{
    return this.httpClient.get<Characters>(url).pipe(
      catchError(this.handleError));
  }

  public getSpeciesInformation(id : string) : Observable<SpeciesInfo>{
    return this.httpClient.get<SpeciesInfo>(this.routes.getSpecies + "/" + id).pipe(
      catchError(this.handleError));
  }

  public getSpecies() : Observable<SpeciesInfo>{
    return this.httpClient.get<SpeciesInfo>(this.routes.getSpecies).pipe(
      catchError(this.handleError));
  }

  public getFilmInformation(id : string) : Observable<FilmInfo>{
    return this.httpClient.get<FilmInfo>(this.routes.getFilms + "/" + id).pipe(
      catchError(this.handleError));
  }

  public getFilms() : Observable<FilmInfo>{
    return this.httpClient.get<FilmInfo>(this.routes.getFilms).pipe(
      catchError(this.handleError));
  }

  public getVehicleInformation(id : string) : Observable<VehicleInfo>{
    return this.httpClient.get<VehicleInfo>(this.routes.getVehicles + "/" + id).pipe(
      catchError(this.handleError));
  }

  public getVehicles() : Observable<VehicleInfo>{
    return this.httpClient.get<VehicleInfo>(this.routes.getVehicles).pipe(
      catchError(this.handleError));
  }

  public getStarshipInformation(id : string) : Observable<StarshipInfo>{
    return this.httpClient.get<StarshipInfo>(this.routes.getStarships + "/" + id).pipe(
      catchError(this.handleError));
  }

  public getStarships() : Observable<StarshipInfo>{
    return this.httpClient.get<StarshipInfo>(this.routes.getStarships).pipe(
      catchError(this.handleError));
  }

  public getPlanetInformation(id : string) : Observable<PlanetInfo>{
    return this.httpClient.get<PlanetInfo>(this.routes.getPlanets + "/" + id).pipe(
      catchError(this.handleError));
  }

  public getPlanets() : Observable<PlanetInfo>{
    return this.httpClient.get<PlanetInfo>(this.routes.getPlanets).pipe(
      catchError(this.handleError));
  }
}
