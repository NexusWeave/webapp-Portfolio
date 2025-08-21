//  Server API response handler

//  Importing dependencies
import axios from 'axios';
import { portfolioStore } from '../stores/portfolioStore';
import { reactive } from 'vue';


export async function FetchApiResponse(path, payload = null)
{
    const response = reactive({});
    await axios.get(path, payload).then((res) => 
    {

        response.data = res.data.data;
        response.Total = res.data.page;
        response.response = res.data.response;

        if (res.data.status) response.status = res.data.status;
        if (res.data.message) response.message = res.data.message;
        if (res.data.path) response.path = res.data.path;

        //console.warn("[Response.js] Response:", path, response.data);
        
    }).catch((err) => 
    {
        console.error("[Error] Response.js :" ,err);
    });

    return response;

}