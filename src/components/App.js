import React from 'react';
import store from 'store';
import Lab from './Lab';
import './App.css';
import { weekDays, getTime, getDate, getISODate, getLastMonday } from '../helpers';

const URL = 'https://web.tecnico.ulisboa.pt/~ist178013/api/labevents/?lab=';
const DEFAULT_LABS = [220, 221, 222, 227, 229, 166].map(l => '2448131365' + l);

class App extends React.Component {
  constructor(props) {
    super(props);

    const labs = store.get('labs') || DEFAULT_LABS;
    store.set('labs', labs);

    this.state = {
      date: getDate(),
      time: getTime(),
      dow: new Date().getDay(), // day of week
      labs: labs.map(id => ({ id: id, data: null })),
    };

    this.nextDay = this.nextDay.bind(this);
  }

  componentDidMount() {
    const { labs } = this.state;
    const dayEntry = getISODate(getLastMonday());

    labs.forEach(lab => {
      const labEntry = `${lab.id}_${dayEntry}`;
      const labData = store.get(labEntry);

      if (labData !== undefined) {
        console.log('Hit localStorage for ' + labEntry);
        lab.data = labData;
        this.setState({ labs });
      } else {
        fetch(URL + lab.id)
          .then((res) => res.json())
          .then((data) => {
            lab.data = data;
            store.set(labEntry, data);
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
