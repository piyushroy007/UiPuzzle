import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { UndoLastAction } from "@tmo/books/data-access";


@Injectable({
    providedIn: "root"
})

export class UtilsService {
    constructor( private snackbar:MatSnackBar, private store:Store){ 
    }
    showSnackBar(message: string, action:string) {
        this.snackbar.open(message,action, { 
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 5000 
        }).afterDismissed().subscribe((data) => {
            if(data.dismissedByAction){
            this.store.dispatch(UndoLastAction());
            }
        })
    }
}