import { createAppContainer } from 'react-navigation'
import React from 'react'
import AppStack from './src/Navigation/StackNavigation'

export default function App(props) {
  const AppContainer = createAppContainer(AppStack)

  return (<AppContainer />)
}

