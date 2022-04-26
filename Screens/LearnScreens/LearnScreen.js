import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HeaderLayout from '../HomeScreens/HeaderLayout';
import SwipeCard from '../../Componants/SwipeCard';
import {courseData} from '../../dummy-data/courseData';
import AppColors from '../../Constaint/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import App from '../../App';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const LearnScreen = () => {
  return (
    <HeaderLayout>
      <ScrollView>
        <SwipeCard
          data={courseData}
          overlay={styles.overlay}
          title={styles.title}
          description={styles.desc}
        />
        <View style={styles.Btn}>
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              paddingHorizontal: '15%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Bold',
                fontSize: 18,
              }}>
              Take today’s quiz
            </Text>
            <Text
              style={{
                color: AppColors.CardColor,
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
              }}>
              Or continue taking one
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: AppColors.ActiveColor,
              height: '100%',
              width: '20%',
              alignItems: 'center',
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              justifyContent: 'center',
            }}>
            <Icon name="angle-right" size={55} color={AppColors.FontsColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.alertSection}>
          <Text
            style={{color: AppColors.FontsColor, fontFamily: 'Poppins-Bold'}}>
            Don’t miss out on new courses
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.ActiveColor,
              paddingHorizontal: '12%',
              marginTop: '3%',
              borderRadius: 80,
              paddingVertical: '2%',
            }}>
            <Text
              style={{
                color: AppColors.FontsColor,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Enable notifications
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: AppColors.BtnClr,
              marginTop: '3%',
              textDecorationLine: 'underline',
            }}>
            Not Now
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: '4%',
            paddingVertical: '8%',
            paddingTop: '3%',
          }}>
          <Text
            style={{color: AppColors.FontsColor, fontFamily: 'Poppins-Bold'}}>
            Popular now{' '}
          </Text>
          <SwipeCard
            data={courseData}
            style={styles.popularCard}
            overlay={{top: 30}}
          />
        </View>
      </ScrollView>
    </HeaderLayout>
  );
};
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    top: Height > 684 ? 60 : 90,
    height: '100%',
  },
  title: {
    fontSize: 20,
  },
  Btn: {
    width: '85%',
    marginTop: '3%',
    justifyContent: 'space-between',
    height: '10%',
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.FontsColor,
  },
  alertSection: {
    alignItems: 'center',
    borderTopColor: AppColors.BtnClr,
    borderBottomColor: AppColors.BtnClr,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    marginTop: '5%',
    paddingVertical: '7%',
    marginHorizontal: '4%',
  },
  popularCard: {
    width: Width / 2.1,
    height: Height > 684 ? Height / 4 : Height / 5,
  },
});
export default LearnScreen;
