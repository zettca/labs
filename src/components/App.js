import React from 'react';
import Lab from './Lab';
import './App.css';
import { weekDays, getTime, getDate } from '../helpers';

const URL = 'https://web.tecnico.ulisboa.pt/~ist178013/labevents/?lab=';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.nextDay = this.nextDay.bind(this);
    this.state = {
      date: getDate(),
      time: getTime(),
      dow: new Date().getDay(), // day of week
      labs: [
        { id: 2448131365220, data: null }, // 1 - 15
        { id: 2448131365221, data: null }, // 1 - 17
        { id: 2448131365222, data: null }, // 1 - 19
        { id: 2448131365227, data: null }, // 1 - 27
        { id: 2448131365229, data: null }, // 1 - 29
        { id: 2448131365166, data: null }, // 0 - 14
      ],
    };
  }

  componentWillMount() {
    const { labs } = this.state;
    labs.forEach(lab => {
      fetch(URL + lab.id)
        .then((res) => res.json())
        .then((data) => {
          lab.data = data;
          this.setState({ labs });
        });
    });
  }

  nextDay() {
    const { dow } = this.state;
    const d = new Date();
    const newDow = ((dow >= 5) ? 0 : dow) + 1;
    d.setDate(d.getDate() + (newDow - d.getDay()));

    this.setState({
      date: getDate(d),
      time: getTime(),
      dow: newDow,
    });
  }

  render() {
    const { dow, date, time, labs } = this.state;

    return (
      <main>
        <header onClick={this.nextDay}>
          <h3>
            <span>{`${weekDays[dow].slice(0, 3)}, ${date}`}</span>
            <span className={'right'}>{time}</span>
          </h3>
        </header>
        <section id="infos">
          {labs.map((lab) => (lab.data && <Lab key={lab.id} day={dow} data={lab.data} />))}
        </section>
      </main>
    );
  }
}

export default App;
