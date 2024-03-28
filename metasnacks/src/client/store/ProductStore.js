import {makeAutoObservable} from "mobx";

export default class ProductStore{
    constructor() {
        this._product = []
        this._typeProduct = {}
        this._description = {}
        this._selectedType = {}
        this._selectedProduct = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
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
        this.setPage(1)
        this._selectedType = typeProduct
    }
    setSelectedProduct(product){
        this._selectedProduct = product
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
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
    get selectedProduct(){
        return this._selectedProduct
    }
    get totalCount(){
        return this._totalCount
    }
    get page(){
        return this._page
    }
    get limit(){
        return this._limit
    }
}
