// import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

// function defenition commonrequest
export const commonrequest=async(method,url,CardBody)=>{

    // request configuration 

    let reqconfig={

        url,
        method,
        data:CardBody,
        Headers:{
            "content-type":"application/json"
                        //    multipart form data (if it is pic videos .....)
        }

    }

    // api call using axios library

    return await axios(reqconfig).then((Response)=>{
        return Response
    }).catch((error)=>{
        return error
    })

}