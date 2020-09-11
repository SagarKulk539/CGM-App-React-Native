import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import authApi from '../api/authApi';
import {navigate} from '../navigationRef';

const authReducer=(state,action)=>{
    switch(action.type){
        case 'add_error':
            return {...state,errorMessage:action.payload};
        case 'localsignin':
            return {...state,token:action.payload};
        case 'signin':
            return {...state,token:action.payload.token,name:action.payload.name,email:action.payload.email,gender:action.payload.gender,DOB:action.payload.birth,errorMessage:''};
        case 'clear_error':
            return {...state,errorMessage:''};
        case 'signout':
            return {...state,token:null,errorMessage:'',name:null,email:null,gender:null,DOB:null};
        case 'start-loading':
            return {...state,isLoading:true};
        case 'stop-loading':
            return {...state,isLoading:false};
        default:
            return state;
    }
};

const tryLocalSignin=dispatch=>async ()=>{
    const token=await AsyncStorage.getItem('token');
    const email=await AsyncStorage.getItem('email');
    const name=await AsyncStorage.getItem('name');
    const birth=await AsyncStorage.getItem('DOB');
    const gender=await AsyncStorage.getItem('gender');
    if(token){
        dispatch({type:'signin',payload:{token,name,email,birth,gender}});
        navigate('mainFlow');
    }else{
        navigate('loginFlow');
    }
};

const clearErrorMessage=(dispatch)=>()=>{
    dispatch({type:'clear_error'});
};

const signup=(dispatch)=> async ({name,gender,dateString,email,password,confirmPassword})=>{
    if(password!==confirmPassword){
        dispatch({type:'add_error',payload:"Passwords Don't match"});
    }else{
        try{
            dispatch({type:'start-loading'});
            const birth=dateString.replace(/\s+/g,'');
            const response=await authApi.post('/signup',{name,gender,birth,email,password,confirmPassword});
            await AsyncStorage.setItem('token',response.data.token);
            await AsyncStorage.setItem('email',email);
            await AsyncStorage.setItem('name',name);
            await AsyncStorage.setItem('DOB',birth);
            await AsyncStorage.setItem('gender',gender);
            dispatch({type:'signin',payload:{token:response.data.token,email,name,birth,gender}});
            dispatch({type:'stop-loading'});
            navigate('mainFlow');
        }catch(err){
            dispatch({type:'stop-loading'});
            const str1=err.response.data;
            if(str1.includes('duplicate')){
                dispatch({type:'add_error',payload:'Email Already in Use!'});
            }else{
                dispatch({type:'add_error',payload:'Something went wrong with Sign Up'});
            }
            
        }
    }
};

const signin=(dispatch)=> async ({email,password})=>{
    try{
        dispatch({type:'start-loading'});
        const response=await authApi.post('/signin',{email,password});
        await AsyncStorage.setItem('token',response.data.token);
        const userDetails=await authApi({
            method: 'get',
            url:'/getUser',
            headers: {Authorization: 'Bearer ' + response.data.token}
        });
        const name = userDetails.data.name;
        const gender = userDetails.data.gender;
        const birth = userDetails.data.birthdate;
        await AsyncStorage.setItem('email',email);
        await AsyncStorage.setItem('name',name);
        await AsyncStorage.setItem('DOB',birth);
        await AsyncStorage.setItem('gender',gender);
        dispatch({type:'signin',payload:{token:response.data.token,email,name,gender,birth}});
        dispatch({type:'stop-loading'});
        navigate('mainFlow');
    }catch(err){
        dispatch({type:'stop-loading'});
        dispatch({type:'add_error',payload:'Something went wrong with Sign In'});
    }
};

const signout=(dispatch)=>async ()=>{
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('DOB');
    await AsyncStorage.removeItem('gender');
    dispatch({type:'signout'});
    navigate('loginFlow');
};

export const {Provider,Context}=createDataContext(
    authReducer,
    {signup,signin,signout,clearErrorMessage,tryLocalSignin},
    {token:null,errorMessage:'',isLoading:false,email:null,name:null,DOB:null,gender:null}
);
