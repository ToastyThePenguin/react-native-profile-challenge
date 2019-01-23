
import React, {Component} from 'react';
import {Animated, Platform, StyleSheet, Text, View, ImageBackground,Button, Alert,
  TouchableOpacity,ScrollView, Picker} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import {createStackNavigator,createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};

class ListSong extends React.Component{
  render(){
    return(
      <View style={styles.listSong}>
        <Text style={{color:'gray',padding:10}}>{this.props.number}</Text>
        <Text style={{color:'gray',paddingLeft:10,fontSize:10}}>
          <Text style={{fontSize:15,color:'white'}}>{this.props.songName}
          </Text>{"\n"}{this.props.listensCount}</Text>
        <TouchableOpacity style={{marginLeft:'auto', marginRight:0}}>
            <Icon  name="dots-three-horizontal" size ={10} color='gray'/>
        </TouchableOpacity>

      </View>
    )
  }
}



const HEADER_MAX_SIZE=50;
const HEADER_MIN_SIZE = 2;
const HEADER_SIZE_RANGE = HEADER_MAX_SIZE - HEADER_MIN_SIZE;


class ArtistProfileScreen extends React.Component {

  constructor(){
    super();
    this.state={
      isPlaying: false,
      scrollY:new Animated.Value(0),
    };


    this.togglePlaying = this.togglePlaying.bind(this);
    this.getState = this.getState.bind(this);
  }


  togglePlaying(){
    this.setState({isPlaying: !this.state.isPlaying})
  }
  playingText(){
    if (this.state.isPlaying){
      return <Text style={styles.buttonText}>PAUSE</Text>
    }
    else {return <Text style={styles.buttonText}>SHUFFLE PLAY</Text>}
  }
  playingIcon(){
    if (this.state.isPlaying){
      return <Icon name="controller-paus" size ={30} color='white'/>
    }
    else {return <Icon name="controller-play" size ={30} color='white'/>}

  }
  dynamicMargin(){
    const nameSize = this.state.scrollY.interpolate({
      inputRange:[0,HEADER_SIZE_RANGE],
      outputRange:[HEADER_MAX_SIZE,HEADER_MIN_SIZE],
      extrapolate:'clamp',
    });
    return parseInt(nameSize*4)
  }
  getState(){
    return this.state.isPlaying;
  }


  static navigationOptions = ({ navigation }) => {

      return {
        headerRight:(
            <TouchableOpacity style={{padding:10}}
              onPress={() => navigation.navigate('MyModal')}>
              <Icon name="dots-three-horizontal" size ={10} color='white'/>
             </TouchableOpacity>
          ),
        headerLeft: (
          <TouchableOpacity style={{padding:10}}
            onPress={() => {navigation.navigate('Playing', {playingParam: this.getState})}}>
            <Icon name="chevron-thin-left" size ={10} color='white'/>
           </TouchableOpacity>
          ),

        /* the rest of this config is unchanged */
      };
    };

  render() {
    const nameSize = this.state.scrollY.interpolate({
      inputRange:[0,HEADER_SIZE_RANGE],
      outputRange:[HEADER_MAX_SIZE,HEADER_MIN_SIZE],
      extrapolate:'clamp',
    });

        return (

      <ImageBackground style = {styles.container} source = {require('./assets/bg.jpg')}>
        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
          style={styles.linearGradient}>
          <View style={{marginTop: '40%'}}>
            <Animated.Text style={[styles.name, {fontSize: nameSize}]}>{`High\nKlassified`}</Animated.Text>
            <Text style={styles.listeners}>46,856 MONTHLY LISTENERS</Text>
            <TouchableOpacity style={styles.button}
              onPress={this.togglePlaying}>
              {this.playingText()}
            </TouchableOpacity>
          </View>
          <ScrollView  scrollEventThrottle ={16} onScroll = {Animated.event([{nativeEvent: {contentOffset:{y: this.state.scrollY}}}])}>
            <Text style={styles.popular}>Popular</Text>


              <ListSong number="1" songName='1919' listensCount='372,363'/>
              <ListSong number="2" songName='NS Bounce' listensCount='97,628'/>
              <ListSong number="3" songName='Numb' listensCount='91,587'/>
              <ListSong number="4" songName='Gold' listensCount='637,548'/>
              <ListSong number="5" songName='Barely' listensCount='114,828'/>
              <ListSong number="6" songName='Another Song' listensCount='0'/>
              <ListSong number="6" songName='Another Song' listensCount='0'/>
              <ListSong number="6" songName='Another Song' listensCount='0'/>
              <ListSong number="6" songName='Another Song' listensCount='0'/>
              <ListSong number="6" songName='Another Song' listensCount='0'/>
              <ListSong number="6" songName='Another Song' listensCount='0'/>
              <ListSong number="6" songName='Another Song' listensCount='0'/>
            </ScrollView>

            <View style={styles.nowPlaying}>
              <TouchableOpacity>
                  <Icon name="heart" size ={30} color='white'/>
              </TouchableOpacity>
              <View>
                <Text style={{color:'gray',textAlign:"center"}}><Text
                  style={{fontWeight:'bold'}}>Scopola •</Text> High Klassified</Text>
                <Text style={{color:'gray',textAlign:"center"}}>
                  <Icon name="laptop" color='gray'/> Devices Available</Text>
              </View>
              <TouchableOpacity onPress={this.togglePlaying}>
                {this.playingIcon()}
              </TouchableOpacity>
            </View>

        </LinearGradient>
      </ImageBackground>


    );
  }
}


class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{flex:1 ,alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30,textAlign:'center' }}>{`Hello!\nPlease dimiss me.`}</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

class LibraryScreen extends React.Component{
  constructor(){
    super();
    this.state = {pickerValue : 'Song'}
  }
  static navigationOptions = ({ navigation }) => {

      return {
        headerRight:(
            <TouchableOpacity style={{padding:10}}
              onPress={() => navigation.navigate('MyModal')}>
              <Icon name="dots-three-horizontal" size ={10} color='white'/>
             </TouchableOpacity>
          ),
        headerLeft: (
          <TouchableOpacity style={{padding:10}}
            onPress={() => {navigation.navigate('Search')}}>
            <Icon name="chevron-thin-left" size ={10} color='white'/>
           </TouchableOpacity>
          ),

        /* the rest of this config is unchanged */
      };
    };


  render(){

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:'#111' }}>
        <Text style={{color:'white', fontWeight:'bold'}}>Please select a song:</Text>
        <Picker style={{width:'75%', color: 'cyan', backgroundColor:'#333'}}
          mode = 'dropdown'
          selectedValue = {this.state.pickerValue}
          onValueChange = {(itemValue,itemIndex) => this.setState({pickerValue : itemValue})}>
            <Picker.Item label='Vex' value ='vex'/>
            <Picker.Item label='16 Psyche' value ='16 psyche'/>
            <Picker.Item label='Particle Flux' value ='particle flux'/>
            <Picker.Item label='Twin Fawns' value ='twin fawns'/>
            <Picker.Item label='Survive' value ='survive'/>
            <Picker.Item label='Carrion Flowers' value ='carrion flowers'/>


        </Picker>
      </View>
    );
  }
}

class PlayingScreen extends React.Component{

  render(){

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Animated.Text style = {{fontSize:40, }}>{this.props.navigation.state.params.playingParam?
            'SOMETHING IS PLAYING': 'NOTHING PLAYING'}</Animated.Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {

  render(){
    return(
      <Text>NOTHING TO SEE HERE</Text>
    )
  }
}

const SearchStack = createStackNavigator(
{

      Search:ArtistProfileScreen,
      Playing:PlayingScreen,
      MyModal: ModalScreen,
},
{
  initialRouteName: 'Search',

  defaultNavigationOptions:{
    headerTitle:(
      <TouchableOpacity style={{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white',
        padding: 5,
        marginLeft:'auto',
        marginRight:0,
      }}>
        <Text style={{textAlign: 'right',
        color: 'white',

        }}>FOLLOWING</Text>
      </TouchableOpacity>
    ),
    headerRight:(
        <TouchableOpacity style={{padding:10}}>
          <Icon name="dots-three-horizontal" size ={10} color='white'/>
         </TouchableOpacity>
      ),
    headerLeft: (
      <TouchableOpacity style={{padding:10}}>
        <Icon name="chevron-thin-left" size ={10} color='white'/>
       </TouchableOpacity>
      ),
    headerTransparent: true,
    headerStyle:{backgroundColor:'transparent',},
    headerTintColor: 'white',
  }
}
);


const TabNavigator = createBottomTabNavigator(
  {
    Home:{
      screen:HomeScreen,
      navigationOptions:{
        tabBarLabel:'Home',
        tabBarIcon:({tintColor})=>(<Icon name="home" size ={30} color='white'/>)
      }
    },
    Search:{
      screen:SearchStack,
      navigationOptions:{
        tabBarLabel:'Search',
        tabBarIcon:({tintColor})=>(<Icon
          name="magnifying-glass" size ={30} color='white'/>)
      }
    },
    Library:{
      screen:LibraryScreen,
      navigationOptions:{
        tabBarLabel:'Library',
        tabBarIcon:({tintColor})=>(<Icon name="rocket" size ={30} color='white'/>)
      }
    },
  },

  {
    defaultNavigationOptions:({navigation}) =>({

      tabBarOptions:{
        activeTintColor:'#1db954',
        showIcon: true,
        style:{
          backgroundColor:'#111',
        }
      },

      })
  },

);

const styles = StyleSheet.create({
  listSong:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    marginBottom:0,
    marginTop:'auto',
    backgroundColor:'#0d0d0d'
  },

  following:{
    textAlign: 'right',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
  },

  headerLR:{
    padding: 5,
  },

  container: {
    flex: 1,
  },

  linearGradient: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
},

  name: {

    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  listeners: {
    textAlign: 'center',
    color: 'grey',
    marginBottom: 20,
    fontSize: 10,
  },

  button: {
    borderRadius:50,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:30,
    marginRight:30,
    alignSelf: 'center',
    backgroundColor: '#1db954',
  },

  buttonText: {
    color: 'white',
    paddingLeft: 40,
    paddingRight:40,
    textAlign: 'center',
  },

  popular: {
    marginTop: 20,
    color: 'white',
    fontWeight:'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  nowPlaying:{
    width:"100%",
    backgroundColor:'#111',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:'auto',
    marginBottom:0,
    padding:10,
    alignItems:'center',
  }
});


export default createAppContainer(TabNavigator);
