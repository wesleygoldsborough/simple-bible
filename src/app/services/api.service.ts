import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../interfaces/state.interface';
import { Observable, of } from 'rxjs';
import { StateService } from './state.service';
import { BibleBookId } from '../types/bible-book-id';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  state: State;

  api = 'http://localhost:8080/bible/';

  constructor(private http: HttpClient, private stateService: StateService) {
    this.stateService.state.subscribe((state) => { this.state = { ...state }; });
  }

  public getChapter(bookId: BibleBookId, chapter: string): Observable<any> {
    // get chapter from local storage if it exists
    if (this.state?.currentBible?.[bookId]?.[parseInt(chapter, 10) - 1]?.data?.content) {
      console.log('Got Scripture From Local Storage: ' + bookId + ' ' + chapter);
      return of(this.state.currentBible[bookId][parseInt(chapter, 10) - 1]);
    } else { // use API to get chapter
      console.log('Got Scripture From API: ' + bookId + ' ' + chapter);
      const url = this.api + '?book=' + bookId + '&chapter=' + chapter;
      return this.http.get(url);
    }
  }

}
