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
import Logo from '../components/Logo';
import {AuthContext} from '../Navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();

  const {register, registerGoogle, setUser} = useContext(AuthContext);

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
      registerGoogle(userInfo.user);
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
      <View style={styles.containersignup}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Masukkan Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          // ref={(input) => this.inputemail = input}
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Masukkan Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          // ref={(input) => this.pswd = input}
          // onSubmitEditing={()=> this.rePassword.focus()}
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Masukkan Ulang Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          // ref={(input) => this.rePassword = input}
          labelValue={rePassword}
          onChangeText={(userPassword) => setRePassword(userPassword)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => register(email, password, rePassword, navigation)}>
          <Text style={styles.buttonText}>Daftar</Text>
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
        <Text style={styles.signupText}>Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButton}> Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignupScreen;

// export default class Signup extends Component{
//   constructor(props){
//     super(props)
//     this.state={
//       email : '',
//       password : '',
//       rePassword :''
//     }
//   }

//   postNewUser=()=>{
//     if(this.state.email==''||this.state.password=='')
//     {
//      alert('Form daftar belum lengkap')
//     }
//     else if(this.state.password!=this.state.rePassword)
//     {
//       alert('Pengulangan password tidak sesuai')
//     }
//     else{
//       // const PenyediaJasa = {
//       //   email : this.state.email
//       // }
//       db.app.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
//             .then((res)=>{
//                 db.app.database().ref('Pengguna/Penyedia_Jasa/' + res.user.uid).set({
//                   email : this.state.email
//                 })
//                 // .push(PenyediaJasa)
//                 .then((data)=>{
//                     Alert.alert("Selamat","Anda berhasil mendaftar")
//                 })
//                 this.props.navigation.navigate('SignUpDetail')
//             }).catch(error=>alert('Tidak Valid, silahkan cek kembali email anda')
//             )
//     }

//   }

//   componentDidMount(){
//     this.inputemail.focus()
//   }
// 	render() {
// 		return(
// 			<View style={styles.container}>
// 				<Logo/>
// 				<View style={styles.containersignup}>
//           <TextInput style={styles.inputBox}
//               underlineColorAndroid='rgba(0,0,0,0)'
//               placeholder="Masukkan Email"
//               placeholderTextColor = "#ffffff"
//               selectionColor="#fff"
//               keyboardType="email-address"
//               ref={(input) => this.inputemail = input}
//               defaultValue = {this.state.email}
//               onChangeText={(value)=>this.setState({email:value})}
//               />
//           <TextInput style={styles.inputBox}
//               underlineColorAndroid='rgba(0,0,0,0)'
//               placeholder="Masukkan Password"
//               secureTextEntry={true}
//               placeholderTextColor = "#ffffff"
//               ref={(input) => this.password = input}
//               onSubmitEditing={()=> this.rePassword.focus()}
//               defaultValue = {this.state.password}
//               onChangeText={(value)=>this.setState({password:value})}
//               />
//             <TextInput style={styles.inputBox}
//               underlineColorAndroid='rgba(0,0,0,0)'
//               placeholder="Masukkan Ulang Password"
//               secureTextEntry={true}
//               placeholderTextColor = "#ffffff"
//               ref={(input) => this.rePassword = input}
//               defaultValue = {this.state.rePassword}
//               onChangeText={(value)=>this.setState({rePassword:value})}
//               />
//            <TouchableOpacity style={styles.button} onPress={this.postNewUser.bind(this)}>
//              <Text style={styles.buttonText}>Daftar</Text>
//            </TouchableOpacity>
//            {/* <TouchableOpacity>
//              <SocialIcon type="google" iconColor="white" style={{backgroundColor:'#ED3B3B',width:300}} button title="Masuk dengan Google"/>
//            </TouchableOpacity>      */}
//   		</View>
// 				<View style={styles.signupTextCont}>
// 					<Text style={styles.signupText}>Sudah punya akun?</Text>
// 					<TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}><Text style={styles.loginButton}> Masuk</Text></TouchableOpacity>
// 				</View>

//         {/* {this.state.emailcek2.map((item,index)=>(
//           <Text key={index}>{item.email}</Text>
//         ))} */}
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
  loginButton: {
    color: '#5D89F7',
    fontSize: 16,
    fontWeight: '500',
  },
  containersignup: {
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
    backgroundColor: '#F18F37',
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
