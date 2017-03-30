import { ActionReducer, Action } from '@ngrx/store';
import { AppConfig } from '../../../../config/app-config';
import { RecipeI } from './recipe.store';

export function selectedRecipeReducerFn(state: RecipeI[] = [], action: Action) {

  let type = action.type;
  let payload = action.payload;

  // DEBUG console.log('Selected recipe reducer processing type: ', type);
  // console.log('payload: ', payload); console.log('state: ', state);

  switch (type) {
    case 'CREATE_RECIPE':
    case 'UPDATE_RECIPE':
      return (AppConfig.APPLICATION_OPTIONS.recipeDetailsFormInitsOnSubmit
        ? state
        : payload);
    case 'SELECT_RECIPE':
      return payload;
    default:
      return state;
  }
};

export const selectedRecipeReducer: ActionReducer<any> = selectedRecipeReducerFn;
