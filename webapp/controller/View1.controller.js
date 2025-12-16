
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

				// case "Hourly Analytical card":
				// 	// Analytical card implementation can be added here
				// 	configuration ={
				// 		"_version": "1.14.0",
				// 			"sap.app": {
				// 			"id": "card.explorer.line.card",
				// 				"type": "card",
				// 					"title": "Sample of a Line Chart",
				// 						"subTitle": "Sample of a Line Chart",
				// 							"applicationVersion": {
				// 				"version": "1.0.0"
				// 			},
				// 			"shortTitle": "A short title for this Card",
				// 				"info": "Additional information about this Card",
				// 					"description": "A long description for this Card",
				// 						"tags": {
				// 				"keywords": [
				// 					"Analytical",
				// 					"Card",
				// 					"Line",
				// 					"Sample"
				// 				]
				// 			}
				// 		},
				// 		"sap.ui": {
				// 			"technology": "UI5",
				// 				"icons": {
				// 				"icon": "sap-icon://line-chart"
				// 			}
				// 		},
				// 		"sap.card": {
				// 			"type": "Analytical",
				// 				"header": {
				// 				"type": "Numeric",
				// 					"data": {
				// 					"json": {
				// 						"number": "65.34",
				// 							"unit": "K",
				// 								"trend": "Down",
				// 									"state": "Error",
				// 										"target": {
				// 							"number": 100,
				// 								"unit": "K"
				// 						},
				// 						"deviation": {
				// 							"number": 34.7,
				// 								"state": "Critical"
				// 						},
				// 						"details": "Q1, 2018"
				// 					}
				// 				},
				// 				"title": "Weather data analytical",
				// 				},
									
				// 			},
				// 			"content": {
				// 				"chartType": "Line",
				// 					"chartProperties": {
				// 					"title": {
				// 						"text": "Line chart",
				// 							"visible": true,
				// 								"alignment": "left"
				// 					},
				// 					"legend": {
				// 						"visible": "{legend/visible}"
				// 					},
				// 					"legendGroup": {
				// 						"layout": {
				// 							"position": "{legend/position}",
				// 								"alignment": "{legend/alignment}"
				// 						}
				// 					},
				// 					"plotArea": {
				// 						"dataLabel": {
				// 							"visible": true
				// 						}
				// 					},
				// 					"categoryAxis": {
				// 						"title": {
				// 							"visible": false
				// 						}
				// 					},
				// 					"valueAxis": {
				// 						"title": {
				// 							"visible": false
				// 						}
				// 					}
				// 				},
				// 				"data": {
				// 					"json": {
				// 						"dimensions": {
				// 							"weekLabel": "Weeks"
				// 						},
				// 						"measures": {
				// 							"revenueLabel": "Revenue",
				// 								"costLabel": "Costs"
				// 						},
				// 						"legend": {
				// 							"visible": true,
				// 								"position": "bottom",
				// 									"alignment": "topLeft"
				// 						},
				// 						"list": weatherData.hourly
				// 					},
				// 					"path": "/list"
				// 				},
				// 				"dimensions": [
				// 					{
				// 						"name": "Date",
				// 						"value": "{dt}"
				// 					}
				// 				],
				// 					"measures": [
				// 						{
				// 							"name": "Temperature",
				// 							"value": "{temp}"
				// 						},
				// 						{
				// 							"name": "Humidity",
				// 							"value": "{humidity}"
				// 						}
				// 					],
				// 						"feeds": [
				// 							{
				// 								"uid": "valueAxis",
				// 								"type": "Measure",
				// 								"values": [
				// 									"{measures/revenueLabel}",
				// 									"{measures/costLabel}"
				// 								]
				// 							},
				// 							{
				// 								"uid": "categoryAxis",
				// 								"type": "Dimension",
				// 								"values": [
				// 									"{dimensions/weekLabel}"
				// 								]
				// 							}
				// 						]
				// 			}
							
				// 		}
				// 			var currentCard = new Card();
				// 	currentCard.setManifest(configuration);
				// 	currentCard.setModel(this.getView().getModel("currentWeather"), "currentWeather");

				// 	if (cardContainer && cardContainer.addItem) {
				// 		cardContainer.addItem(currentCard);
				// 	} else if (cardContainer && cardContainer.addContent) {
				// 		cardContainer.addContent(currentCard);
				// 	}
				// 	break;



				case "Hourly Analytical card":
					var forecastData = this.getView().getModel("forecast").getData();
					
					// Check if data is loaded
					if (!forecastData || !forecastData.list) {
						sap.m.MessageToast.show("Weather data is still loading. Please try again.");
						break;
					}

					// Prepare data for chart - take first 10 forecast entries
					var chartData = forecastData.list.slice(0, 10).map(function(item) {
						return {
							time: item.dt_txt.substring(11, 16), // Extract time (HH:MM)
							temperature: item.main.temp,
							humidity: item.main.humidity
						};
					});

					configuration = {
						"_version": "1.14.0",
						"sap.app": {
							"id": "card.explorer.analytical.weather.card",
							"type": "card"
						},
						"sap.card": {
							"type": "Analytical",
							"header": {
								"type": "Numeric",
								"data": {
									"json": {
										"number": forecastData.list[0].main.temp.toFixed(1),
										"unit": "°C",
										"trend": forecastData.list[0].main.temp > forecastData.list[1].main.temp ? "Down" : "Up",
										"state": forecastData.list[0].main.temp > 30 ? "Error" : "Success",
										"details": "Current Temperature"
									}
								},
								"title": "Weather Analytics - Vellore",
								"subTitle": "Temperature & Humidity Forecast"
							},
							"content": {
								"chartType": "Line",
								"legend": {
									"visible": true,
									"position": "Bottom",
									"alignment": "Left"
								},
								"plotArea": {
									"dataLabel": {
										"visible": true,
										"showTotal": false
									}
								},
								"title": {
									"text": "Weather Forecast",
									"visible": true,
									"alignment": "Left"
								},
								"measureAxis": "valueAxis",
								"dimensionAxis": "categoryAxis",
								"data": {
									"json": chartData
								},
								"dimensions": [
									{
										"label": "Time",
										"value": "{time}"
									}
								],
								"measures": [
									{
										"label": "Temperature (°C)",
										"value": "{temperature}"
									},
									{
										"label": "Humidity (%)",
										"value": "{humidity}"
									}
								],
								"feeds": [
									{
										"uid": "valueAxis",
										"type": "Measure",
										"values": ["Temperature (°C)", "Humidity (%)"]
									},
									{
										"uid": "categoryAxis",
										"type": "Dimension",
										"values": ["Time"]
									}
								]
							}
						}
					};

					var analyticalCard = new Card();
					analyticalCard.setManifest(configuration);

					if (cardContainer && cardContainer.addItem) {
						cardContainer.addItem(analyticalCard);
					} else if (cardContainer && cardContainer.addContent) {
						cardContainer.addContent(analyticalCard);
					}
					break;
					
					
			}
		}
	});
});