import React from 'react';
import Lab from './Lab';
import './App.css';
import { weekDays, getTime, getDate, getISODate, getLastMonday } from '../helpers';

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
        { id: 2448131365220, name: '1 - 15', data: null },
        { id: 2448131365221, name: '1 - 17', data: null },
        { id: 2448131365222, name: '1 - 19', data: null },
        { id: 2448131365227, name: '1 - 27', data: null },
        { id: 2448131365229, name: '1 - 29', data: null },
        { id: 2448131365166, name: '0 - 14', data: null },
      ],
    };
  }

  componentWillMount() {
    const { labs } = this.state;
    const dayEntry = getISODate(getLastMonday());

    labs.forEach(lab => {
      const labEntry = `${dayEntry}_${lab.id}`;
      const labData = JSON.parse(localStorage.getItem(labEntry));
      if (labData !== null) {
        console.log('Hit localStorage for ' + lab.name);
        lab.data = labData;
        this.setState({ labs });
      } else {
        fetch(URL + lab.id)
          .then((res) => res.json())
          .then((data) => {
            lab.data = data;
            localStorage.setItem(labEntry, JSON.stringify(data));
            this.setState({ labs });
          });
      }
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
