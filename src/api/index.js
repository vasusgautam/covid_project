import axios from 'axios';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
      changeableUrl = `${url}/countries/${country}`;
    }
    try{
        const response = await axios.get(changeableUrl);
        const {data: { confirmed, recovered, deaths, lastUpdate }} =response;
        return { confirmed, recovered, deaths, lastUpdate };
        
    
    } catch(error){

    }
}

export const fetchDailyData = async()=> {
    try {
        const {data} = await axios.get(`${url}/daily`);

        const  modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    } catch (error){
        console.log(error);
    }
}

    export const countries = async() => {
    try{
        const response = await axios.get(`${url}/countries`);
        return response.data;
    }
    catch (error){
        console.log(error);
    }
}