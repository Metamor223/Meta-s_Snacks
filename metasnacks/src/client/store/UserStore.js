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

    setRole(role) {
        if (this._user) {
            this._user.role = role;
            console.log("Role set:", role); // Добавьте логирование здесь
        } else {
            console.log("User is not set when trying to set role");
        }
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