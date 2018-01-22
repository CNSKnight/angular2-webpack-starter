import { ActionReducer, Action } from '@ngrx/store';
import { AppConfig } from '../../../../config/app-config';
import { RecipeI } from './recipe.store';
import { clone } from 'lodash';

let initialState: string = null;

const reducerFn = (state: RecipeI, action: Action) => {
  let type = action.type;
  let payload = action.payload;

  // DEBUG console.log('Selected recipe reducer processing type: ', type);
  // console.log('payload: ', payload); console.log('state: ', state);

  switch (type) {
    case 'CREATE_RECIPE':
    case 'UPDATE_RECIPE':
      let newState = AppConfig.APPLICATION_OPTIONS
        .recipeDetailsFormInitsOnSubmit
        ? state
        : payload;
      initialState = JSON.stringify(newState);
      return newState;
    case 'SELECT_RECIPE':
      initialState = JSON.stringify(payload);
      return payload;
    case 'RESET_RECIPE':
      return initialState ? JSON.parse(initialState) : payload;
    case 'CANCEL_RECIPE':
      return payload;
    default:
      // initialState = state ? clone(state) : null;
      return state;
  }
};

export const selectedRecipeReducer: ActionReducer<any> = reducerFn;
