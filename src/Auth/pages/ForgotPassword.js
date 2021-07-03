import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import {db} from '../../database/config'
import Logo from '../components/Logo';
import {AuthContext} from '../Navigation/AuthProvider';

const ForgotPassword = ({navigation}) => {
  const {sendEmailResetPaasword} = useContext(AuthContext);
  const [email, setEmail] = useState();

  return (
    <View style={styles.container}>
      <Logo title="Lupa Kata Sandi" />
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => sendEmailResetPaasword(email)}>
          <Text style={styles.buttonText}>Kirim Reset Link</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Ingat kata sandi?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupButton}> Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ForgotPassword;

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
