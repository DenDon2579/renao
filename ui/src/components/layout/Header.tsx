import React from 'react';
import {
  TbHome,
  TbEdit,
  TbCalendar,
  TbUsers,
  TbSettings,
} from 'react-icons/tb';
import ButtonPrimary from '../uiKit/buttons/ButtonPrimary';

import { NavLink } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className='h-16 w-auto p-2 fixed flex items-center justify-center z-50'>
      {/* <h1 className='m-0 mt-1 p-4 leading-none text-2xl text-center mr-[-.8rem] tracking-[.8rem] text-slate-800 fixed top-0 left-0'>
        RENAO
      </h1> */}
      <div className='h-full w-auto flex *:relative *:h-12 *:w-auto *:p-2 *:mr-2 *:flex *:items-center *:justify-center'>
        <ButtonPrimary>
          <NavLink to='/' className='flex items-center'>
            <TbHome size={32} className='text-slate-500' />
            <span className='ml-1 text-slate-600 text-base font-medium'>
              Главная
            </span>
          </NavLink>
        </ButtonPrimary>
        <ButtonPrimary>
          <NavLink to='/board' className='flex items-center'>
            <TbEdit size={32} className='text-slate-500' />
            <span className='ml-1 text-slate-600 text-base font-medium'>
              Доска
            </span>
          </NavLink>
        </ButtonPrimary>
        <ButtonPrimary>
          <NavLink to='/schedule' className='flex items-center'>
            <TbCalendar size={32} className='text-slate-500' />
            <span className='ml-1 text-slate-600 text-base font-medium'>
              Расписание
            </span>
          </NavLink>
        </ButtonPrimary>
        <ButtonPrimary>
          <NavLink to='/students' className='flex items-center'>
            <TbUsers size={32} className='text-slate-500' />
            <span className='ml-1 text-slate-600 text-base font-medium'>
              Ученики
            </span>
          </NavLink>
        </ButtonPrimary>
        <ButtonPrimary className='!mr-0'>
          <NavLink to='/settings' className='flex items-center'>
            <TbSettings size={32} className='text-slate-500' />
            <span className='ml-1 text-slate-600 text-base font-medium'>
              Настройки
            </span>
          </NavLink>
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default Header;
