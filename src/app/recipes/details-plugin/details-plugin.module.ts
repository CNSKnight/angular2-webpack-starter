import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RecipeService } from '../services/recipe.service';
import { DetailsPluginComps } from './details-plugin.comps';

@NgModule({
    imports: [SharedModule],
    declarations: [...DetailsPluginComps],
    providers: [RecipeService],
    // omfg this was a pita - MUST export these comps to enable the parent comp to use them
    exports: [...DetailsPluginComps]
})
export class DetailsPluginModule { }