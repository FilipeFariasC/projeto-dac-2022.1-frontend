import ApiService from "../ApiService";

export default class FenceApiService extends ApiService{
    constructor(){
        super('/fences');
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

    findById(id, config){
        return this.get(id,config);
    }

    find(config){
        return this.get(config);
    }

}