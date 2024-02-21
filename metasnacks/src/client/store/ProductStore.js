import {makeAutoObservable} from "mobx";

export default class ProductStore{
    constructor() {
        this._product = []
       this._typeProduct = {}
       this._description = {}
        this._selectedType={}
        makeAutoObservable(this)
    }

    setProduct(product){
        this._product = product
    }
    setTypeProduct(typeProduct){
        this._typeProduct = typeProduct
    }
    setDescription(description){
        this._description = description
    }
    setSelectedType(typeProduct){
        this._selectedType = typeProduct
    }

    get product(){
        return this._product
    }
    get typeProduct(){
        return this._typeProduct
    }
    get description(){
        return this._description
    }
    get selectedType(){
        return this._selectedType
    }
}