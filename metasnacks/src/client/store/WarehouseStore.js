import {makeAutoObservable, observable} from "mobx";

export default class WarehouseStore{
    constructor() {
        this._warehouse = []
        this._selectedWarehouse = {}
        makeAutoObservable(this)
    }
    setWarehouse(warehouse){
        this._warehouse = warehouse
        console.log("Warehouse data updated:", this._warehouse);
    }
    setSelectedWarehouse(warehouse){
        this._selectedWarehouse = warehouse
    }
    get warehouse(){
        return this._warehouse
    }
    get selectedWarehouse(){
        return this._selectedWarehouse
    }

    updateProductCount(product, newCount) {
        product.count = newCount;
    }
}
