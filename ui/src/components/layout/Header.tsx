import React from 'react';
import {
  TbHome,
  TbEdit,
  TbCalendar,
  TbUsers,
  TbSettings,
} from 'react-icons/tb';
import ButtonPrimary from '../uiKit/buttons/ButtonPrimary';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className='h-16 w-auto p-2 fixed flex items-center justify-center'>
      <div className='h-full w-auto flex *:relative *:h-12 *:w-auto *:p-2 *:mr-2 *:flex *:items-center *:justify-center'>
        <ButtonPrimary>
          <TbHome size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Главная
          </span>
        </ButtonPrimary>
        <ButtonPrimary>
          <TbEdit size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Доска
          </span>
        </ButtonPrimary>
        <ButtonPrimary>
          <TbCalendar size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Расписание
          </span>
        </ButtonPrimary>
        <ButtonPrimary>
          <TbUsers size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Ученики
          </span>
        </ButtonPrimary>
        <ButtonPrimary className='!mr-0'>
          <TbSettings size={32} className='text-slate-400' />
          <span className='ml-1 text-slate-600 text-base font-medium'>
            Настройки
          </span>
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default Header;
