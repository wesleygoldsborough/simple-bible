import { Component, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { State } from 'src/app/interfaces/state.interface';
import { StateService } from 'src/app/services/state.service';
import { BibleService } from 'src/app/services/bible.service';
import { BibleBook } from 'src/app/interfaces/bible-book.interface';
import { BibleBookId } from 'src/app/types/bible-book-id';

@Component({
  selector: 'app-select-book',
  templateUrl: 'select-book.modal.html',
  styleUrls: ['select-book.modal.scss'],
})
export class SelectBookModalComponent {

  @ViewChild(IonContent, { static: false }) ionContent: IonContent;
  state: State;
  activeBookID: BibleBookId;
  bibleBooks: BibleBook[];

  constructor(
    public modalController: ModalController,
    private stateService: StateService,
    private bibleService: BibleService
  ) { }

  ionViewWillEnter() {
    this.bibleBooks = this.bibleService.getBibleBooks();
    this.state = this.stateService.state.getValue();
  }

  selectBook(bookId: BibleBookId, ev) {
    if (this.state?.currentBible?.[bookId].length === 1) { // only one chapter, just fetch the chapter
      this.selectBookAndChapter(bookId, 1);
    } else {
      if (this.activeBookID === bookId) { // toggle chapters visibility
        this.activeBookID = null;
      } else {
        this.activeBookID = bookId;
        setTimeout(() => {
          this.ionContent.scrollToPoint(0, ev.srcElement.offsetTop, 500);
        }, 1);
      }
    }
  }

  selectBookAndChapter(bookId: BibleBookId, chapter: number) {
    this.modalController.dismiss({ bookId, chapter });
  }

}
