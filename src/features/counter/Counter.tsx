import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '../../store'

import { increment, decrement, addBy } from './counterSlice'

export const Counter = () => {
  const value = useSelector((s: RootState) => s.counter.value)
  const dispatch = useDispatch()
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Counter: {value}</Text>
      <View style={styles.row}>
        <Button title="-" onPress={() => dispatch(decrement())} />
        <Button title="+" onPress={() => dispatch(increment())} />
        <Button title="+10" onPress={() => dispatch(addBy(10))} />
      </View>
    </View>
  )
}

// Style type'larni to'g'rilash
const styles = {
  wrap: { gap: 16, alignItems: 'center' as const },
  title: { fontSize: 20, fontWeight: '600' as const },
  row: { flexDirection: 'row' as const, gap: 12 },
}
