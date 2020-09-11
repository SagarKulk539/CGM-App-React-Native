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
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Context as AuthContext} from '../context/AuthContext';
import RadioButton from '../components/RadioButton';

const DismissKeyboard=({children})=>{
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
           {children}
        </TouchableWithoutFeedback>
    );

};

const SignupScreen=({navigation})=>{

    const {state,signup,clearErrorMessage}=useContext(AuthContext);

    const [data,setData]=useState({
        email:'',
        password:'',
        confirmPassword:'',
        name:'',
        maleCheck:true,
        femaleCheck:false,
        gender:'male',
        birthdate:new Date(),
        showDate:false,
        dateString:`${new Date().getDate()} / ${new Date().getMonth()+1} / ${new Date().getFullYear()}`,
        check_textInputChange:false,
        secureTextEntry:true,
        confirm_secureTextEntry:true,
        emailError:'',
        passError:'',
        confirmPassError:'',
        nameError:''
    });

    const nameValidator=()=>{
        if(data.name.length===0){
            setData({
                ...data,
                nameError:'Name Field cannot be Empty!'
            });
        }else{
            setData({
                ...data,
                nameError:''
            });
        }
    };

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

    const confirmPasswordValidator=()=>{
        if(data.confirmPassword.length===0){
            setData({
                ...data,
                confirmPassError:"Password Field cannot be Empty!"
            });
        }else if(data.confirmPassword.length<4){
            setData({
                ...data,
                confirmPassError:"Minimum Password Length : 4"
            });
        }else{
            setData({
                ...data,
                confirmPassError:''
            });
        }
    };

    const maleRadioHandler=()=>{
        if(data.femaleCheck){
            setData({
                ...data,
                femaleCheck:false,
                maleCheck:true,
                gender:'male'
            });
        }else{
          setData({
              ...data,
              maleCheck:true,
              gender:'male'
          });
        }
      };

      const femaleRadioHandler=()=>{
        if(data.maleCheck){
          setData({
              ...data,
              maleCheck:false,
              femaleCheck:true,
              gender:'female'
          });
        }else{
          setData({
              ...data,
             femaleCheck:true,
             gender:'female' 
          });
        }
      };

    const updateSecureTextEntry=()=>{
        setData({
            ...data,
            secureTextEntry:!data.secureTextEntry
        });
    };

    const updateConfirmSecureTextEntry=()=>{
        setData({
            ...data,
            confirm_secureTextEntry:!data.confirm_secureTextEntry
        });
    };

    const showDatePicker=()=>{
        setData({
            ...data,
            showDate:true
        });
    };

    const onChangeDate=(event,selectedDate)=>{
        const currentDate = selectedDate || data.birthdate;
        setData({
            ...data,
            showDate:false,
            birthdate:currentDate,
            dateString:`${currentDate.getDate()} / ${currentDate.getMonth()+1} / ${currentDate.getFullYear()}`
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
                            emailError:'',
                            confirmPassError:'',
                            nameError:''
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
                <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                        <Text style={styles.text_footer}>Name</Text>
                        <View style={styles.action}>
                            <Entypo name="user" size={20} color="#05375a" />
                            <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
                                <TextInput
                                    placeholder="Your Name"
                                    value={data.name}
                                    style={styles.textInput}
                                    onChangeText={(val)=>setData({...data,name:val})}
                                    onBlur={()=>nameValidator()}
                                    autoCapitalize="none"
                                />
                            </ScrollView>
                        </View>
                        {data.nameError?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{data.nameError}</Text>
                            </Animatable.View>
                        :null}
                        <Text style={[styles.text_footer,{marginTop:20}]}>Gender</Text>
                        <View style={styles.commonAction}>
                            <Fontisto name="male" size={18} color="#05375a"/>
                            <RadioButton onPress={maleRadioHandler} checked={data.maleCheck}/>
                            <View style={{marginRight:20}}></View>
                            <Fontisto name="female" size={18} color="#05375a"/>
                            <RadioButton onPress={femaleRadioHandler} checked={data.femaleCheck}/>
                        </View>
                        
                        <Text style={[styles.text_footer,{marginTop:20}]}>Birthdate</Text>
                        <View style={styles.commonAction}>
                            <Fontisto name="date" size={20} color="#05375a" style={{alignSelf:'center'}}/>
                            <TouchableOpacity style={styles.dateStyle} onPress={()=>showDatePicker()}>
                                <Text style={styles.text_footer}>{data.dateString}</Text>
                            </TouchableOpacity>
                            <View>
                                {data.showDate && (
                                    <DateTimePicker
                                        value={data.birthdate}
                                        mode="date"
                                        onChange={onChangeDate}
                                        maximumDate={new Date()}
                                    />
                                )}
                            </View>
                        </View>

                        <Text style={[styles.text_footer,{marginTop:20}]}>Email</Text>
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
                        <Text style={[styles.text_footer,{marginTop:20}]}>Password</Text>
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
                        <Text style={[styles.text_footer,{marginTop:20}]}>Confirm Password</Text>
                        <View style={styles.action}>
                            <Feather name="lock" size={20} color="#05375a" />
                            <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
                                <TextInput
                                    secureTextEntry={data.confirm_secureTextEntry?true:false}
                                    placeholder="Confirm Your Password"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val)=>setData({...data,confirmPassword:val})}
                                    onBlur={()=>confirmPasswordValidator()}
                                />
                            </ScrollView>                        
                            <TouchableOpacity onPress={()=>updateConfirmSecureTextEntry()}>
                                {data.confirm_secureTextEntry?
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
                        {data.confirmPassError?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{data.confirmPassError}</Text>
                            </Animatable.View>
                        :null}
                </ScrollView>
                <View style={styles.bottom}>
                    {state.errorMessage?
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.mainError}>{state.errorMessage}</Text>
                        </Animatable.View>
                    :null}
                    <TouchableOpacity style={{marginHorizontal:30}} onPress={()=>{
                        if(data.emailError==='' && data.passError==='' && data.confirmPassError==='' && data.email!=='' && data.password!=='' && data.confirmPassword!=='' && data.name!=='' && data.nameError===''){
                            signup({name:data.name,gender:data.gender,dateString:data.dateString,email:data.email,password:data.password,confirmPassword:data.confirmPassword});
                        }else{
                            alert("Fill Form Properly");
                        }
                    }}>
                        <View style={styles.button}>
                                <LinearGradient
                                    colors={['#43C9DA','#004da3']}
                                    style={styles.signIn}
                                >
                                    <Text style={styles.textSign}>Sign Up</Text>
                                </LinearGradient>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
                        <Text style={styles.signup}>Already Have an Account? Sign In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    );
};

SignupScreen.navigationOptions={
    title:'Register Now!',
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
        flex:1,
        paddingHorizontal: 20,
        marginVertical:20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    dateStyle:{
        marginLeft:10,
        borderWidth:2,
        borderColor:'#D8D8D8',
        borderRadius:5,
        padding:5
    },
    dateText:{
        color: '#05375a',
        fontSize: 14
    },
    commonAction:{
        flexDirection: 'row',
        marginTop: 10
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
        paddingLeft:30,
        marginBottom:10
    },
    button: {
        alignItems: 'center'
    },
    signIn: {
        width:'100%',
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
        justifyContent: 'flex-end',
        marginBottom: 15
    }
});

export default SignupScreen;