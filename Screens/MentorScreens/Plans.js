import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import HeaderLayout from '../HomeScreens/HeaderLayout';
import Backbtn from '../../Componants/Backbtn';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../Constaint/AppColors';
import {paymentType} from '../../dummy-data/paymentType';
import LinearGradient from 'react-native-linear-gradient';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../../App';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Plans = props => {
  const navigation = useNavigation();
  const mentor = props.route.params.mentor;
  const mentorOrders = props.route.params.orders;
  const mentorClients = props.route.params.clients;
  const plans = props.route.params.plans;
  const [column, setColumn] = useState(2);
  const {state, dispatch} = useContext(UserContext);

  const payment = plan => {
    if (state.mentors.includes(mentor)) {
      alert('go to appoinment ');
    } else {
      // console.log(plan);
      var oId = makeid(12);
      // console.log("oid: ",oId[0]);
      const order = {
        orderId: oId,
        orderCurrency: 'INR',
        orderAmount: plan,
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': '21235619dae90a7c71fa82b24c653212',
          'x-client-secret': 'b3fcd2aee2a93a9d7efedcd88936046a43506c5c',
        },
        body: JSON.stringify(order),
      };
      fetch('https://api.cashfree.com/api/v2/cftoken/order', requestOptions)
        .then(response => response.json())
        .then(data => {
          order.token = data.cftoken;
          cashfree(order);
        });
    }
  };

  const cashfree = order => {
    var env = 'TEST';
    var map = {
      orderId: order.orderId,
      orderAmount: order.orderAmount,
      appId: '21235619dae90a7c71fa82b24c653212',
      tokenData: order.token,
      orderCurrency: order.orderCurrency,
      orderNote: ' ',
      notifyUrl: 'https://test.gocashfree.com/notify',
      customerName: state.name,
      customerPhone: state.mobile,
      customerEmail: state.email,
    };
    RNPgReactNativeSDK.startPaymentWEB(map, 'PROD', result => {
      var payment = {
        paymentMode: '',
        orderId: '',
        txTime: '',
        referenceId: '',
        txMsg: '',
        signature: '',
        orderAmount: '',
        txStatus: '',
        vendor: mentor,
        user: state.email,
      };

      var obj = JSON.parse(result, function (key, value) {
        if (key == 'paymentMode') payment.paymentMode = value;
        else if (key == 'orderId') payment.orderId = value;
        else if (key == 'txTime') payment.txTime = value;
        else if (key == 'referenceId') payment.referenceId = value;
        else if (key == 'txMsg') payment.txMsg = value;
        else if (key == 'signature') payment.signature = value;
        else if (key == 'orderAmount') payment.orderAmount = value;
        else if (key == 'txStatus') payment.txStatus = value;
      });
      handleResponse(payment);
    });
  };

  const handleResponse = res => {
    var id;
    firestore()
      .collection('Payments')
      .add(res)
      .then(data => {
        // console.log("added successfully",data._documentPath._parts[1])
        id = data._documentPath._parts[1];
        updateUser(id, res);
      });
  };

  const updateUser = (id, res) => {
    order = firestore().collection('Payments').doc(id);
    dispatch({type: 'NEWPAYMENT', payload: order});
    firestore()
      .collection('Users')
      .doc(state.email)
      .update({orders: [...state.orders, order]});
    firestore()
      .collection('Users')
      .doc(mentor)
      .update({orders: [...mentorOrders, order]});
    if (res.txStatus == 'SUCCESS') {
      firestore()
        .collection('Users')
        .doc(state.email)
        .update({mentors: [...state.mentors, mentor]});
      firestore()
        .collection('Users')
        .doc(mentor)
        .update({clients: [...mentorClients, state.email]});
      
      //create msg path here;
    }
  };

  return (
    <HeaderLayout>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Backbtn
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerText}>Plans</Text>
      </View>
      <View style={styles.screen}>
        <FlatList
          data={paymentType}
          numColumns={column}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('PlanDetails', {PlanType: item.name});
                payment(plans[index]);
                // const res = {"paymentMode":"UPI","orderId":"yPrUaDcq8snr","txTime":"2022-05-18 18:12:43","referenceId":"961363226","type":"CashFreeResponse","txMsg":"00::Transaction Success","signature":"nRtL0g23HVsQIWBbzvnbuiUu8As13v4YxQmRk+23L0A=","orderAmount":"1.00","txStatus":"SUCCESS"} ;
                // handleResponse(res);
              }}>
              <LinearGradient
                colors={[AppColors.primarycolor, '#012437']}
                start={{x: 0.5, y: 1.3}}
                end={{x: 1, y: 0.5}}
                style={styles.Card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.name}>₹{plans[index]}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
    </HeaderLayout>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
  },
  headerText: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginStart: '4%',
  },
  Card: {
    marginHorizontal: 8,
    alignItems: 'center',
    borderRadius: 9,
    justifyContent: 'center',
    marginVertical: 5,
    height: Height / 5,
    width: Width / 2.5,
  },
  name: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-SemiBold',
  },
});
export default Plans;
