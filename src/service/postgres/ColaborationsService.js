const { Pool } = require("pg");

class CollaborationsService {
    constructor(){
         this._pool = new Pool();
    }
}

module.exports = CollaborationsService;