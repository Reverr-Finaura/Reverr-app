import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useContext} from 'react';
import AppColors from '../../Constaint/AppColors';
import {useNavigation} from '@react-navigation/native';
import Backbtn from '../../Componants/Backbtn';
import InputField from '../../Componants/InputField';
import CustomBtn from '../../Componants/CustomBtn';
import ResetPassword from '../ForgotPasswordScreens/ResetPassword';
import {UserContext} from '../../App';
import firestore from '@react-native-firebase/firestore';

const ChangePassword = () => {
  const {state, dispatch} = useContext(UserContext);
  const [isSecure1, setisSecure1] = useState(true);
  const [isSecure2, setisSecure2] = useState(true);
  const [password, setPassword] = useState('');
  const [confermpassword, setConfermPassword] = useState('');
  const [passerror, setpasserror] = useState(false);
  const [passerror2, setpasserror2] = useState(false);
  const navigation = useNavigation();

  const changePassword = () => {
    if (!password) {
      setpasserror(true);
    } else {
      if (!confermpassword) {
        setpasserror2(true);
      } else {
        if (password != confermpassword) {
          alert('Password does not matched');
        } else {
          firestore()
            .collection('Users')
            .doc(state.email)
            .update({
              password: password,
            })
            .then(() => {
              setPassword('');
              setConfermPassword('');
              alert('Password Changed');
            });
        }
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Backbtn
            IconSize={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headerTitle}> Change Password</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: '2%',
            height: '100%',
          }}>
          <InputField
            iconName="lock"
            size={35}
            value={password}
            error={passerror}
            secureTextEntry={isSecure1}
            showIcon={isSecure1 ? 'eye-slash' : 'eye'}
            showIconolor={AppColors.infoFonts}
            showIconsize={25}
            Eyelick={() => {
              setisSecure1(prev => !prev);
            }}
            placeholder="Enter your password"
            onChangeText={p => {
              setPassword(p);
              if (p != '') {
                setpasserror(false);
              }
            }}
            Title="Password"
          />
          <InputField
            iconName="lock"
            size={35}
            error={passerror2}
            value={confermpassword}
            secureTextEntry={isSecure2}
            showIcon={isSecure2 ? 'eye-slash' : 'eye'}
            showIconolor={AppColors.infoFonts}
            showIconsize={25}
            Eyelick={() => {
              setisSecure2(prev => !prev);
            }}
            placeholder="Conferm- password"
            onChangeText={p => {
              setConfermPassword(p);
              if (p != '') {
                setpasserror2(false);
              }
            }}
            Title="Conferm- password"
          />
          <CustomBtn
            Title="Reset"
            onPress={() => {
              changePassword();
            }}
            style={{marginTop: 20}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  headerTitle: {
    color: AppColors.FontsColor,
    marginStart: '14%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});
export default ChangePassword;
