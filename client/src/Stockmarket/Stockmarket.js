import React, {useEffect, useState} from 'react'

const Stockmarket = () => {
	const [backendData, setBackendData] = useState ({});
	const currentDate = new Date();
	const oneYearAgo = new Date(currentDate);
	oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

	console.log('Today:', currentDate.toISOString().slice(0, 10));
	console.log('One year ago:', oneYearAgo.toISOString().slice(0, 10));
    const apiUrl = `http://127.0.0.1:5000/api/history?ticker=AAPL&timeframe=1y`;
 

	useEffect(() => {
    const fetchData = async () => {
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
			console.log(backendData)
		} else {
			throw new Error('Response is not in JSON format');
		}
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
	
	
	fetchData();
  }, [apiUrl]);

	return(
		  <div>
			{backendData.data?.map((row, index) => (
				<div key ={index}>
					
				</div>
			))}
		 </div>
        )
    }
export default Stockmarket;
