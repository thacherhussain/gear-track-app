import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ViewNotes from '../screens/ViewNotes'
import AddNotes from '../screens/AddNotes'
import Login from '../screens/Login'

const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes,
    },
    AddNotes: {
      screen: AddNotes,
    },
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'ViewNotes',
    headerMode: 'none',
    mode: 'modal',
  }
)

export default createAppContainer(StackNavigator)
