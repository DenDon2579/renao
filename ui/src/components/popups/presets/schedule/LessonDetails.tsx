import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ButtonPrimary from '../../../uiKit/buttons/ButtonPrimary';
import { TbArrowsRightLeft, TbMinus, TbUserCircle } from 'react-icons/tb';
import { ILesson } from './Schedule';
import { Duration } from 'luxon';
import Popup from '../../Popup';

type Props = {
  selectedLesson: ILesson;
  onLessonChange(newLessonData: ILesson): void;
  onHide(): void;
};

const LessonDetails = ({ selectedLesson, onLessonChange, onHide }: Props) => {
  const [durationTimeString, setDurationTimeString] = useState('');
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

  return (
    <div className='absolute top-0 right-0 w-60 h-full z-50 transition-opacity'>
      <TbMinus
        onClick={onHide}
        size={26}
        className='absolute top-2 right-2 text-slate-600 shrink-0 cursor-pointer'
      />

      <div
        ref={ref}
        className='w-full h-full bg-white bg-opacity-90 shadow-md shadow-indigo-100 rounded-md border border-indigo-100 p-2'
      >
        <h3 className='text-xl text-center mb-2'>Занятие с</h3>
        <div className='flex'>
          <ButtonPrimary className='w-full h-10 flex justify-between items-center mb-2 px-1 mr-1'>
            <div className='flex items-center'>
              <TbUserCircle
                size={26}
                className='mr-2 text-slate-400 shrink-0'
              />
              <span className='text-base text-slate-800 leading-none break-all'>
                {selectedLesson.studentName}
              </span>
            </div>
          </ButtonPrimary>
          <ButtonPrimary className='h-10 w-10 shrink-0'>
            <TbArrowsRightLeft size={22} className='text-slate-400' />
          </ButtonPrimary>
        </div>

        <div className='flex items-center justify-between border border-slate-200 rounded-md h-10 py-1 px-2 mb-2'>
          <span className='text-lg leading-none'>Начало</span>
          <div className='rounded-md flex items-center'>
            <select
              value={selectedLesson?.day}
              onChange={daySelectHandler}
              className='mr-1 border border-slate-200 rounded-md p-0.5 cursor-pointer'
            >
              <option value={0}>Пн</option>
              <option value={1}>Вт</option>
              <option value={2}>Ср</option>
              <option value={3}>Чт</option>
              <option value={4}>Пт</option>
              <option value={5}>Сб</option>
              <option value={6}>Вс</option>
            </select>
            <input
              value={Duration.fromObject({
                hours: selectedLesson?.hour,
                minutes: selectedLesson?.minute,
              }).toFormat('hh:mm')}
              onChange={timeChangeHandler}
              type='time'
              className='w-auto h-full border border-slate-200 rounded-md pl-1.5 p-0.5 cursor-pointer'
            />
          </div>
        </div>
        <h3 className='text-lg text-center'>Продолжительность</h3>
        <div className='flex items-center justify-between border border-slate-200 rounded-md h-10 py-1 px-2 mt-1'>
          <div className='rounded-md flex items-center w-full flex-col'>
            <input
              onChange={durationChangeHandler}
              value={selectedLesson.duration * 60}
              type='range'
              min={45}
              max={240}
              step={15}
              className='w-full h-full border border-slate-200 rounded-md pl-1.5 p-0.5 cursor-pointer'
            />
            <span>{durationTimeString}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
