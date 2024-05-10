import React, { useState } from 'react';
import { TbUserCircle, TbDots } from 'react-icons/tb';
import StudentInfo from './StudentInfo';
import ButtonPrimary from '../../../uiKit/buttons/ButtonPrimary';
import { useAppSelector } from '../../../../hooks/redux';

type Props = {
  withDetails: boolean;
};

const Students = ({ withDetails }: Props) => {
  const students = useAppSelector((state) => state.users.students);

  const [selectedStudentID, setSelectedStudentID] = useState<null | string>(
    null
  );
  return (
    <div className='flex h-full'>
      <div
        className={
          'w-72 h-full p-2 flex flex-col' +
          (withDetails ? ' border-r border-slate-200' : '')
        }
      >
        <div className='mb-2 h-10'>
          <input
            placeholder='Поиск учеников'
            className='h-10 focus:outline-none text-base pr-2 pl-2 rounded-md w-full leading-none bg-white border border-slate-200 shadow-sm shadow-slate-100'
          />
        </div>
        <div className='flex-grow pr-2 overflow-auto'>
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
        {withDetails && (
          <ButtonPrimary className='mt-2'>Добавить ученика</ButtonPrimary>
        )}
      </div>
      {withDetails && <StudentInfo selectedStudentID={selectedStudentID} />}
    </div>
  );
};

export default Students;
