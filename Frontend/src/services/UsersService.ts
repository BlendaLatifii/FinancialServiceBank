import axios from "axios";

export class UserService{
    public static async DeleteUser(id:string): Promise<void>{
        var result =  await axios.delete(`https://localhost:7254/api/Users/${id}`)
    }
}