import React from 'react';
import { useParams } from 'react-router-dom';
import ButtonPrimary from '../uiKit/buttons/ButtonPrimary';

type Props = {};

const Invite = (props: Props) => {
  const { inviteCode } = useParams();
  return (
    <div className='w-full h-full bg-white flex justify-center items-center'>
      <h1 className='m-0 p-4 leading-none text-center mr-[-.8rem] tracking-[.8rem] text-slate-800 absolute top-0'>
        RENAO
      </h1>
      <div className='w-auto h-auto rounded-md pb-2 flex flex-col items-center'>
        <div className='flex items-center flex-col justify-center '>
          <span className='text-slate-700 text-3xl mb-4'>Привет!</span>
          <span className='text-slate-700 text-xl w-56 text-center'>
            <b className='font-semibold'>{'{Имя}'}</b> приглашает тебя стать его
            учеником
          </span>
        </div>
        <span className='text-base text-slate-600 mt-4 mb-1'>
          Код приглашения: <b>{inviteCode}</b>
        </span>
        <ButtonPrimary className='w-56 mt-1'>
          <span className='text-slate-700 font-semibold'>Продолжить</span>
        </ButtonPrimary>
        <span className='text-sm text-slate-400 w-80 text-center mt-1'>
          Нажимая кнопку 'Продолжить', вы принимаете
          <br />
          <a className='text-slate-500 font-semibold cursor-pointer'>
            пользовательское соглашение
          </a>
        </span>
      </div>
    </div>
  );
};

export default Invite;
