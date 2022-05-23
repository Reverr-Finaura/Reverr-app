import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../MentorScreens/Home';
import Dashboard from '../MentorScreens/Dashboard';
import Calander from '../MentorScreens/Calendar/Calander';
import Profile from '../MentorScreens/Profile';
import Settings from '../Screens/ProfileScreens/Settings';
import EditProfile from '../Screens/ProfileScreens/EditProfile';
import Notifications from '../MentorScreens/Notifications';
import ChatList from '../Screens/ChatScreens/ChatList';
import ChatBox from '../Screens/ChatScreens/ChatBox';
import ViewIndividuaProfile from '../Screens/ProfileScreens/ViewProfile';
import {VideoCall} from '../Screens/videocall/videoCall';
import EditCalendar from '../MentorScreens/Calendar/EditCalendar';

const Stack = createNativeStackNavigator();

export const MentorHomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="notification"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="videoCall"
        component={VideoCall}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatBox"
        component={ChatBox}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewIndividual"
        component={ViewIndividuaProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MentorProfile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export const MentorDashBoardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashBoard"
        component={Dashboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export const MentorCalanderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calander"
        component={Calander}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="editCalendar"
        component={EditCalendar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export const MentorProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MentorProfile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
