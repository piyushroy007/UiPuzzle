import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getReadingList, markBookAsFinished, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,private snackbar : MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markAsFinishedReading(item) {
    this.store.dispatch(markBookAsFinished({ item }));
    this.showSnackBar(item);
  }

  showSnackBar(data) {
    const snackbarMsg = !data.finished ? `Marked "${data.title}" as Finished Reading` 
      : `Marked "${data.title}" as Not Finished Reading`
    this.snackbar.open(snackbarMsg,'', { 
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: 5000 
    })
  }
}
