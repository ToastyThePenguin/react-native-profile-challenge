
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground,Button, Alert, TouchableOpacity,ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import {createStackNavigator,createAppContainer, createBottomTabNavigator} from 'react-navigation';




const homeIcon = (<Icon name="home" size ={10} color='white'/>)
const searchIcon = (<Icon name="magnifying-glass" size ={10} color='white'/>)
const libIcon = (<Icon name="rocket" size ={10} color='white'/>)
const backIcon = (<Icon name="chevron-thin-left" size ={10} color='white'/>)
const pauseIcon = (<Icon name="controller-paus" size ={10} color='white'/>)
const likeIcon = (<Icon name="heart" size ={10} color='white'/>)
const deviceIcon = (<Icon name="computer"  color='white'/>)

type Props = {};

class ListSong extends React.Component{
  render(){
    return(
      <View style={styles.listSong}>
        <Text style={{color:'gray',padding:10}}>{this.props.number}</Text>
        <Text style={{color:'gray',paddingLeft:10,fontSize:10}}><Text style={{fontSize:15,color:'white'}}>{this.props.songName}</Text>{"\n"}{this.props.listensCount}</Text>
        <TouchableOpacity style={{marginLeft:'auto', marginRight:0}}>
            <Icon  name="dots-three-horizontal" size ={10} color='gray'/>
        </TouchableOpacity>

      </View>
    )
  }
}

class ArtistProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isPlaying: false
    };
    this.togglePlaying = this.togglePlaying.bind(this)
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
  render() {
    return (

      <ImageBackground style = {styles.container} source = {require('./assets/bg.jpg')}>
        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']} style={styles.linearGradient}>
            <Text style={styles.name}>{`High\nKlassified`}</Text>
            <Text style={styles.listeners}>46,856 MONTHLY LISTENERS</Text>
            <TouchableOpacity style={styles.button}
              onPress={this.togglePlaying}>
              {this.playingText()}
            </TouchableOpacity>
            <Text style={styles.popular}>Popular</Text>
            <ScrollView>
              <ListSong number="1" songName='1919' listensCount='372,363'/>
              <ListSong number="2" songName='NS Bounce' listensCount='97,628'/>
              <ListSong number="3" songName='Numb' listensCount='91,587'/>
              <ListSong number="4" songName='Gold' listensCount='637,548'/>
              <ListSong number="5" songName='Barely' listensCount='114,828'/>
              <ListSong number="6" songName='Another Song' listensCount='0'/>

            </ScrollView>
            <View style={styles.nowPlaying}>
              <TouchableOpacity>
                  <Icon name="heart" size ={30} color='white'/>
              </TouchableOpacity>

              <View>
                <Text style={{color:'gray',textAlign:"center"}}><Text style={{fontWeight:'bold'}}>Scopola •</Text> High Klassified</Text>
                <Text style={{color:'gray',textAlign:"center"}}><Icon name="laptop" color='gray'/> Devices Available</Text>
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

class LibraryScreen extends React.Component{
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text >Library Screen</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component{
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text >Home Screen</Text>
      </View>
    );
  }
}

const SearchStack = createStackNavigator(
{
      Home:HomeScreen,
      Search:ArtistProfileScreen,
      Library: LibraryScreen,
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
        tabBarIcon:({tintColor})=>(<Icon name="magnifying-glass" size ={30} color='white'/>)
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
        activeTintColor:'white',
        showICon: true,
        style:{
          backgroundColor:'#111',
        }
      },


      })



  }

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
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    paddingTop:'40%',
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
    backgroundColor: '#1db954',

  },
  buttonText: {
    color: 'white',
    paddingLeft: 40,
    paddingRight:40,


  },
  popular: {
    marginTop: 20,
    color: 'white',
    fontWeight:'bold',
    fontSize: 20,
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
/*
export default class App extends React.Component {
  render(){
    return <AppContainer/>;
  }

};
*/
export default createAppContainer(TabNavigator);
