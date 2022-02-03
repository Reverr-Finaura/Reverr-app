import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import AppColors from '../../../Constaint/AppColors';

const ArticalList = (props) => {
    return (
        <View>
            <FlatList
                data={props.data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={props.onPress}>
                        <View style={styles.line}></View>
                        <View style={styles.title}>
                            <Text style={styles.text}>{item.title}</Text>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Ionic name='heart' size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.description}>
                            <Text style={styles.desc}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}

            />
        </View>
    );
};
const styles = StyleSheet.create({

    line: {
        backgroundColor: AppColors.infoFonts,
        width: '100%',
        height: 1
    },
    title: {
        paddingTop: 10,
        paddingStart: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    text: {
        color: AppColors.FontsColor,
        fontFamily: "Poppins-Bold"
    },
    description: {
        paddingBottom: 20,
        paddingStart: 5

    },
    desc: {
        color: AppColors.FontsColor,
        fontFamily: "Poppins-Regular"
    }

})

export default ArticalList;
