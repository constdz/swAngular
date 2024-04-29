import { Injectable, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { CharacterInfo, Characters } from '../types/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NamesService implements OnInit {
  personNames   !: Map<string, string>;
  is_set = false;
  // private charactersSubject = new BehaviorSubject<any[]>([]);
  private charactersSubject = new BehaviorSubject<any[]>([]);
  characters$ = this.charactersSubject.asObservable();
  private namesSubject = new Subject<Map<string, string>>();
  names$ = this.namesSubject.asObservable();
  // planetNames   !: Map<string, string>;
  // vehicleNames  !: Map<string, string>;
  // starshipNames !: Map<string, string>;
  // speciesNames  !: Map<string, string>;
  // filmNames     !: Map<string, string>;

  constructor(
    private restService: RestService,
    private httpClient: HttpClient
  ) { 
  }
  ngOnInit(): void {
    // getting the names
    this.fetchAllPages("https://swapi.py4e.com/api/people/?page=1"); 
  }
  private fetchAllPages(url: string): void {
    let data: any[] = [];

    const fetchPage = (currentUrl: string): Observable<any> => {
      return this.httpClient.get<Characters>(currentUrl).pipe(
        tap(response => {
          data = [...data, ...response.results];
          // Check for the next page URL
          const nextPageUrl = response.next;
          if (nextPageUrl) {
            // fetching the next page (recursively)
            fetchPage(nextPageUrl).subscribe();
          } else {
            this.charactersSubject.next(data);
            // making a map of names
            const namesMap = data.reduce((map, item) => {
              map[item.name] = this.getIdFromUrl(item.url); 
              return map;
            }, {} as Map<string, string>);
            this.namesSubject.next(namesMap);
            // console.log(namesMap);
            // this.characters$.subscribe(
            //   (values : CharacterInfo[]) =>
            //     console.log(values)
            // );
          }
        })
      );
    };
    // Start fetching from the initial URL
    fetchPage(url).subscribe();
  }

  getIdFromUrl(text:string) : string {
    let words = text.split('/');
    return words[words.length-2];
  }
}
