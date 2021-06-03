import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ViewNotes from '../screens/ViewNotes'
import AddNotes from '../screens/AddNotes'
import Login from '../screens/Login'
import ForgotPassword from '../screens/ForgotPassword'

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
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    mode: 'modal',
  }
)

export default createAppContainer(StackNavigator)
