import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import AppColors from '../../../Constaint/AppColors';
import {useNavigation} from '@react-navigation/native';
import {smallString} from '../../../utils/helper';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const NewsCard = props => {
  const navigation = useNavigation();
  const [clmn, setclmn] = useState(2);
  return (
    props.data && (
      <View style={{height: '100%', paddingBottom: 50}}>
        <FlatList
          data={props.data}
          nestedScrollEnabled={true}
          numColumns={clmn}
          renderItem={({item}) => {
            if (item.image) {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.NewsContainer}
                  onPress={() => {
                    navigation.navigate('NewsDetails', {
                      articalData: item,
                    });
                  }}>
                  <ImageBackground
                    style={{flex: 1}}
                    source={{uri: item.image.thumbnail.contentUrl}}>
                    <View style={styles.title}>
                      <Text
                        style={{
                          color: AppColors.FontsColor,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {smallString(item.name, 60)}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    )
  );
};
const styles = StyleSheet.create({
  NewsContainer: {
    width: '47%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  title: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '40%',
    paddingVertical: 5,
    alignItems: 'center',
    top: Height > 684 ? 135 : 130,
  },
});
export default NewsCard;
