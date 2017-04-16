
Uncaught (in promise): Error: 

Type DetailsPluginComponent is part of the declarations of 2 modules: DetailsPluginModule and RecipesCompositeModule! 

Please consider moving DetailsPluginComponent to a higher module that imports DetailsPluginModule and RecipesCompositeModule. 

You can also create a new NgModule that exports and includes DetailsPluginComponent then import that NgModule in DetailsPluginModule and RecipesCompositeModule.

always export imported module comps, etc as required