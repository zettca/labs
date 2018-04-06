import React from 'react';
import { weekDays, removeNums, getTime } from '../helpers';

class Lab extends React.PureComponent {
  render() {
    const { day, data } = this.props;
    if (!data) return null;

    const { events } = data;
    const curTime = getTime();
    const nextClasses = [];
    let currentClass = null;

    events.forEach(ev => {
      ev.course.acronym = removeNums(ev.course.acronym);

      if (ev.weekday === weekDays[day].slice(0, 3)) {
        if (curTime < ev.start || weekDays[day] !== weekDays[new Date().getDay()]) {
          nextClasses.push(ev);
        } else if (curTime >= ev.start && curTime <= ev.end) {
          nextClasses.push(ev);
          currentClass = ev;
        }
      }
    });

    nextClasses.sort((a, b) => (a.start < b.start) ? -1 : 1);

    return (
      <div>
        <h3 className={currentClass ? 'red' : ((nextClasses.length) ? 'blue' : 'green')}>
          Lab {data.name}
        </h3>
        {nextClasses.map((cl, i) => (
          <span key={i}>
            <strong>{cl.start} – {cl.end}</strong> {cl.course.acronym}
          </span>
        ))}
      </div>
    );
  }
}

export default Lab;
