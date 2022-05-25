import {View, StyleSheet} from 'react-native';
import React, {useState, useContext} from 'react';
import Header from '../../Componants/HomeScreenComponants/Header';
import AppColors from '../../Constaint/AppColors';
import {useNavigation} from '@react-navigation/native';
import CalanderScreen from '../CalanderScreen/CalanderScreen';
import ModelView from '../../Componants/ModelView';
import {UserContext} from '../../App';

const HeaderLayout = props => {
  const {state, dispatch} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigation();
  //console.log(state.image);
  return (
    <View style={styles.screen}>
      <Header
        onPressDp={() => {
          navigation.navigate(
            state && state.userType === 'Mentor'
              ? 'MentorProfile'
              : 'Individual',
          );
        }}
        onPressCalander={() => {
          setIsOpen(true);
        }}
        onPressNoti={() => {
          navigation.navigate('notification');
        }}
        onPressChat={() => {
          navigation.navigate('Chat');
        }}
        DpUrl={state && state.image}
      />
      <ModelView
        ShowModal={isOpen}
        onCloseModal={() => {
          setIsOpen(false);
        }}>
        <CalanderScreen
          onClose={() => {
            setIsOpen(false);
          }}
          setModel={setIsOpen}
        />
      </ModelView>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
});

export default HeaderLayout;
