class Player {

    _login ;
    _score ;


    constructor(login, score) {
        this._login = login;
        this._score = score;
    }


    get login() {
        return this._login;
    }

    set login(value) {
        this._login = value;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }









}