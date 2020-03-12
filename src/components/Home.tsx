import React, {CSSProperties} from 'react';
import DateTimeContainer from './DateTimeContainer'
import WeatherTemp from './WeatherTemp';
import { WeatherResponse } from '../api-typings';


interface Props{
  isDayMode: boolean,
  loadWeather: object,
  weatherContent: WeatherResponse[],
}


export default function Home(props : Props) {
  return (
    <div style = {homeGridItem}>
      <DateTimeContainer />
      <WeatherTemp isDayMode={props.isDayMode} loadWeather={props.loadWeather} weatherContent={props.weatherContent}/>  
    </div>
  );
}

const homeGridItem: CSSProperties = {
  gridArea: 'home',
  height: '95vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}
