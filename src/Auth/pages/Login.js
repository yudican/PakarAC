import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SocialIcon} from 'react-native-elements';
// import {db} from '../../database/config'
import Logo from '../components/Logo';
import {AuthContext} from '../Navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '291760450111-hq5je4vpfn6q2mnilg28jpjoespra0or.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {email, id} = userInfo.user;
      login(email, id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.containerlogin}>
        <TextInput
          style={styles.inputBox}
          labelValue={email}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Masukkan Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          // onSubmitEditing={()=> this.pswd.focus()}
          onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <TextInput
          style={styles.inputBox}
          labelValue={password}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Masukkan Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          // ref={(input) => this.pswd = input}
          onChangeText={(userPassword) => setPassword(userPassword)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => login(email, password)}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _signIn()}>
          <SocialIcon
            type="google"
            iconColor="white"
            style={{backgroundColor: '#ED3B3B', width: 300}}
            button
            title="Masuk dengan Google"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextCont}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.signupButton}>
            <Text style={styles.signupText}>Lupa kata sandi?</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupButton}> Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginScreen;

// export default class Login extends Component {
//   constructor(props){
//     super(props)
//     this.state={
//       email : '',
//       password : '',
//     }
//   }
// 	signup=()=> {
//     // Actions.signup()
//     this.props.navigation.navigate('SignUp')
// 	}

//   handleLogin=()=>{
//     db.app.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
//         .then(user =>{
//             this.props.navigation.navigate('Home')
//         }).catch(error=>alert('Login Gagal, Penyedia Jasa tidak ditemukan')
//     )
//   }

// 	render() {
// 		return(
// 			<View style={styles.container}>
// 				<Logo/>
//         <View style={styles.containerlogin}>
//           <TextInput style={styles.inputBox}
//               underlineColorAndroid='rgba(0,0,0,0)'
//               placeholder="Masukkan Email"
//               placeholderTextColor = "#ffffff"
//               selectionColor="#fff"
//               keyboardType="email-address"
//               onSubmitEditing={()=> this.password.focus()}
//               defaultValue = {this.state.email}
//               onChangeText={(value)=>this.setState({email:value})}
//               />
//           <TextInput style={styles.inputBox}
//               underlineColorAndroid='rgba(0,0,0,0)'
//               placeholder="Masukkan Password"
//               secureTextEntry={true}
//               placeholderTextColor = "#ffffff"
//               ref={(input) => this.password = input}
//               defaultValue = {this.state.password}
//               onChangeText={(value)=>this.setState({password:value})}
//               />

//            <TouchableOpacity style={styles.button} onPress={this.handleLogin.bind(this)}>
//              <Text style={styles.buttonText}>Masuk</Text>
//            </TouchableOpacity>
//             <TouchableOpacity>
//              <SocialIcon type="google" iconColor="white" style={{backgroundColor:'#ED3B3B',width:300}} button title="Masuk dengan Google"/>
//            </TouchableOpacity>

//   		</View>
// 				<View style={styles.signupTextCont}>
// 					<Text style={styles.signupText}>Belum punya akun?</Text>
// 					<TouchableOpacity onPress={this.signup.bind(this)}><Text style={styles.signupButton}> Daftar</Text></TouchableOpacity>
// 				</View>
// 			</View>
// 			)
// 	}
// }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101010',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#F18F37',
    fontSize: 16,
    fontWeight: '500',
  },
  containerlogin: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#5D89F7',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
