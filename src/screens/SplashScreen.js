import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#004da3" barStyle="light-content"/>
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={require('../../assets/img/cardio.png')}
                    style={styles.logo}
                    resizeMode='stretch'
                />
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.title}>Stay Healthy, Stay Calm</Text>
                <Text style={styles.text}>Sign in with Account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
                        <LinearGradient
                            colors={['#43C9DA','#004da3']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons name="navigate-next" size={20} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

SplashScreen.navigationOptions=()=>{
    return {
        header:()=>null
    };
};

const height = Math.round(Dimensions.get('window').height);
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#004da3'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 26,
      fontFamily:'Roboto-Medium'
  },
  text: {
      color: 'grey',
      marginTop:10,
      fontSize:16,
      fontFamily:'Roboto-Regular'
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 60,
  },
  signIn: {
      width: 180,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontSize:20,
      fontFamily:'Roboto-Medium'
  }
});

export default SplashScreen;