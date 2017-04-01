// ``` recipes.reducer.js (c) 2016 CNSKnight ```

import { ActionReducer, Action } from '@ngrx/store';

import { RecipeI } from './recipe.store';

export function recipesReducerFn(state: any = [], action: Action) {

  let type = action.type;
  let payload = action.payload;

  // DEBUG console.log('Recipes reducer processing type: ', type);
  // console.log('payload: ', payload); console.log('state: ', state);

  switch (type) {
    case 'ADD_RECIPES':
      return payload;

    case 'CREATE_RECIPE':
      return [
        ...state,
        payload
      ];

    case 'UPDATE_RECIPE':
      return state.map((recipe: RecipeI) => {
        return recipe.id === payload.id
          ? Object.assign({}, recipe, payload)
          : recipe;
      });

    case 'DELETE_RECIPE':
      return state.filter((recipe: RecipeI) => {
        return recipe.id !== payload.id;
      });

    default:
      return state;
  }
};

export const recipesReducer: ActionReducer<any> = recipesReducerFn;
