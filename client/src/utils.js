export const fetchApi  =  async (apiUrl) => {
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
        if (data && data.data && Array.isArray(data.data)) {
          if (data.data.length === 0) {
            return null
          } else {
            return data;
        }
    } else {
        console.log("Invalid JSON format. 'data' should be an array.");
    }
      } else {
			        throw new Error('Response is not in JSON format');
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


