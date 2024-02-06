import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"

const filterParams = (query) => {
    const timeframe = query.get('timeframe')  
    
    const queryParams = {
        timeframe
    };

    return queryParams;
}



const Stockmarket = () => {
  const [timeframe, setTimeFrame] = useState({}); 
	const [backendData, setBackendData] = useState ({});
  const { symbol } = useParams();

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
      console.log(apiUrl);
      try {
          const response = await fetch(apiUrl, {
			      method : 'GET',
			      mode: 'cors',
		      });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
		      const contentType = response.headers.get('Content-Type');   
	          if (contentType && contentType.includes('application/json')) {
		        // Parse JSON if it's present
			        const data = await response.json();
			        setBackendData(data);
              
		        } else {
			        throw new Error('Response is not in JSON format');
		      }
        } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
	fetchData();
  }, [symbol, timeframe]);


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
