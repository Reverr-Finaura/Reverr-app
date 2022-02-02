import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const ArticleScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>ArticleScreen
                ArticleScreen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: -90

    }
});

export default ArticleScreen;
