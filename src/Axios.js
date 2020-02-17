
import request from "./request.js";
export default class Axios {
    constructor(config = {}) {
        this.defaultConfig = config ;
    }

    request(method,url){
        return request(method,url)
    }

    getConfig()
    {
        return this.defaultConfig;
    }
};

