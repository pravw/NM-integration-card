// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/model/json/JSONModel",
// 	"sap/ui/integration/widgets/Card"
// ], (Controller, JSONModel, Card) => {
// 	"use strict";

// 	return Controller.extend("com.po.integrationcards.controller.View1", {
// 		// onInit: function () {

// 		// 	var weatherData = new JSONModel(
// 		// 		"https://api.openweathermap.org/data/2.5/weather?q=vellore&appid=2506f94a6caec2a7d019b07e245534f0");
// 		// 	this.getView().setModel(weatherData);


// 		// 	// var url = "/weather/data/2.5/onecall?lat=12.9165&lon=79.1325&exclude=minutely,daily,alerts&appid=YOUR_KEY";
// 		// 	// var model = new JSONModel(url);



// 		// 	model.loadData(url);          // load JSON from URL

// 		// 	this.getView().setModel(model);



// 		// },
// 		onInit: function () {
// 			var weatherData = new JSONModel(
// 				"https://api.openweathermap.org/data/2.5/weather?q=vellore&appid=2506f94a6caec2a7d019b07e245534f0"
// 			);
// 			this.getView().setModel(weatherData);

// 		},



// 		onSelectingWeatherOption: function (oEvent) {
// 			var configuration;
// 			var container = this.byId("idAppControl");
// 			var weatherData = JSON.parse(this.getView().getModel().getJSON());
// 			switch (oEvent.getSource().getSelectedButton().getText()) {
// 				case "Current Object card":
// 					break;

// 				case "Hourly List Card":

// 					configuration = {
// 						"_version": "1.14.0",
// 						"sap.app": {
// 							"id": "card.explorer.highlight.list.card",
// 							"type": "card"
// 						},
// 						"sap.card": {
// 							"type": "List",
// 							"header": {
// 								"title": "Weather Data in list"
// 							},
// 							"content": {
// 								"data": {
// 									"json": weatherData.hourly
// 								},
// 								"item": {
// 									"title": "Date is {dt}",
// 									"description": "Temperature is {temp}",
// 									"highlight": "Warning"
// 								}
// 							}
// 						}
// 					}


// 					break;
// 				case "Hourly Table Card":
// 					configuration = {
// 						"_version": "1.15.0",
// 						"sap.app": {
// 							"id": "card.explorer.table.card",
// 							"type": "card",
// 							"title": "Sample of a Table Card",
// 							"subTitle": "Sample of a Table Card",
// 							"applicationVersion": {
// 								"version": "1.0.0"
// 							},
// 							"shortTitle": "A short title for this Card",
// 							"info": "Additional information about this Card",
// 							"description": "A long description for this Card",
// 							"tags": {
// 								"keywords": [
// 									"Table",
// 									"Card",
// 									"Sample"
// 								]
// 							}
// 						},
// 						"sap.ui": {
// 							"technology": "UI5",
// 							"icons": {
// 								"icon": "sap-icon://table-view"
// 							}
// 						},
// 						"sap.card": {
// 							"type": "Table",
// 							"data": {
// 								"json": [{
// 									"product": "DVD player",
// 									"salesOrder": "5000010050",
// 									"netAmount": "2K USD",
// 									"status": "Delivered",
// 									"statusState": "Success",
// 									"deliveryProgress": 100
// 								},
// 								{
// 									"product": "Astro Laptop 1516",
// 									"salesOrder": "5000010051",
// 									"netAmount": "127k USD",
// 									"status": "Canceled",
// 									"statusState": "Error",
// 									"deliveryProgress": 0
// 								},
// 								{
// 									"product": "Astro Phone 6",
// 									"salesOrder": "5000010052",
// 									"netAmount": "8K USD",
// 									"status": "In Progress",
// 									"statusState": "Warning",
// 									"deliveryProgress": 33
// 								},
// 								{
// 									"product": "Beam Breaker B-1",
// 									"salesOrder": "5000010053",
// 									"netAmount": "25K USD",
// 									"status": "Delivered",
// 									"statusState": "Success",
// 									"deliveryProgress": 100
// 								},
// 								{
// 									"product": "Beam Breaker B-2",
// 									"salesOrder": "5000010054",
// 									"netAmount": "7K USD",
// 									"status": "Delivered",
// 									"statusState": "Success",
// 									"deliveryProgress": 100
// 								},
// 								{
// 									"product": "Beam Breaker B-3",
// 									"salesOrder": "5000010050",
// 									"netAmount": "2K USD",
// 									"status": "Delivered",
// 									"statusState": "Success",
// 									"deliveryProgress": 100
// 								},
// 								{
// 									"product": "Benda Laptop 1408",
// 									"salesOrder": "5000010051",
// 									"netAmount": "127k USD",
// 									"status": "Canceled",
// 									"statusState": "Error",
// 									"deliveryProgress": 0
// 								},
// 								{
// 									"product": "Bending Screen 21HD",
// 									"salesOrder": "5000010052",
// 									"netAmount": "8K USD",
// 									"status": "In Progress",
// 									"statusState": "Warning",
// 									"deliveryProgress": 27
// 								},
// 								{
// 									"product": "Blaster Extreme",
// 									"salesOrder": "5000010052",
// 									"netAmount": "8K USD",
// 									"status": "In Progress",
// 									"statusState": "Warning",
// 									"deliveryProgress": 51
// 								}
// 								]
// 							},
// 							"header": {
// 								"title": "Sales Orders for Key Accounts",
// 								"subtitle": "Today"
// 							},
// 							"content": {
// 								"maxItems": 9,
// 								"row": {
// 									"columns": [{
// 										"title": "Product",
// 										"value": "{product}",
// 										"additionalText": "{salesOrder}",
// 										"identifier": true
// 									},
// 									{
// 										"title": "Net Amount",
// 										"value": "{netAmount}",
// 										"hAlign": "End"
// 									},
// 									{
// 										"title": "Status",
// 										"value": "{status}",
// 										"state": "{statusState}"
// 									},
// 									{
// 										"title": "Delivery Progress",
// 										"progressIndicator": {
// 											"percent": "{deliveryProgress}",
// 											"text": "{= format.percent(${deliveryProgress} / 100)}",
// 											"state": "{statusState}"
// 										}
// 									}
// 									]
// 								}
// 							}
// 						}
// 					}
// 					var myCard = new Card();
// 					myCard.setManifest(configuration)
// 					// container.getPages()[0].getContent()[0].addAggregation("items", myCard)
// 					container.getPages()[0].getContent()[0].addItem(myCard);


// 					break;
// 				case "Hourly Analytical card":
// 					break;




// 			}


// 		}
// 	});
// });


sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/integration/widgets/Card"
], (Controller, JSONModel, Card) => {
	"use strict";

	return Controller.extend("com.po.integrationcards.controller.View1", {
		onInit: function () {
			// Load current weather data
			var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=vellore&appid=2506f94a6caec2a7d019b07e245534f0&units=metric";
			var currentWeatherModel = new JSONModel();
			currentWeatherModel.loadData(currentWeatherUrl);
			this.getView().setModel(currentWeatherModel, "currentWeather");

			// Load 5-day forecast data (includes hourly data in 3-hour intervals)
			var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=vellore&appid=2506f94a6caec2a7d019b07e245534f0&units=metric";
			var forecastModel = new JSONModel();
			forecastModel.loadData(forecastUrl);
			this.getView().setModel(forecastModel, "forecast");

			// Wait for data to load before allowing card selection
			forecastModel.attachRequestCompleted(() => {
				console.log("Forecast data loaded successfully");
			});

			currentWeatherModel.attachRequestCompleted(() => {
				console.log("Current weather data loaded successfully");
			});
		},

		onSelectingWeatherOption: function (oEvent) {
			var configuration;
			var selectedOption = oEvent.getSource().getSelectedButton().getText();

			// Get the dedicated card container
			var cardContainer = this.byId("cardContainer");
			
			// Clear existing cards
			if (cardContainer) {
				cardContainer.removeAllItems();
			}

			switch (selectedOption) {
				case "Current Object Card":
					configuration = {
						"_version": "1.14.0",
						"sap.app": {
							"id": "card.explorer.current.weather.card",
							"type": "card"
						},
						"sap.card": {
							"type": "Object",
							"header": {
								"title": "Current Weather in Vellore",
								"subTitle": "{currentWeather>/name}, {currentWeather>/sys/country}",
								"icon": {
									"src": "sap-icon://weather-proofing"
								}
							},
							"content": {
								"groups": [
									{
										"title": "Temperature",
										"items": [
											{
												"label": "Current",
												"value": "{currentWeather>/main/temp}°C"
											},
											{
												"label": "Feels Like",
												"value": "{currentWeather>/main/feels_like}°C"
											},
											{
												"label": "Min",
												"value": "{currentWeather>/main/temp_min}°C"
											},
											{
												"label": "Max",
												"value": "{currentWeather>/main/temp_max}°C"
											}
										]
									},
									{
										"title": "Conditions",
										"items": [
											{
												"label": "Weather",
												"value": "{currentWeather>/weather/0/main}"
											},
											{
												"label": "Description",
												"value": "{currentWeather>/weather/0/description}"
											},
											{
												"label": "Humidity",
												"value": "{currentWeather>/main/humidity}%"
											},
											{
												"label": "Pressure",
												"value": "{currentWeather>/main/pressure} hPa"
											}
										]
									},
									{
										"title": "Wind",
										"items": [
											{
												"label": "Speed",
												"value": "{currentWeather>/wind/speed} m/s"
											},
											{
												"label": "Direction",
												"value": "{currentWeather>/wind/deg}°"
											}
										]
									}
								]
							}
						}
					};

					var currentCard = new Card();
					currentCard.setManifest(configuration);
					currentCard.setModel(this.getView().getModel("currentWeather"), "currentWeather");
					
					if (cardContainer && cardContainer.addItem) {
						cardContainer.addItem(currentCard);
					} else if (cardContainer && cardContainer.addContent) {
						cardContainer.addContent(currentCard);
					}
					break;

				case "Hourly List Card":
					configuration = {
						"_version": "1.14.0",
						"sap.app": {
							"id": "card.explorer.forecast.list.card",
							"type": "card"
						},
						"sap.card": {
							"type": "List",
							"header": {
								"title": "5-Day Weather Forecast",
								"subTitle": "Vellore - 3 Hour Intervals"
							},
							"content": {
								"data": {
									"path": "forecast>/list"
								},
								"maxItems": 10,
								"item": {
									"title": "{= format.dateTime(${forecast>dt} * 1000, {pattern: 'MMM dd, yyyy HH:mm'})}",
									"description": "Temp: {forecast>main/temp}°C | Weather: {forecast>weather/0/main} | Humidity: {forecast>main/humidity}%",
									"icon": {
										"src": "sap-icon://weather-proofing"
									},
									"highlight": "{= ${forecast>main/temp} > 30 ? 'Error' : ${forecast>main/temp} > 25 ? 'Warning' : 'Success'}"
								}
							}
						}
					};

					var listCard = new Card();
					listCard.setManifest(configuration);
					listCard.setModel(this.getView().getModel("forecast"), "forecast");
					
					if (cardContainer && cardContainer.addItem) {
						cardContainer.addItem(listCard);
					} else if (cardContainer && cardContainer.addContent) {
						cardContainer.addContent(listCard);
					}
					break;

				case "Hourly Table Card":
					var forecastData = this.getView().getModel("forecast").getData();
					
					// Check if data is loaded
					if (!forecastData || !forecastData.list) {
						sap.m.MessageToast.show("Weather data is still loading. Please try again.");
						break;
					}

					configuration = {
						"_version": "1.15.0",
						"sap.app": {
							"id": "card.explorer.forecast.table.card",
							"type": "card"
						},
						"sap.card": {
							"type": "Table",
							"data": {
								"json": forecastData.list.slice(0, 12)
							},
							"header": {
								"title": "Weather Forecast Table",
								"subTitle": "Hourly Data - Vellore"
							},
							"content": {
								"row": {
									"columns": [
										{
											"title": "Date & Time",
											"value": "{dt_txt}",
											"identifier": true
										},
										{
											"title": "Temperature",
											"value": "{main/temp}°C",
											"hAlign": "End"
										},
										{
											"title": "Weather",
											"value": "{weather/0/main}"
										},
										{
											"title": "Humidity",
											"value": "{main/humidity}%",
											"hAlign": "End"
										},
										{
											"title": "Wind Speed",
											"value": "{wind/speed} m/s",
											"hAlign": "End"
										}
									]
								}
							}
						}
					};

					var tableCard = new Card();
					tableCard.setManifest(configuration);
					
					if (cardContainer && cardContainer.addItem) {
						cardContainer.addItem(tableCard);
					} else if (cardContainer && cardContainer.addContent) {
						cardContainer.addContent(tableCard);
					}
					break;

				case "Hourly Analytical card":
					// Analytical card implementation can be added here
					break;
			}
		}
	});
});