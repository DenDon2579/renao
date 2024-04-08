import React from 'react';
import { TbUserCircle, TbDots } from 'react-icons/tb';
import StudentInfo from './StudentInfo';

type Props = {};

const Students = (props: Props) => {
  const students = [
    { id: 1, name: 'Владиксуперогалик 11 класс' },
    { id: 2, name: 'Иванмбек 12 класс' },
    { id: 3, name: 'Мастурбек 4 класс' },
    { id: 4, name: 'Влад 1 класс' },
    { id: 1, name: 'Владиксуперогалик 11 класс' },
    { id: 2, name: 'Иванмбек 12 класс' },
    { id: 3, name: 'Мастурбек 4 класс' },
    { id: 4, name: 'Влад 1 класс' },
  ];
  return (
    <div className='flex'>
      <div className='w-72 h-96 p-2 border-r border-slate-200 flex flex-col'>
        <div className='mb-2 h-10'>
          <input
            placeholder='Поиск учеников'
            className='h-10 focus:outline-none text-base pr-2 pl-2 rounded-md w-full leading-none bg-white border border-slate-200 shadow-sm shadow-slate-100'
          />
        </div>
        <div className='flex-grow overflow-auto'>
          {students.map((student) => (
            <div
              key={student.id}
              className='w-full h-10 bg-white border border-slate-200 flex justify-between items-center mb-2 px-1 rounded-md hover:bg-slate-50 cursor-pointer shadow-sm shadow-slate-200'
            >
              <div className='flex items-center'>
                <TbUserCircle size={26} className='mr-2 text-slate-400' />
                <span className='text-base text-slate-800 leading-none'>
                  {student.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className='p-2 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm shadow-slate-200 rounded-md w-full'>
          Добавить ученика
        </button>
      </div>
      <StudentInfo />
    </div>
  );
};

export default Students;
