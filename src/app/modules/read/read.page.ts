import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Chapter } from 'src/app/interfaces/chapter.interface';
import { StateService } from 'src/app/services/state.service';
import { State } from 'src/app/interfaces/state.interface';
import { IonContent, ModalController } from '@ionic/angular';
import { SelectBookModalComponent } from 'src/app/modals/select-book/select-book.modal';
import { BibleBookId } from 'src/app/types/bible-book-id';
import { BibleService } from 'src/app/services/bible.service';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@Component({
  selector: 'app-read',
  templateUrl: 'read.page.html',
  styleUrls: ['read.page.scss'],
})
export class ReadPage {

  state: State;
  currentChapterLoaded = false;
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    public modalController: ModalController,
    private bibleService: BibleService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ionViewWillEnter() {

    this.stateService.state.subscribe((state) => {
      this.state = { ...state };
    });

    if (this.state?.currentChapter?.data?.content) {
      this.currentChapterLoaded = true;
    } else { // if there's no currentChapter, get Genesis 1
      this.changeCurrentChapter('GEN', '1');
    }

  }

  changeCurrentChapter(bookId: BibleBookId, chapter: string) {
    this.ionContent.scrollToTop();
    this.currentChapterLoaded = false;
    this.apiService.getChapter(bookId, chapter).subscribe((chapterData: Chapter) => {
      this.state.currentChapter = { ...chapterData };
      this.state.currentBible[bookId][parseInt(chapter, 10) - 1] = { ...chapterData };
      this.stateService.replace(this.state).then(() => {
        this.currentChapterLoaded = true;
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  getNextChapter() {
    let chapter = this.state.currentChapter.data.next.number;
    if (this.state.currentChapter.data.next.number === 'intro') { // skip over intro to chapter 1
      chapter = '1';
    }
    this.changeCurrentChapter(this.state.currentChapter.data.next.bookId, chapter);
  }

  getPrevChapter() {
    let chapter = this.state.currentChapter.data.previous.number;
    let bookId = this.state.currentChapter.data.previous.bookId;
    if (this.state.currentChapter.data.previous.number === 'intro') { // skip over intro to last chapter of previous book
      bookId = this.bibleService.getPreviousBookId(this.state.currentChapter.data.bookId);
      chapter = this.bibleService.getLastChapterOfBook(bookId);
    }
    this.changeCurrentChapter(bookId, chapter);
  }

  async showSelectBookModal() {
    const modal = await this.modalController.create({
      component: SelectBookModalComponent
    });
    modal.onWillDismiss().then((modalResponse: any) => {
      if (modalResponse?.data?.bookId && modalResponse?.data?.chapter) {
        this.changeCurrentChapter(modalResponse.data.bookId, modalResponse.data.chapter);
      }
    });
    return await modal.present();
  }

}
