import {makeAutoObservable} from "mobx";

export default class WarehouseStore{
    constructor() {
        this._ingredient = []
        this._recipe = []
        this._selectedIngredient = {}
        this._selectedRecipe = {}
        makeAutoObservable(this)
    }

    setIngredient(ingredient){
        this._ingredient = ingredient
    }
    setRecipe(recipe){
        this._recipe = recipe
    }
    setSelectedIngredient(ingredient){
        this._selectedIngredient = ingredient
    }
    setSelectedRecipe(recipe){
        this._selectedRecipe = recipe
    }
    get ingredient(){
        return this._ingredient
    }
    get recipe(){
        return this._recipe
    }
    get selectedIngredient(){
        return this._selectedIngredient
    }
    get selectedRecipe(){
        return this._selectedRecipe
    }
}
