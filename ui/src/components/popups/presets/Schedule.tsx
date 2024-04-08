import React, { createElement, useRef } from 'react';
import classes from './Schedule.module.css';
import Students from './Students';

type Props = {};

const Schedule = (props: Props) => {
  const phantomElement = document.createElement('div');
  phantomElement.className = classes.phantom;
  phantomElement.classList.add(
    'shadow-md',
    'shadow-slate-200',
    'text-slate-600'
  );

  phantomElement.innerText = 'Добавить\n12:30-14:00';
  const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    phantomElement.removeAttribute('hidden');
    e.currentTarget.appendChild(phantomElement);
  };
  const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    phantomElement.setAttribute('hidden', '');
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>, hour) => {
    const width = e.currentTarget.clientWidth;
    const offset = e.nativeEvent.offsetX;
    let proportion = +Math.floor((offset / width) * 4);
    // // console.log(proportion);

    if (e.shiftKey) {
      phantomElement.style.left = '0%';
      proportion = 0;
    } else {
      phantomElement.style.left = 25 * proportion + '%';
      console.log(25 * proportion + '%', ' | ', proportion);
    }

    phantomElement.innerText = `Добавить\n${hour}:${
      proportion === 0 ? '00' : proportion * 15
    }-${hour + 1}:${proportion * 15 + 30}`;
  };
  return (
    <div className='w-auto h-auto p-4 z-10'>
      <div className={classes.grid}>
        <div className={classes.timeRow}>
          {new Array(18).fill(0).map((_, i) => (
            <div className={classes.time}>
              <div className={classes.hourMark}>{i + 6}</div>
              <div className={classes.quarterMark}></div>
              <div className={classes.halfMark}></div>
              <div className={classes.quarterMark}></div>
              <div></div>
            </div>
          ))}
        </div>
        <div>
          {new Array(7).fill(0).map((_, rowIndex) => (
            <div key={rowIndex} className={classes.row}>
              {new Array(18).fill(0).map((_, cellIndex) => (
                <div
                  onMouseEnter={mouseEnterHandler}
                  onMouseLeave={mouseLeaveHandler}
                  onMouseMove={(e) => mouseMoveHandler(e, cellIndex + 6)}
                  key={'' + rowIndex + cellIndex}
                  className={classes.cell}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
