import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppColors from '../../../Constaint/AppColors';
import { NewsData } from '../../../dummy-data/Dummy_News';
import { ScrollView } from 'react-native-gesture-handler';


const NewsScreen = () => {

    const [clmn, setclmn] = useState(2);
    return (
        <View style={styles.screen}>
            <View>
                <Text style={styles.heading}>Trending</Text>
            </View>
            <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                <FlatList
                    data={NewsData}
                    horizontal
                    pagingEnabled
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.6} style={styles.container}>
                            <ImageBackground style={{ flex: 1, }} source={{ uri: item.image }} >
                                <View style={styles.title}>
                                    <Text style={{
                                        color: AppColors.FontsColor,
                                        fontFamily: "Poppins-Regular",
                                    }}>{item.title}</Text>
                                </View>

                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={styles.heading}>News</Text>
                    <TouchableOpacity style={{ marginStart: 210 }}>
                        <Text style={[styles.heading, { fontSize: 10 }]}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={NewsData}
                    nestedScrollEnabled={true}
                    numColumns={clmn}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.6} style={styles.NewsContainer}>
                            <ImageBackground style={{ flex: 1, }} source={{ uri: item.image }} >
                                <View style={styles.title}>
                                    <Text style={{
                                        color: AppColors.FontsColor,
                                        fontFamily: "Poppins-Regular",
                                    }}>{item.title}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                />
            </View>


        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    heading: {
        color: AppColors.FontsColor,
        fontFamily: "Poppins-Regular",
        paddingStart: 22,
        paddingTop: 5,
        fontSize: 16

    },
    NewsContainer: {
        width: "47%",
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 5,
        marginVertical: 5
    },
    container: {
        marginStart: 10,
        marginEnd: 10,
        width: 340,
        height: 200,
        overflow: 'hidden',
        borderRadius: 20
    },
    title: {
        position: 'absolute',
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "30%",
        paddingVertical: 5,
        alignItems: 'center',
        top: 145
    },
});
export default NewsScreen;
