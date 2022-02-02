import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const NewsScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>NewsScreen
                NewsScreen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: -90

    }
});
export default NewsScreen;
