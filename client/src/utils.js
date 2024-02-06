export const fetchApi  =  async (apiUrl) => {
    try {
      const response = await fetch(apiUrl, {
			  method : 'GET',
			  mode: 'cors',
		  });
      if (!response.ok) {
        throw new Error('Network response was not ok');
        }
		} catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const filterParams = (query) => {
    const timeframe = query.get('timeframe')  
    
    const queryParams = {
        timeframe
    };

    return queryParams;
}


