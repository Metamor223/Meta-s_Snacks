import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        this._users = []
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUsers(users){
        this._users = users
    }
    setUser(user){
        this._user = user
    }

    setRole(role){
        this._user.role = role
    }

    get isAuth(){
        return this._isAuth
    }
    get Users(){
        return this._users
    }
    get User(){
        return this._user
    }
}