import React, { Component } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDetails from "./components/WeatherDetails";

class App extends Component {
  state = {
    temperature: "",
    description: "",
    humidity: "",
    wind_speed: 0,
    city: "",
    country: "",
    error: null,
  };

  getWeather = async (e) => {
    e.preventDefault();
    const { city, country } = e.target.elements;
    const cityValue = city.value;
    const countryValue = country.value;
    const mykey = "e23d92c9d68991fe1a7c3ff582b0ed33";

    if (cityValue && countryValue) {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${mykey}`;
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);

      this.setState({
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        error: null,
      });
    } else {
      this.setState({
        error: "Please enter a City and a Country",
      });
    }
  };

  render() {
    return (
      <div className="App container p-4">
        <div className="row">
          <div lassName="col-md-6 mx-auto">
            <WeatherForm getWeather={this.getWeather} />
            <WeatherDetails {...this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
