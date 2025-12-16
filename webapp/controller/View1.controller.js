
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


				case "Current Object card":
					configuration = {
						"_version": "1.15.0",
						"sap.app": {
							"id": "card.explorer.object.card",
							"type": "card",
							"title": "Current Weather Card",
							"subTitle": "Weather Information"
						},
						"sap.ui": {
							"technology": "UI5",
							"icons": {
								"icon": "sap-icon://weather-proofing"
							}
						},
						"sap.card": {
							"type": "Object",
							// "data": {
							//     "path": "currentWeather>/main"
							// },
							"data": {
								"path": "currentWeather>/"
							},

                               "header": {
								"icon": {
									"src": "https://openweathermap.org/img/wn/{currentWeather>/weather/0/icon}@2x.png"
								},
								"title": "{currentWeather>/weather/0/main}",
								"subTitle": "{currentWeather>/weather/0/description}"
							},
							"content": {
								"groups": [
									{
										"title": "Temperature Detail",
										"items": [
											{
												"label": "Temperature",
												"value": "{currentWeather>/main/temp} °C"
											},
											{
												"label": "Feels Like",
												"value": "{currentWeather>/main/feels_like} °C"
											}
										]
									},
									{
										"title": "Others",
										"items": [
											{
												"label": "Pressure",
												"value": "{currentWeather>/main/pressure} hPa"
											},
											{
												"label": "Humidity",
												"value": "{currentWeather>/main/humidity}%"
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
					var forecastData = this.getView().getModel("forecast").getData();

					// Check if data is loaded
					if (!forecastData || !forecastData.list) {
						sap.m.MessageToast.show("Weather data is still loading. Please try again.");
						break;
					}

					// Prepare data for chart - take first 10 forecast entries
					var chartData = forecastData.list.slice(0, 10).map(function (item) {
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