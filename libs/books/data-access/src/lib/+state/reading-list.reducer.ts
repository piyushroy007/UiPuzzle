import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
  history : State[];
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null,
  history : [],
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.init, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.addToReadingList, (state, action) =>{
    const newState = readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
    return {
     ...newState,
     history: [...state.history, state],
    }
 
   }),
   on(ReadingListActions.removeFromReadingList, (state, action) =>{
     const newState = readingListAdapter.removeOne(action.item.bookId, state);
     return {
       ...newState,
       history: [...state.history, state],
     }
   }),
   on(ReadingListActions.UndoLastAction, (state, action) => {
     if (state.history.length > 0){
       const previousState = state.history[state.history.length - 1];
       const newState = state.history.slice(0,-1);
       return { ...previousState, history : newState }
     }
     return state;
   })
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
