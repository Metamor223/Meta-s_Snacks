import {makeAutoObservable} from "mobx";

export default class WarehouseStore{
    constructor() {
        this._recipe = []
        this._selectedRecipe = {}
        this._ingredient = []
        this._selectedIngredient = {}
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
    get recipe(){
        return this._recipe
    }
    get ingredient(){
        return this._ingredient
    }
    get selectedRecipe(){
        return this._selectedRecipe
    }
    get selectedIngredient(){
        return this._selectedIngredient
    }
}
