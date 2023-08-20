import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {

  const [data, setData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3c28cf553e8326b3f349afb4abd18e1c&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              }
              setData(weatherData);
              setPending(false);
            });
        } else {
          setError(true)
        }
      })
  }, [])

  return (
    <section>
      <PickCity action={handleCityChange} />
      {(data && !pending) && <WeatherSummary data={data} />}
      {(pending && !error) && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;