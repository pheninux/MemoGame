class Player {

    _login ;
    _score ;
    _level ;

    constructor(login, score, level) {
        this._login = login;
        this._score = score;
        this._level = level;
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

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }




}