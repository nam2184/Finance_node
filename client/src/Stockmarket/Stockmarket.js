import React, { Component } from "react";

export default class Stockmarket extends Component {
	const [defaultData, setDefaultData] = useState ([{}]);
	const currentDate = new Date();
	const on <F9><F9>eYearAgo = new Date(currentDate);
	oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

	console.log('Today:', currentDate.toISOString().slice(0, 10));
	console.log('One year ago:', oneYearAgo.toISOString().slice(0, 10));

	useEffect(() => {
    fetch("/api/history?ticker=AAPL&start={oneYearAgo.toISOString().slice(0,10)}&end={currentDate.toISOString().slice(0,10)}")
    .then(response => response.json())
    .then(data => setDefaultData(data))
  }, [])

	render() {
        return (
		  <div> 
			{data.map((item) => {
			<div key={item.id}>
				<h1>{item.short}</h1>
			</div>
          </div>
        )
        }
    }
