/*eslint-disable*/
import React,{useContext} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,StatusBar,FlatList} from 'react-native';

import Header from '../components/Header';
import {Context as AuthContext} from '../context/AuthContext';

const AccountScreen=({navigation})=>{
    const {signout} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#004da3" barStyle="light-content"/>
            <View style={styles.innerView}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>navigation.navigate('Profile')}
                >
                    <Text style={styles.textStyle}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{alert('Functionality Unavailable!')}}
                >
                    <Text style={styles.textStyle}>Set CGM Device</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={signout}
                >
                    <Text style={styles.textStyle}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

AccountScreen.navigationOptions={
    header:()=><Header title="Account"/>
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    innerView:{
        width:'100%',
        height:'100%',
        padding:10
    },
    button:{
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:5,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    textStyle:{
        fontSize:22
    }
});

export default AccountScreen;