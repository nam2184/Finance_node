import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { filterParams, fetchApi } from '../utils';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Stockmarket = () => {
  const [timeframe, setTimeFrame] = useState({}); 
	const [backendData, setBackendData] = useState ({});
  const { symbol } = useParams();
  const navigate = useNavigate()
	const currentDate = new Date();
	const oneYearAgo = new Date(currentDate);
	oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  

	console.log('Today:', currentDate.toISOString().slice(0, 10));
	console.log('One year ago:', oneYearAgo.toISOString().slice(0, 10));
 	
  useEffect(() => {
    const fetchData = async () => {
      const queryparams = new URLSearchParams(window.location.search);
      const params = filterParams(queryparams);
      const apiUrl = `http://127.0.0.1:5000/api/history?ticker=${symbol}&timeframe=${params.timeframe}`;
      
      const data = await fetchApi(apiUrl); 
      if (!data) {
         const default_params = {timeframe : '1y',};
         console.log("No ticker of that name")
         navigate({
          pathname:`/stock/AAPL`,
          search:`?${createSearchParams(default_params)}`, 
         });
      }
      else {
        setBackendData(data)
        console.log(backendData)
      }

    };
	fetchData();
  }, [symbol]);


	return(
		  <div>
			{backendData.data?.map((row, index) => (
				<div key={index}>
				  <h5>Stock : {row.close}</h5>
				</div>
			))}
		 </div>
        )
    }
export default Stockmarket;
