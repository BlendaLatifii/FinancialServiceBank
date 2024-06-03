import { StateOfClient } from "./StateOfClient";
import { CityOfClient } from "./CityOfClient";

export interface ClientModel{
    id: string | null;
    personalNumberId:string | null;
    firstName:string |null;
    middleName:string |null;
    lastName:string |null;
    phoneNumber:string|null;
    emailAddress:string | null;
    state:StateOfClient;
    city:CityOfClient;
    zipCode:string| null;
    
}