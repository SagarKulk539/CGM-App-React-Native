import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header=({title})=>{
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <FontAwesome name="heartbeat" size={22} color="white" style={{alignSelf:'center'}}/>
        </View>
    );
};

const styles=StyleSheet.create({
    header:{
        height:50,
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#004da3'
    },
    headerText:{
        fontWeight:'bold',
        fontSize:24,
        color:'#fff',
        marginRight:5,
        marginLeft:10
    }
});

export default Header;