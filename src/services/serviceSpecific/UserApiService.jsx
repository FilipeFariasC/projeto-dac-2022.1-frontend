import ApiService from "../ApiService";

export default class UserApiService extends ApiService{

    constructor(){
        super('/users');
    }

    create(object, config){
        return this.post('',object, config);
    }

    update(id, object, config){
        return this.put(`/${id}`,object, config);
    }

    updateOne(id, object, config){
        return this.patch(`/${id}`,object, config);
    }

    delete(id){
        super.delete(`/${id}`, config);
    }

    find(params, config){
        return this.get(`/${params}`, config);
    }
}