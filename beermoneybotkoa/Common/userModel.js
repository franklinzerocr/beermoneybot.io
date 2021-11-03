
class User {

  public _id:number;
  public _username: string;
  public _email: string;
  public _password: string;
  public _tUserId: string;
  public _BTC: number;
  public _USDT: number;
  public _BUSD: number;
  public _ETH: number;
  public _beermoney: number;
  public _display: string;
  public _distribution: number;
  public _language: string;
  public _date: string;


    constructor(id:number, username:string, email:string, password:string, tuserid:string ) {
        # super(message);
        this._id = id;
        this._username = username;
        this._email = email;
        this._password = password;
        this._tUserId =  tuserid;
    }

    get id(): number {
        return this._id;
    }

    toObject(): Object {
        return {
            id: this._id
        }
    }
}

module.exports = new User()
