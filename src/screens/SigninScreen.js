import React, { useState,useContext } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Platform,
    TextInput,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import {NavigationEvents} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import {Context as AuthContext} from '../context/AuthContext';

const DismissKeyboard=({children})=>{
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
           {children}
        </TouchableWithoutFeedback>
    );

};

const SigninScreen=({navigation})=>{

    const {state,signin,clearErrorMessage}=useContext(AuthContext);

    const [data,setData]=useState({
        email:'',
        password:'',
        check_textInputChange:false,
        secureTextEntry:true,
        emailError:'',
        passError:''
    });

    const emailValidator=()=>{
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(data.email.length===0){
            setData({
                ...data,
                emailError:"Email Field cannot be Empty!",
                check_textInputChange:false
            });
        }else if(reg.test(data.email)===false){
            setData({
                ...data,
                emailError:"Invalid Email Format!",
                check_textInputChange:false
            });
        }else{
            setData({
                ...data,
                emailError:'',
                check_textInputChange:true
            });
        }
    };

    const passwordValidator=()=>{
        if(data.password.length===0){
            setData({
                ...data,
                passError:"Password Field cannot be Empty!"
            });
        }else if(data.password.length<4){
            setData({
                ...data,
                passError:"Minimum Password Length : 4"
            });
        }else{
            setData({
                ...data,
                passError:''
            });
        }
    };

    const updateSecureTextEntry=()=>{
        setData({
            ...data,
            secureTextEntry:!data.secureTextEntry
        });
    };

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : undefined}
                style={styles.container}
            >
                <NavigationEvents
                    onWillFocus={()=>{
                        clearErrorMessage();
                        setData({
                            ...data,
                            passError:'',
                            emailError:''
                        });
                    }}
                />
                <StatusBar backgroundColor="#004da3" barStyle="light-content"/>
                <Spinner
                    visible={state.isLoading}
                    color="white"
                    cancelable={false}
                    size="large"
                />
                <View style={styles.form}>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <Entypo name="user" size={20} color="#05375a" />
                        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
                            <TextInput
                                placeholder="Your Email"
                                value={data.email}
                                style={styles.textInput}
                                onChangeText={(val)=>setData({...data,email:val})}
                                onBlur={()=>emailValidator()}
                                autoCapitalize="none"
                            />
                        </ScrollView>
                        {data.check_textInputChange?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather 
                                name="check-circle" 
                                size={20} 
                                color="green" 
                            />
                        </Animatable.View>
                        :null}
                    </View>
                    {data.emailError?
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>{data.emailError}</Text>
                        </Animatable.View>
                    :null}
                    <Text style={[styles.text_footer,{marginTop:35}]}>Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" size={20} color="#05375a" />
                        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
                            <TextInput
                                secureTextEntry={data.secureTextEntry?true:false}
                                placeholder="Your Password"
                                value={data.password}
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val)=>setData({...data,password:val})}
                                onBlur={()=>passwordValidator()}
                            />
                        </ScrollView>
                        <TouchableOpacity onPress={()=>updateSecureTextEntry()}>
                            {data.secureTextEntry?
                            <Feather 
                                name="eye-off" 
                                size={20} 
                                color="grey" 
                            />:
                            <Feather 
                                name="eye" 
                                size={20} 
                                color="grey" 
                            />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.passError?
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>{data.passError}</Text>
                        </Animatable.View>
                    :null}
                    {state.errorMessage?
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.mainError}>{state.errorMessage}</Text>
                        </Animatable.View>
                    :null}
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={{marginHorizontal:30}} onPress={()=>{
                            if(data.emailError==='' && data.passError==='' && data.email!=='' && data.password!==''){
                                signin({email:data.email,password:data.password});
                            }else{
                                alert("Fill Form Properly");
                            }
                        }}>
                        <View style={styles.button}>
                                <LinearGradient
                                    colors={['#43C9DA','#004da3']}
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>Sign In</Text>
                                </LinearGradient>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                        <Text style={styles.signup}>Don't Have an Account? Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    );
};

SigninScreen.navigationOptions={
    title:'Welcome!',
    headerStyle:{
        backgroundColor: '#004da3'
    },
    headerLeft:()=>null,
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:24
    }
};

const styles=StyleSheet.create({
    container: {
        flex: 1, 
    },
    form: {
        marginTop:100,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        paddingTop:10
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginTop:4
    },
    mainError:{
        fontSize:16,
        color:'red',
        marginTop:15
    },
    button: {
        alignItems: 'center'
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"#fff"
    },
    signup:{
        color: "#004da3",
        marginTop:10,
        fontSize:15,
        alignSelf:"center"
    },
    bottom:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20
    }
});

export default SigninScreen;
