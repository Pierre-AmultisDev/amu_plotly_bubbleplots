document.addEventListener('DOMContentLoaded', function() {
    // The script will be executed after the DOM has been fully loaded, ensuring that the chart is created properly.

	// Retrieve the options set for "mod_amu_plotly_bubbleplots"
	var options = Joomla.getOptions('mod_amu_plotly_bubbleplots');

	//  name defines the color = type of message
	//	category defines the text for y axis = the uniqueid|address
	const dataseries = [
	// assumes name and category are the same
	{
		name: 'Sending no data',  // assumes name and category are the same
		type: 'scatter',
		mode: 'markers',
		marker: {color: '#ff0000', opacity: 0.5}  // red
	},{
		name: 'Sending some data',
		type: 'scatter',
		mode: 'markers',
		marker: {color: '#ff6200', opacity: 0.5} // dark orange
	},{
		name: 'Sending insufficient data',
		type: 'scatter',
		mode: 'markers',
		marker: {color: '#ff8c00', opacity: 0.5}  // orange
	},{
		name: 'Sending data',
		type: 'scatter',
		mode: 'markers',
		marker: {color: '#00ff00', opacity: 0.5}  // green
	},{
		name: 'Sending maximum data',
		type: 'scatter',
		mode: 'markers',
		marker: {color: '#006400', opacity: 0.5}  // dark green
	},{
		name: 'Sending data with errors',
		type: 'scatter',
		mode: 'markers',
		marker: {color: '#0000ff', opacity: 0.5}  // blue
	}
	];
	
	//console.log('1= lineplots.js ==');
	//console.log(options);

	//Check if any options available
	if (options.length !== 0) {
	  //console.log('2= bubbleplots.js ==');
	  //console.log(options.length);
	  //console.log('options array not empty');
	  for (i in options) {
		// Access individual options
		let visualisation_data_url = options[i].visualisation_data_url;
		let graph_title_text = options[i].graph_title_text;
		let graph_subtitle_text = options[i].graph_subtitle_text;
		let module_id_name = options[i].module_id_name;
		let API_key = options[i].api_key;

		//console.log('3= bubbleplots.js ==');
		//console.log(visualisation_data_url);
		//console.log(graph_title_text);
		//console.log(graph_subtitle_text);
		//console.log(module_id_name);
		//console.log('4= bubbleplots.js ==');

		// get the data asynchronous
        // url to test: https://tst-web.nl/media/mod_amu_plotly_bubbleplots/tst-data/pivot_flat.json  
		async function getData() {
			const response = await fetch(
				visualisation_data_url,
				{
					method: 'GET',
                    headers: {
						'Content-Type': 'application/json',
						'x-api-key': API_key
					}
				}	
			);
			return response.json();
		};
		
		getData().then(json_data => {
			console.log(json_data);

			// get unique values from the json_data for the uniek_id's text
			// inspiration: https://stackoverflow.com/questions/11688692/how-to-create-a-list-of-unique-items-in-javascript
			const unique = (arr) => [...new Set(arr)];
			category_list = unique(json_data.map(item => item.uniek_id)); 
			console.log('getData()-category_list');
			console.log(category_list);

			// Prepare the dataset
			const getData = statusMsg => {
				console.log('StatusMsg');
				console.log(statusMsg);
				
				const temp_x = [];
				const temp_y = [];
				const temp_size =[];
				
				// Loop over downloaded data and create data arrays		
				json_data.forEach(elm => {
					//console.log(elm)
					
					if (elm.Status === statusMsg) {

						//console.log('tekst');
						//console.log(category_list);
						//console.log(elm.uniek_id);
						//console.log(category_list.indexOf(elm.uniek_id));
						
						temp_x.push(elm.datum_dt);  // create an array with the x values for a_location
						temp_y.push(category_list.indexOf(elm.uniek_id));  // create an array with the y values = the index in the category_list
						temp_size.push(elm.Count);  // create an array with the y values for a_location
						
					}
				});
				// output x, y and size array
				console.log('temp_x');
				console.log(temp_x);
				console.log('temp_y');
				console.log(temp_y);
				console.log('temp_size');
				console.log(temp_size);
			
				return [temp_x, temp_y, temp_size];
			};

			
			dataseries.forEach(s => {
				//  get x, y and size array values
				[s.x, s.y, s.marker.size] = getData(s.name);
				
				/* 40 is desired max marker size. 
				 * set 'sizeref' to an 'ideal' size given by the formula:
				 * sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
				 *
                 * https://plotly.com/javascript/bubble-charts/#bubble-size-scaling-on-charts				 
				 */
				
				console.log(s)
				
				s.marker.sizeref=2.0 * Math.max(...s.marker.size) / (40**2); 
				s.marker.sizemode='area';
				s.marker.sizemin=4; //so any marker is visible
				
			});
			
			console.log('dataseries');
			console.log(dataseries);
			
			console.log(category_list);
			/* Create layout settings
			 *
			 * Usefull links: 
			 * -  https://plotly.com/javascript/axes/  bottom of page
			 *
			 */
			var layout = {
				// https://plotly.com/javascript/reference/layout/#layout-title
				title: graph_title_text,
				
				//https://plotly.com/javascript/reference/layout/#layout-showlegend
				showlegend: 'true',
				
				// https://plotly.com/javascript/reference/layout/#layout-legend
				legend: {
					title: {
						text: 'Unit communication status',
						side: 'top'
					},
					itemsizing: 'constant',
					standoff: 100,
					orientation: 'h',
					yref: 'container',
					yanchor: 'bottom'
				},
											
				// https://plotly.com/javascript/reference/layout/xaxis/
				xaxis: {
					title: 'Date',
					type: 'date',
					tickformat: '%Y-%m-%d', // https://plotly.com/javascript/tick-formatting/#using-tickformat-(date)
					tickangle: 270,
					autotick: false,
					showticklabels: true,
					ticklabeloverflow: "allow", 
                    automargin: true				
				},
				
				// https://plotly.com/javascript/reference/layout/yaxis/
				// https://plotly.com/javascript/axes/
				yaxis: {
					title: 'DeviceId|Locatie',
					type: 'category',
					categoryorder: 'array',
					categoryarray: category_list,
					labelalias: {...category_list}, //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
					autotick: false,
					showticklabels: true,
					ticklabeloverflow: "allow", 
                    automargin: true				
				}
			};

			// https://plotly.com/javascript/time-series/#time-series-with-rangeslider

			// Finally create the Plotly line chart
			/* Inspiration 	https://plotly.com/javascript/bubble-charts/
			 *              https://stackoverflow.com/questions/762011/what-is-the-difference-between-let-and-var
			 * 
			 * Using let to define unique value; with each iteration you get a new variable (see Loops with closures in inspiration) 
			 */	
			
			let bubblechart = Plotly.newPlot(module_id_name, dataseries, layout);
			/* module_id_name = id of div where graph is placed
             * dataseries     = dataset to use
             * layout         = layout to use			 
             */
		});
	};
  };
});	