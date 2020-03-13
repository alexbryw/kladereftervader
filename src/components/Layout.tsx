import React, {CSSProperties}from 'react'
import MainView from './MainView'
import Navbar from './Navbar'
import DayNightMode from './DayNightMode'
import ErrorBoundary from './ErrorBoundary'
import Home from './Home'
import WeekOverview from './WeekOverview'
import Clothes from './Clothes'
import { WeatherResponse } from '../api-typings'

interface Props{
  weatherContent: WeatherResponse[]
}

interface State{
  isDayMode: boolean,
  // DO WE ACTUALLY STILL NEED THIS? Is isDayMode enough?
  buttonText: string,
  modeStyle: React.CSSProperties,
  deviceSize: "isMobile" | "isDesktop",
}

export default class Layout extends React.Component <Props, State>{
  constructor(props:Props){
    super(props)
    this.state = {
      isDayMode: true,
      buttonText: 'Dag',
      modeStyle: mainDayStyle,
      deviceSize: this.calculateDeviceSize(),
    }
    this.toggleDayNightMode = this.toggleDayNightMode.bind(this)
  }

  toggleDayNightMode() {
    this.setState({isDayMode:!this.state.isDayMode})

    if (this.state.isDayMode){
      this.setState({buttonText: "Natt"})
      this.setState({modeStyle: mainNigthStyle})
    }
    else{
      this.setState({buttonText:"Dag"})
      this.setState({modeStyle: mainDayStyle})
    }
  }

  updateDeviceSize = () => {
    this.setState({ deviceSize: this.calculateDeviceSize() })
  }

  calculateDeviceSize(): "isMobile" | "isDesktop" {
    if (window.innerWidth < 1000) {
      return 'isMobile'
    } else {
      return 'isDesktop'
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDeviceSize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDeviceSize)
  }

  render(){
    const weatherContent:WeatherResponse[] = this.props.weatherContent
    console.log(this.state.deviceSize)
   
    if(this.state.deviceSize === "isMobile"){
      return (
        <div style = {mainStyle}>
            <ErrorBoundary>
            <div style = {{...styleMobile, ...this.state.modeStyle}}>
              <MainView isDayMode = {this.state.isDayMode} weatherContent={weatherContent}/>
            </div>
            </ErrorBoundary>
            <DayNightMode isDayMode = {this.state.isDayMode} buttonText = {this.state.buttonText} onToggleMode = {this.toggleDayNightMode}/>
            <Navbar isDayMode = {this.state.isDayMode} />
        </div>
      )
    }

    else{
      return (
        <div style = {{...this.state.modeStyle, ...gridLayoutDesktop, ...mainStyle, ...styleDesktop}}>
            <ErrorBoundary>
              <Home isDayMode={this.state.isDayMode} weatherContent={weatherContent}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <WeekOverview isDayMode = {this.state.isDayMode} weatherContent={weatherContent}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <Clothes isDayMode = {this.state.isDayMode} weatherContent={weatherContent}/>
            </ErrorBoundary>
            <DayNightMode isDayMode = {this.state.isDayMode} buttonText = {this.state.buttonText} onToggleMode = {this.toggleDayNightMode}/>
        </div>
      )
    }

  }
}

const mainStyle:CSSProperties = {
  height: '98vh',
  width: '100%',
  position: 'relative',
}

const mainDayStyle:CSSProperties = {
  backgroundColor: '#b3d9ff',
  color: 'black'
}

const mainNigthStyle:CSSProperties = {
  backgroundColor: '#000033',
  color: '#ffffcc'
}

const styleMobile:CSSProperties = {
  borderTop: '3px solid black',
  borderRight: '3px solid black',
  borderLeft: '3px solid black',
  borderTopLeftRadius: '25px',
  borderTopRightRadius: '25px',
  height: '88%',
  display: 'flex',
  justifyContent: 'center',
}

const styleDesktop:CSSProperties = {
  border: '3px solid black',
  borderRadius: '25px',
}


const gridLayoutDesktop: CSSProperties = {
  display: 'grid',
  width: '100%',
  height: '100%',
  gridTemplateColumns: '35% 25% 40%',
  gridTemplateAreas: 
  '"home week clothes"',
}