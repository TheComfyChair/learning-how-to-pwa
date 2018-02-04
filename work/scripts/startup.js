import "./localforage.js";

export const startup = initialWeatherForecast => app => {
  const getCityForecasts = selectedCities => {
    app.selectedCities = selectedCities;
    app.selectedCities.forEach(({ key, label }) => app.getForecast(key, label));
  };

  const loadFakeData = selectedCities => {
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      { key: initialWeatherForecast.key, label: initialWeatherForecast.label }
    ];
    app.saveSelectedCities();
  };

  const handleCitiesInitialization = selectedCities =>
    (selectedCities ? getCityForecasts : loadFakeData)(selectedCities);

  return () =>
    localforage
      .getItem("selectedCities")
      .then((err, value) => (err ? err : value))
      .then(handleCitiesInitialization)
      .catch(console.error);
};
