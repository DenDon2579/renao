import React from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { useAppSelector } from '../../../../hooks/redux';

type Props = {
  selectedStudentID: string | null;
};

// const students = [
//   { id: 1, name: 'Владиксуперогалик 11 класс' },
//   { id: 2, name: 'Иванмбек 12 класс' },
//   { id: 3, name: 'Мастурбек 4 класс' },
//   { id: 4, name: 'Влад 1 класс' },
// ];

const StudentInfo = (props: Props) => {
  return (
    <div className='h-96 w-96 p-2 flex justify-center flex-shrink-0'>
      {!props.selectedStudentID ? (
        <span className='text-slate-500 mt-3'>
          Выберите ученика для просмотра информации
        </span>
      ) : (
        <span>{props.selectedStudentID}</span>
      )}
    </div>
  );
};

export default StudentInfo;
