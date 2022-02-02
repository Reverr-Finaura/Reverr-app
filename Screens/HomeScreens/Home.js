import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '../../Componants/HomeScreenComponants/Header';
import AppColors from '../../Constaint/AppColors';
import { AuthContext } from '../../Navigations/AuthProvider';
import CustomBtn from '../../Componants/CustomBtn';
import TopTabBar from '../../Componants/HomeScreenComponants/TopTabBar';
import ProgressScreen from './TopTabScreens/ProgressScreen';
import NewsScreen from './TopTabScreens/NewsScreen';
import ArticleScreen from './TopTabScreens/ArticleScreen';
import SavedScreen from './TopTabScreens/SavedScreen';

const Home = () => {

    const { user, logout } = React.useContext(AuthContext);
    const [Progress, setProgress] = useState(true);
    const [News, setNews] = useState(false);
    const [Article, setArticle] = useState(false);
    const [Saved, setSaved] = useState(false);
    return (
        <View style={styles.screen}>
            <Header
                onPress={() => { logout(); }}
            />
            <TopTabBar
                onPressProgress={() => {
                    setProgress(true);
                    setNews(false);
                    setArticle(false);
                    setSaved(false);
                }}
                onPressNews={() => {
                    setNews(true);
                    setProgress(false);
                    setArticle(false);
                    setSaved(false);
                    console.log("clecked")
                }}
                onPressArticle={() => {
                    setArticle(true);
                    setNews(false);
                    setProgress(false);
                    setSaved(false);
                }}
                onPressSaved={() => {
                    setSaved(true);
                    setNews(false);
                    setArticle(false);
                    setProgress(false);
                }}
                progress={Progress}
                news={News}
                article={Article}
                save={Saved}
            />
            <View style={{ flex: 1 }}>
                {Progress ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ProgressScreen />
                    </ScrollView>
                    :
                    News ?

                        <NewsScreen /> :
                        Article ? <ArticleScreen /> :
                            Saved ? <SavedScreen /> : null
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: AppColors.primarycolor
    }
});

export default Home;
