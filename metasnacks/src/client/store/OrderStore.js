import {makeAutoObservable} from "mobx";

export default class OrderStore{
    constructor() {
        this._order = []
        this._status = {}
        makeAutoObservable(this)
    }

    setOrder(order){
        this._order = order
    }
    setStatus(status){
        this._status = status
    }

    get order(){
        return this._order
    }
    get status(){
        return this._status
    }
}
