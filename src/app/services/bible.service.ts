import { Injectable } from '@angular/core';
import { BibleBook } from '../interfaces/bible-book.interface';
import { BibleBookId } from '../types/bible-book-id';
import { StateService } from './state.service';
import { State } from '../interfaces/state.interface';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  constructor(private stateService: StateService) { }

  bibleBooksArray: BibleBook[] = [
    { id: 'GEN', label: 'Genesis' },
    { id: 'EXO', label: 'Exodus' },
    { id: 'LEV', label: 'Leviticus' },
    { id: 'NUM', label: 'Numbers' },
    { id: 'DEU', label: 'Deuteronomy' },
    { id: 'JOS', label: 'Joshua' },
    { id: 'JDG', label: 'Judges' },
    { id: 'RUT', label: 'Ruth' },
    { id: '1SA', label: '1 Samuel' },
    { id: '2SA', label: '2 Samuel' },
    { id: '1KI', label: '1 Kings' },
    { id: '2KI', label: '2 Kings' },
    { id: '1CH', label: '1 Chronicles' },
    { id: '2CH', label: '2 Chronicles' },
    { id: 'EZR', label: 'Ezra' },
    { id: 'NEH', label: 'Nehemiah' },
    { id: 'EST', label: 'Esther' },
    { id: 'JOB', label: 'Job' },
    { id: 'PSA', label: 'Psalms' },
    { id: 'PRO', label: 'Proverbs' },
    { id: 'ECC', label: 'Ecclesiastes' },
    { id: 'SNG', label: 'Song of Solomon' },
    { id: 'ISA', label: 'Isaiah' },
    { id: 'JER', label: 'Jeremiah' },
    { id: 'LAM', label: 'Lamentations' },
    { id: 'EZK', label: 'Ezekiel' },
    { id: 'DAN', label: 'Daniel' },
    { id: 'HOS', label: 'Hosea' },
    { id: 'JOL', label: 'Joel' },
    { id: 'AMO', label: 'Amos' },
    { id: 'OBA', label: 'Obadiah' },
    { id: 'JON', label: 'Jonah' },
    { id: 'MIC', label: 'Micah' },
    { id: 'NAM', label: 'Nahum' },
    { id: 'HAB', label: 'Habbakuk' },
    { id: 'ZEP', label: 'Zephaniah' },
    { id: 'HAG', label: 'Haggai' },
    { id: 'ZEC', label: 'Zechariah' },
    { id: 'MAL', label: 'Malachi' },
    { id: 'MAT', label: 'Matthew' },
    { id: 'MRK', label: 'Mark' },
    { id: 'LUK', label: 'Luke' },
    { id: 'JHN', label: 'John' },
    { id: 'ACT', label: 'Acts' },
    { id: 'ROM', label: 'Romans' },
    { id: '1CO', label: '1 Corinthians' },
    { id: '2CO', label: '2 Corinthians' },
    { id: 'GAL', label: 'Galatians' },
    { id: 'EPH', label: 'Ephesians' },
    { id: 'PHP', label: 'Philippians' },
    { id: 'COL', label: 'Colossians' },
    { id: '1TH', label: '1 Thessalonians' },
    { id: '2TH', label: '2 Thessalonians' },
    { id: '1TI', label: '1 Timothy' },
    { id: '2TI', label: '2 Timothy' },
    { id: 'TIT', label: 'Titus' },
    { id: 'PHM', label: 'Philemon' },
    { id: 'HEB', label: 'Hebrews' },
    { id: 'JAS', label: 'James' },
    { id: '1PE', label: '1 Peter' },
    { id: '2PE', label: '2 Peter' },
    { id: '1JN', label: '1 John' },
    { id: '2JN', label: '2 John' },
    { id: '3JN', label: '3 John' },
    { id: 'JUD', label: 'Jude' },
    { id: 'REV', label: 'Revelation' }
  ];

  getBibleBooks() {
    return this.bibleBooksArray;
  }

  getPreviousBookId(bookId: BibleBookId): BibleBookId {
    let previousBookId: BibleBookId;
    this.bibleBooksArray.forEach((book, index) => {
      if (book.id === bookId) {
        previousBookId = this.bibleBooksArray[index - 1].id;
      }
    });
    return previousBookId;
  }

  getLastChapterOfBook(bookId: BibleBookId): string {
    const state: State = this.stateService.state.getValue();
    const lastChapterOfBook = state.currentBible[bookId].length.toString();
    return lastChapterOfBook;
  }

}
