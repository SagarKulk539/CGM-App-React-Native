import React,{useEffect,useContext} from 'react';
import {View,StyleSheet,Dimensions,StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {Context as AuthContext} from '../context/AuthContext';

const ResolveAuthScreen=()=>{
    const {tryLocalSignin} = useContext(AuthContext);
    useEffect(()=>{
        setTimeout(tryLocalSignin,3500);
    },[]);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#004da3" barStyle="light-content"/>
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={500}
                    source={require('../../assets/img/pills.png')}
                    style={styles.logo}
                    resizeMode='stretch'
                />
            </View>
            <View style={styles.footer}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={500}
                    source={require('../../assets/img/samsung.png')}
                    style={styles.icons}
                    resizeMode='contain'
                />
                <Animatable.Image
                    animation="bounceIn"
                    duration={500}
                    source={require('../../assets/img/kle.png')}
                    style={styles.icons}
                    resizeMode='contain'
                />
            </View>
        </View>
    );
};

ResolveAuthScreen.navigationOptions=()=>{
    return {
        header:()=>null
    };
};

const height = Math.round(Dimensions.get('window').height);
const height_logo = height * 0.28;

const styles=StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#004da3'
    },
    header:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:1,
        flexDirection:'row', 
        justifyContent:'center',
        alignItems:'center' 
    },
    logo:{
        width:height_logo,
        height:height_logo
    },
    icons:{
        width:140,
        height:60,
    }
});

export default ResolveAuthScreen;