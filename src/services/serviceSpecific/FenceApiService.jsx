import ApiService from "../ApiService";

export default class FenceApiService extends ApiService{
    constructor(){
        super('/fences');
        this.headers = {
            "Authorization": `Bearer ${window.localStorage.getItem("jwt_token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        }
    }

    create(object, config){
        return this.post('',object, config);
    }

    update(id, object, config){
        return this.put(`/${id}`, object, config);
    }

    statusActive(id, object, config){
        return this.patch(`/${id}`, object, config);
    }

    delete(id, config){
        super.delete(`/${id}`, config);
    }

    findById(id, config){
        return this.get(`/${id}`,config);
    }

    find(config){
        return this.get(config);
    }

}
