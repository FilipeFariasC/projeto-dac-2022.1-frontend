import ApiService from "../ApiService";

export default class BraceletApiService extends ApiService{

    constructor(){
        super('/bracelets');
    }

    create(object, config){
        return this.post('',object, config);
    }

    update(id, object, config){
        return this.put(`/${id}`, object, config);
    }

    delete(id, config){
        super.delete(`/${id}`, config);
    }

    findByName(params, config){
        return this.get(`${params}`,config);
    }

    find(config){
        return this.get(config);
    }

}