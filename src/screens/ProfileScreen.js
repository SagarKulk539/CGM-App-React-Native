/*eslint-disable*/
import React,{useContext} from 'react';
import {View,StyleSheet,StatusBar,Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/Header';
import {Context as AuthContext} from '../context/AuthContext';

const ProfileScreen=()=>{
    const {state}=useContext(AuthContext);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#004da3" barStyle="light-content"/>
            <View style={styles.innerView}>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                    <Text style={styles.innerText}>Name</Text>
                    <MaterialCommunityIcons
                        name="face-recognition"
                        size={24}
                        color="black"
                    />
                </View>
                <Text style={styles.text2}>{state.name}</Text>
                
                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                    <Text style={styles.innerText}>Email</Text>
                    <Feather
                        name="mail"
                        size={24}
                        color="black"
                    />
                </View>
                <Text style={{paddingBottom:20,fontSize:20,borderBottomWidth:2,borderBottomColor:'#D8D8D8',}}>{state.email}</Text>

                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                    <Text style={styles.innerText}>Birthdate</Text>
                    <FontAwesome
                        name="birthday-cake"
                        size={24}
                        color="black"
                    />
                </View>
                <Text style={styles.text2}>{state.DOB}</Text>

                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                    <Text style={styles.innerText}>Gender</Text>
                    {state.gender==='male'
                    ?
                        <FontAwesome
                            name="male"
                            size={24}
                            color="black"
                        />
                    :
                        <FontAwesome
                            name="female"
                            size={24}
                            color="black"
                        />
                    }
                </View>
                <Text style={styles.text2}>{state.gender}</Text>
            </View>
        </View>
    );
};

ProfileScreen.navigationOptions={
    header:()=><Header title="Profile"/>
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    innerView:{
        width:'100%',
        height:'100%',
        padding:15,
    },
    innerText:{
        color:'#05375a',
        fontSize:28,
        fontWeight:'600',
        marginBottom:5,
        marginRight:15
    },
    text2:{
        textTransform:'capitalize',
        paddingBottom:20,
        fontSize:20,
        borderBottomWidth:2,
        borderBottomColor:'#D8D8D8',
    }
});

export default ProfileScreen;