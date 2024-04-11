import React, { useState } from 'react';
import { TbUserCircle, TbDots } from 'react-icons/tb';
import StudentInfo from './StudentInfo';
import ButtonPrimary from '../../uiKit/buttons/ButtonPrimary';

type Props = {};

const Students = (props: Props) => {
  const students = [
    { id: '1', name: 'Владиксуперогалик 11 класс' },
    { id: '2', name: 'Иванмбек 12 класс' },
    { id: '3', name: 'Керил 4 класс' },
    { id: '4', name: 'Влад 1 класс' },
  ];

  const [selectedStudentID, setSelectedStudentID] = useState<null | string>(
    null
  );
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
            <ButtonPrimary
              onClick={() => setSelectedStudentID(student.id)}
              key={student.id}
              className='w-full h-10 flex justify-between items-center mb-2 px-1'
            >
              <div className='flex items-center'>
                <TbUserCircle size={26} className='mr-2 text-slate-400' />
                <span className='text-base text-slate-800 leading-none'>
                  {student.name}
                </span>
              </div>
            </ButtonPrimary>
          ))}
        </div>
        <ButtonPrimary className='mt-2'>Добавить ученика</ButtonPrimary>
      </div>

      <StudentInfo selectedStudentID={selectedStudentID} />
    </div>
  );
};

export default Students;
