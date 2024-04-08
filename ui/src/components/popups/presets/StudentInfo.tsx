import React from 'react';
import { TbUserCircle } from 'react-icons/tb';

type Props = {};

const students = [
  { id: 1, name: 'Владиксуперогалик 11 класс' },
  { id: 2, name: 'Иванмбек 12 класс' },
  { id: 3, name: 'Мастурбек 4 класс' },
  { id: 4, name: 'Влад 1 класс' },
];

const StudentInfo = (props: Props) => {
  return (
    <div className='h-96 p-2 flex justify-center'>
      <span className='text-slate-500 mt-3'>
        Выберите ученика для просмотра информации
      </span>
    </div>
  );
};

export default StudentInfo;
