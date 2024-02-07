import {makeAutoObservable} from "mobx";

export default class ProductStore{
    constructor() {
        this._productName = {}
       this._typeProduct = {}
       this._description = {}
        makeAutoObservable(this)
    }

    setProductName(productName){
        this._productName = productName
    }
    setTypeProduct(typeProduct){
        this._typeProduct = typeProduct
    }
    setDescription(description){
        this._description = description
    }

    get productName(){
        return this._productName
    }
    get typeProduct(){
        return this._typeProduct
    }
    get description(){
        return this._description
    }
}