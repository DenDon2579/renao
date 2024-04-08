import React, { createElement, useEffect, useRef, useState } from 'react';
import classes from './Schedule.module.css';
import Students from '../Students';
import ScheduleCell from './ScheduleCell';

type Props = {};
export interface ILesson {
  studentID: string;
  studentName: string;
  day: number;
  hour: number;
  minute: number;
  duration: number;
}
const lessons: ILesson[] = [
  {
    studentID: '2323',
    studentName: 'Владик 6 класс',
    day: 3,
    hour: 13,
    minute: 0,
    duration: 3,
  },
  {
    studentID: '2323',
    studentName: 'Питер 1 класс',
    day: 5,
    hour: 18,
    minute: 0,
    duration: 1.5,
  },
];

const Schedule = (props: Props) => {
  const [phantomLesson, setPhantomLesson] = useState<HTMLDivElement>();

  useEffect(() => {
    // Создаём фантомный элемент один раз
    const phantomLesson = document.createElement('div');
    phantomLesson.className = classes.phantom;
    phantomLesson.classList.add(
      'shadow-md',
      'shadow-slate-200',
      'text-slate-600'
    );

    phantomLesson.innerText = 'Создать';
    setPhantomLesson(phantomLesson);
  }, []);

  // Юзер навелся на клетку -> Пихаем в эту клетку фантом и делаем видимым
  const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phantomLesson) return;
    phantomLesson.removeAttribute('hidden');
    e.currentTarget.appendChild(phantomLesson);
  };

  // Курсор покинул клетку -> прячем фантом
  const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    phantomLesson?.setAttribute('hidden', '');
  };

  //Юзер двигает мышкой -> Перемещаем фантом по четвертям часа
  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phantomLesson) return;
    const width = e.currentTarget.clientWidth;
    const offset = e.nativeEvent.offsetX;
    let proportion = +Math.floor((offset / width) * 4);

    if (e.shiftKey) {
      //С шифтом магнитит по часам
      phantomLesson.style.left = '0%';
      proportion = 0;
    } else {
      //Иначе по четвертям часа
      phantomLesson.style.left = 25 * proportion + '%';
    }
  };

  //Юзер навелся на существующий урок -> прячем фантом
  const onMouseEnterLesson = () => {
    phantomLesson?.setAttribute('hidden', '');
  };

  //Ищем урок для определенной клетки
  const getCellLesson = (rowIndex: number, cellIndex: number) => {
    return lessons.find(
      (lesson) => lesson.day === rowIndex && lesson.hour === cellIndex + 6 //Так как время у нас с 6 до 23 часов, прибавляем 6 к индексу ячейки
    );
  };

  return (
    <div className='w-auto h-auto p-4 z-10 flex mt-2'>
      <div className='mt-5 *:h-16 *:flex *:items-center mr-2 *:text-slate-600'>
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div>Сб</div>
        <div>Вс</div>
      </div>
      <div className={classes.grid}>
        <div className={classes.timeRow}>
          {new Array(18).fill(0).map((_, i) => (
            <div className={classes.time}>
              <div className='mb-5 -ml-1 absolute text-slate-600'>
                {i + 6 + ':00'}
              </div>
              <div className={classes.hourMark}></div>
              <div className={classes.quarterMark}></div>
              <div className={classes.halfMark}></div>
              <div className={classes.quarterMark}></div>
              <div></div>
            </div>
          ))}
        </div>
        <div>
          {/* Рисуем таблицу */}
          {new Array(7).fill(0).map((_, rowIndex) => (
            <div key={rowIndex} className={classes.row}>
              {new Array(18).fill(0).map((_, cellIndex) => (
                <ScheduleCell
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  lesson={getCellLesson(rowIndex, cellIndex)}
                  mouseEnterHandler={mouseEnterHandler}
                  mouseLeaveHandler={mouseLeaveHandler}
                  mouseMoveHandler={mouseMoveHandler}
                  onMouseEnterLesson={onMouseEnterLesson}
                  key={'' + cellIndex + rowIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
