import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import Backbtn from '../../../Componants/Backbtn';
import AppColors from '../../../Constaint/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ArticalData } from '../../../dummy-data/Artical-Data';

const ArticalDetailsScreen = (props) => {

    console.log(ArticalData.find((item) => {
        item == "Space"
    }));
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Backbtn onPress={props.BackBotton} />
                <Text style={styles.heading}>Article</Text>
            </View>
            <View style={styles.DetailsContainer}>
                <FlatList
                    data={ArticalData}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{ }</Text>

                        </View>
                    )}
                />
            </View>
            <View style={styles.BtnContainer}>
                <TouchableOpacity style={styles.PreviousBtn}>
                    <Icon name='arrow-left' size={20} color={AppColors.FontsColor} />
                    <Text style={{ marginStart: 20, color: AppColors.FontsColor, fontFamily: "Poppins-Regular" }}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.NextBtn}>

                    <Icon name='arrow-right' size={20} color={AppColors.FontsColor} />
                    <Text style={{ marginEnd: 20, color: AppColors.FontsColor, fontFamily: "Poppins-Regular" }}>Next</Text>

                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20
    },
    heading: {
        color: AppColors.FontsColor,
        fontFamily: "Poppins-Bold",
        fontSize: 24,
        marginStart: 85,
    },
    DetailsContainer: {
        alignItems: 'center'
    },
    subHeading: {
        color: AppColors.FontsColor,
        fontFamily: "Poppins-Regular",
        fontSize: 20,
    },
    details: {
        backgroundColor: AppColors.BtnClr,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: AppColors.FontsColor,
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        lineHeight: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 40
    },
    PreviousBtn: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 50,
        marginEnd: 20,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
        backgroundColor: AppColors.BtnClr
    },
    BtnContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    NextBtn: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 10,
        height: 50,
        width: 150,
        marginEnd: 20,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: AppColors.BtnClr
    }
})

export default ArticalDetailsScreen;
