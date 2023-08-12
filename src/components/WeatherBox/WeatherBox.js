import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [data, setData] = useState('');

  const weatherData = {
    city: data.name,
    // temp: data.main.temp,
    // icon: data.weather[0].icon,
    // description: data.weather[0].main
};
 console.log(weatherData) 

 const handleCityChange = useCallback( city => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3c28cf553e8326b3f349afb4abd18e1c&units=metric`)
  .then(res => res.json())
  .then(data => { setData(data)
  });
  
  }, [] )

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  )
};

export default WeatherBox;