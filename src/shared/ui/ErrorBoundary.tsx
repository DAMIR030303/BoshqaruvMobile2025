import React from 'react'
import { View, Text } from 'react-native'

type State = { hasError: boolean; message?: string }
export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: String(error) }
  }
  componentDidCatch(error: unknown) { console.error('ErrorBoundary', error) }
  render() {
    if (this.state.hasError) {
      return <View><Text>Xatolik: {this.state.message}</Text></View>
    }
    return this.props.children
  }
}
