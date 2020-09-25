import { Chapter } from './chapter.interface';
import { Bible } from '../classes/bible.class';

export interface State {
    currentChapter?: Chapter;
    currentBible?: Bible;
}
