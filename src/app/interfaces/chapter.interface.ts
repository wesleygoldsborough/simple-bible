import { BibleBookId } from '../types/bible-book-id';

export interface Chapter {
    data?: {
        id?: string;
        bibleId?: string;
        number?: string;
        bookId?: BibleBookId;
        reference?: string;
        copyright?: string;
        content?: string;
        next?: {
            id: string;
            number: string;
            bookId: BibleBookId;
        };
        previous?: {
            id: string;
            number: string;
            bookId: BibleBookId;
        };
    };
    meta?: {
        fums: string;
        fumsId: string;
        fumsJsInclude: string;
        fumsJs: string;
        fumsNoScript: string;
    };
}
