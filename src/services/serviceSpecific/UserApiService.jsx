import ApiService from "../ApiService";

export default class UserApiService extends ApiService{

    constructor(){
        super('/users');
    }

    create(object){
        return this.post('', object);
    }

    update(id, object){
        return this.put(`/${id}`, object);
    }

    updateName(object){
        return this.patch(`/user`, object);
    }

    delete(id){
        super.delete(`/${id}`);
    }

    find(params, config){
        return this.get(`/${params}`, config);
    }
}