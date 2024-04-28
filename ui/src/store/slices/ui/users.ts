import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [
    {
      id: '1',
      name: 'Рашид',
    },
    {
      id: '2',
      name: 'Арсений',
    },
    {
      id: '3',
      name: 'Кирилл',
    },
    {
      id: '4',
      name: 'Полина',
    },
    {
      id: '5',
      name: 'Маргарита',
    },
    {
      id: '6',
      name: 'Зоя',
    },
    {
      id: '7',
      name: 'Антон',
    },
    {
      id: '8',
      name: 'Степан',
    },
    {
      id: '9',
      name: 'Майя',
    },
    {
      id: '10',
      name: 'Илья',
    },
    {
      id: '11',
      name: 'Ярослав',
    },

    {
      id: '12',
      name: 'Ильнара',
    },
    {
      id: '13',
      name: 'Николай',
    },
    {
      id: '14',
      name: 'Рауль',
    },
    {
      id: '15',
      name: 'Даня',
    },
    {
      id: '16',
      name: 'Азамат',
    },
    {
      id: '17',
      name: 'Назар',
    },
  ],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {},
});

// export const {  } = userSlice.actions

export default usersSlice.reducer;
