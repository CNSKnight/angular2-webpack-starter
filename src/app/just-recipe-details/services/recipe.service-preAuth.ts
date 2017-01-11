/**
 * recipe.service-preAuth.js
 */

// # Recipe Service

import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { RecipeI, RecipesStoreI, recipeModel } from './recipe.store';
import { clone, assign, partial } from 'lodash';

const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/json'
    })
};

declare var parent;
declare var acap;

// Service to pull recipes from the AppStore
// enables potential pre-reducer processing
@Injectable()
export class RecipeService {
    recipesR: Observable<[RecipeI]>;
    // apiBase = '//localhost:3000/api/recipe';
    apiBase: string;
    findOneBase: string;
    preAuthBase: string;
    contUnitsMgr: any;

    // Inject the `AppStore` into the constructor with a type of `AppStore`
    constructor(private http: Http,
        private store: Store<RecipesStoreI>) {

        // Bind an observable of our `recipes` to `RecipeService`
        // Since this is essentially a `key, value` system, we can
        // set our `recipes` by calling `store.select('recipes')`
        this.recipesR = store.select('recipesR');

        this.apiBase = 'https://vegrds.dharmiweb.net/api/recipes';
        //this.apiBase = 'http://localhost:7109/api/recipes';
        this.findOneBase = this.apiBase + '/findOne';
        this.preAuthBase = this.apiBase + '/preAuth';

        this.contUnitsMgr = (
            (typeof acap !== 'undefined' && acap.ADMIN_TAPPADS && acap.ADMIN_TAPPADS.contUnitsMgr) ||
            (parent.acap && parent.acap.ADMIN_TAPPADS && parent.acap.ADMIN_TAPPADS.contUnitsMgr)
        );
    }

    // used outside of listing context to load a single
    // @return Subscribable
    loadRecipe(id?: number) {
        let info;
        if (!id) {
            info = this.contUnitsMgr && this.contUnitsMgr.getInfo();
            id = info && info.ad_unit_id;
            if (id) {
                // set the state w/the requiested acapID - we may or may not get back an existing
                let tmpRecipe = clone(recipeModel);
                tmpRecipe.acapID = info.ad_unit_id;
                tmpRecipe.title = info.ad_unit_name;
                this.store.dispatch({ type: 'SELECT_RECIPE', payload: tmpRecipe });
            }
        }

        if (id) {
            return this.http.get(this.findOneBase + '?filter={"where":{"acapID":' + id + '}}')
                .catch(partial(this.handleError, this.contUnitsMgr, 'load'))
                .map((res: Response) => res.json())
                .map(payload => (info && (payload.title = info.ad_unit_name), payload))
                .map(payload => ({ type: 'SELECT_RECIPE', payload }))
                .subscribe(action => this.store.dispatch(action), err => console.log(err));
        }
    }

    // used only w/in listing context to load all
    loadRecipes() {
        return this.http.get(this.apiBase)
            .catch((error: any) => Observable.throw('load recipes request error: ' + error.json().error.message || '""'))
            // map the `HTTP` response from `raw` to `JSON` format
            // using `RxJs`
            // Reference: https://github.com/Reactive-Extensions/RxJS
            .map((res: Response) => res.json())
            // call `map` again to create the object we want to dispatch to the reducer
            // This combo of `map` method calls is an observable sequence in that
            // every result gets passed through this sequence of operations
            .map(payload => ({ type: 'ADD_RECIPES', payload }))
            // Subscribe to this sequence and hand off control to the
            // reducer by dispatching the transformed results
            .subscribe(action => this.store.dispatch(action), err => console.log(err));
    }

    // all save methods proxy through acapF for authorization
    saveRecipe(recipe: RecipeI) {
        (recipe.id) ? this.updateRecipe(recipe) : this.createRecipe(recipe);
    }

    createRecipe(recipe: RecipeI) {
        let info = this.contUnitsMgr && this.contUnitsMgr.getInfo();
        if (!info) {
            return this.contUnitsMgr.setMessages('<p>Save failed! I didn\'t get acapF cont-unit info?');
        }
        recipe.id && (delete recipe.id);
        recipe.acapID = info.ad_unit_id;
        recipe.title = info.ad_unit_name;

        var payload = {
            recipe: recipe,
            actionStatus: 'cont-units:recipes:add'
        };

        this.http.post(this.preAuthBase, JSON.stringify(payload), HEADER)
            .catch(partial(this.handleError, this.contUnitsMgr, 'save'))
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_RECIPE', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateRecipe(recipe: RecipeI) {
        if (!recipe.id) this.store.dispatch({ type: 'ERROR', payload: recipe });
        let url = `${this.preAuthBase}/${recipe.id}`;
        delete recipe.id;

        var payload = {
            recipe: recipe,
            actionStatus: 'cont-units:recipes:update'
        };

        this.http.put(url, JSON.stringify(payload), HEADER)
            .catch(partial(this.handleError, this.contUnitsMgr, 'update'))
            .map(res => res.json())
            .map(payload => ({ type: 'UPDATE_RECIPE', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    // unused
    deleteRecipe(recipe: RecipeI) {
        this.http.delete(`${this.preAuthBase}/${recipe.id}`)
            .catch(partial(this.handleError, this.contUnitsMgr, 'delete'))
            .subscribe(action => this.store.dispatch({ type: 'DELETE_RECIPE', payload: recipe }));
    }

    private handleError(contUnitsMgr, service: string, error: Response | any) {
        let errMsg = service + ' failed: ';
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg += `${error.status} - ${error.statusText || ''}`;
        } else {
            errMsg += error.message ? error.message : error.toString();
        }

        if (error.status != 404) {
            contUnitsMgr.setMessages(errMsg);
        }
        
        return Observable.throw(errMsg);
    }
}
