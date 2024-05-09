import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ButtonPrimary from '../../../uiKit/buttons/ButtonPrimary';
import {
  TbArrowsRightLeft,
  TbClock,
  TbMinus,
  TbPlayerPlay,
  TbTrash,
  TbUserCircle,
} from 'react-icons/tb';
import { ILesson } from './Schedule';
import { Duration } from 'luxon';
import classes from './Schedule.module.css';
import Popup from '../../Popup';
import StudentInfo from '../students/StudentInfo';
import Students from '../students/Students';

type Props = {
  selectedLesson: ILesson;
  onLessonChange(newLessonData: ILesson): void;
  onHide(): void;
};

const LessonDetails = ({ selectedLesson, onLessonChange, onHide }: Props) => {
  const [durationTimeString, setDurationTimeString] = useState('');
  const [extraModule, setExtraModule] = useState<
    null | 'studentInfo' | 'studentList'
  >(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedLesson)
      setDurationTimeString(getDurationTimeString(0, selectedLesson.duration));
  }, [selectedLesson]);

  const durationChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onLessonChange({ ...selectedLesson, duration: +e.target.value / 60 });
  };

  const getDurationTimeString = (
    minutes: number = 0,
    hours: number = 0
  ): string => {
    return Duration.fromObject({
      hours: hours,
      minutes: minutes,
    })
      .normalize()
      .toHuman();
  };

  const daySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onLessonChange({ ...selectedLesson, day: +e.target.value });
  };

  const timeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let [hour, minute] = e.target.value.split(':').map((i) => +i);
    minute = Math.floor(+minute / 15) * 15;
    onLessonChange({ ...selectedLesson, hour, minute });
  };

  const studentClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (extraModule !== 'studentInfo') {
      setExtraModule('studentInfo');
    } else {
      setExtraModule(null);
    }
  };

  return (
    <div className='absolute top-0 right-0 w-auto h-full z-50 transition-opacity flex flex-row-reverse'>
      <TbMinus
        onClick={onHide}
        size={26}
        className='absolute top-2 right-2 text-slate-600 shrink-0 cursor-pointer'
      />

      <div
        ref={ref}
        className='w-60 h-full flex-shrink-0 bg-white bg-opacity-90 shadow-md shadow-indigo-100 rounded-md border border-indigo-100 p-2 flex flex-col'
      >
        <h3 className='text-xl text-center mb-2 text-slate-800'>
          {selectedLesson.studentID ? 'Занятие с' : 'Занятие'}
        </h3>
        <div className='overflow-auto flex flex-col flex-grow'>
          <div className='flex'>
            <ButtonPrimary
              className='w-full h-10 flex justify-between items-center mb-2 px-1 mr-1'
              onClick={studentClickHandler}
            >
              <div className='flex items-center'>
                <TbUserCircle
                  size={26}
                  className='mr-2 text-slate-500 shrink-0'
                />
                <span className='text-base text-slate-800 leading-none break-all'>
                  {selectedLesson.studentName}
                </span>
              </div>
            </ButtonPrimary>
            <ButtonPrimary
              className='h-10 w-10 shrink-0'
              onClick={() => setExtraModule('studentList')}
            >
              <TbArrowsRightLeft size={22} className='text-slate-500' />
            </ButtonPrimary>
          </div>

          <div className='flex items-center justify-between border border-slate-200 rounded-md h-10 py-1 px-2 mb-2'>
            <span className='text-lg leading-none text-slate-800'>Начало</span>
            <div className='rounded-md flex items-center'>
              <select
                value={selectedLesson?.day}
                onChange={daySelectHandler}
                className='mr-1 border border-slate-200 rounded-md p-0.5 cursor-pointer text-slate-800'
              >
                <option value={0}>Пн</option>
                <option value={1}>Вт</option>
                <option value={2}>Ср</option>
                <option value={3}>Чт</option>
                <option value={4}>Пт</option>
                <option value={5}>Сб</option>
                <option value={6}>Вс</option>
              </select>
              <div className='relative flex items-center'>
                <input
                  value={Duration.fromObject({
                    hours: selectedLesson?.hour,
                    minutes: selectedLesson?.minute,
                  }).toFormat('hh:mm')}
                  onChange={timeChangeHandler}
                  type='time'
                  className='w-auto h-full border border-slate-200 rounded-md pl-1.5 p-0.5 text-slate-800 cursor-pointer'
                />
                <TbClock
                  size={18}
                  className='text-slate-500 absolute right-1.5 pointer-events-none'
                />
              </div>
            </div>
          </div>
          <h3 className='text-lg text-center text-slate-800'>
            Продолжительность
          </h3>
          <div className='flex items-center justify-between h-auto mt-1 mb-2'>
            <div className='rounded-md flex items-center w-full h-full justify-center relative'>
              <input
                style={{
                  background: `linear-gradient(to right, ${
                    selectedLesson.studentID ? '#C7D2FE' : '#FDE68A'
                  } ${
                    ((selectedLesson.duration * 60 - 45) / 195) * 100
                  }%, transparent ${
                    ((selectedLesson.duration * 60 - 45) / 195) * 100
                  }%)`,
                }}
                onChange={durationChangeHandler}
                value={selectedLesson.duration * 60}
                type='range'
                min={45}
                max={240}
                step={15}
                className={
                  classes.durationInput +
                  ' w-full h-10 cursor-pointer rounded-md border border-slate-200 bg-indigo-200 transition-all overflow-hidden'
                }
              />
              <span className='absolute pointer-events-none text-slate-800'>
                {durationTimeString}
              </span>
            </div>
          </div>
          <h3 className='text-lg text-center text-slate-800'>Заметки</h3>
          <div className='flex flex-grow mt-1 min-h-20'>
            <textarea className='border border-slate-200 w-full h-auto rounded-md p-2 resize-none'></textarea>
          </div>
        </div>
        <div className='flex w-full pt-2'>
          <ButtonPrimary className='w-full h-10 flex justify-between items-center px-1 mr-1'>
            <div className='flex items-center'>
              <TbPlayerPlay
                size={22}
                className='mr-2 text-slate-500 shrink-0'
              />
              <span className='text-base text-slate-800 leading-none break-all'>
                Начать урок
              </span>
            </div>
          </ButtonPrimary>
          <ButtonPrimary className='h-10 w-10 shrink-0'>
            <TbTrash size={22} className='text-slate-500' />
          </ButtonPrimary>
        </div>
      </div>
      {extraModule && (
        <div className='w-full h-full bg-white bg-opacity-90 shadow-md shadow-indigo-100 rounded-md border border-indigo-100 mr-2 relative'>
          <TbMinus
            onClick={() => setExtraModule(null)}
            size={26}
            className='absolute top-2 right-2 text-slate-600 shrink-0 cursor-pointer'
          />
          {extraModule === 'studentInfo' ? (
            <StudentInfo selectedStudentID={selectedLesson.studentID} />
          ) : (
            <Students withDetails={false} />
          )}
        </div>
      )}
    </div>
  );
};

export default LessonDetails;
