
import obj from "../http.js";
class service{
    getAll(page=0)
    {
        return obj.get(`?page=${page}`);
    }

    get(id)
    {
        return obj.get(`/id/${id}`);
    }

    find(query,by="name",page=0)
    {
        return obj.get(`?${by}=${query}&page=${page}`);
    }

    post(data){
        return obj.post(`/review`,data);
    }

    put(data){
        return obj.put("/review",data)
    }

    delete(data)
    {
        return obj.delete("/review",data)
    }

    getCuisines()
    {
        return obj.get("/cuisines");
    }

}

export default new service();