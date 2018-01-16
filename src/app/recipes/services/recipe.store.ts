// ``` recipes.store.js (c) 2016 David Newman blackshuriken@hotmail.com
// recipes.store.js may be freely distributed under the MIT license ```

//
export interface RecipesStoreI {
  recipes: RecipeI[];
  selectedRecipe: RecipeI;
}

interface Ingredient {
  qty: string;
  unit: string;
  name: string;
  optional: boolean;
  preparation: string;
}

interface Tag {
  priority: number;
  text: string;
}

interface Method {
  step: number;
  text: string;
}

interface Variation {
  text: string;
}

// # Redux store for `recipes`
export interface RecipeI {
  id: string; // supplied by Loopback via ObjectID
  acapID: Number;
  creator: string;
  originalUrl: string;
  description: string;
  ingredients: Ingredient[];
  method: Method[];
  published: boolean;
  publishedDate: Date;
  updatedDate: Date;
  rating: number;
  subTitle: string;
  tags: Tag[];
  title: string;
  variations: Variation[];
  notes: string;
};

export const recipeModel: RecipeI = {
  id: undefined,
  acapID: null,
  creator: '',
  originalUrl: '',
  description: '',
  ingredients: [
    {
      qty: '',
      unit: '',
      name: '',
      optional: false,
      preparation: ''
    }
  ],
  method: [
    {
      step: 1,
      text: ''
    }
  ],
  published: false,
  publishedDate: undefined,
  updatedDate: undefined,
  rating: 0,
  subTitle: '',
  tags: [
    {
      priority: 0,
      text: ''
    }
  ],
  title: '',
  variations: [
    {
      text: ''
    }
  ],
  notes: '',
};
