import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CounterState = { value: number }
const initialState: CounterState = { value: 0 }

const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (s) => { s.value += 1 },
    decrement: (s) => { s.value -= 1 },
    addBy: (s, a: PayloadAction<number>) => { s.value += a.payload },
  },
})

export const { increment, decrement, addBy } = slice.actions
export default slice.reducer
