import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import TeamScreen from '../Screens/TeamScreen';
import RequestScreen from '../Screens/RequestScreen';
import { StyleSheet, Text,View,Image,TouchableOpacity } from 'react-native';
import PostScreen from '../Screens/PostScreen';
import Notification from '../Screens/Notification';


const Tab = createBottomTabNavigator();
const CustomTabBarButton =({children,onPress})=>(
    <TouchableOpacity
    style={{
        top:-30,
        justifyContent:'center',
        alignItems:'center',
        ...styles.shadow


    }}
    onPress={onPress}>
        <View style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor:'#92A3FD',
        }}>
            {children}
        </View>
    </TouchableOpacity>

);
const Navigation =()=> {
    return (
        <Tab.Navigator
        screenOptions={{ 
            tabBarShowLabel: false,
            tabBarStyle:{
                position:'absolute',
                bottom: 25,
                left:20,
                right:20,
                elevation:0,
                backgroundColor: '#ffffff',
                borderRadius:15,
                height: 90,
                ...styles.shadow

        }}}
        >
            <Tab.Screen name ="Home"    component={HomeScreen}  options ={{
                tabBarIcon:({focused})=>(
                 <View style={{alignItems:'center',justifyContent:'center', top:10}}>
                    <Image 
                        source={require('../assets/icons/Home.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor:focused ? '#C58BF2' : '#748c94',
                        }}

                    />
                    <Text style={{tintColor:focused ? '#C58BF2' : '#748c94',fontSize:12}}>Home</Text>

                   
                 </View>   
                ),
                headerShown: false,
                title: 'TeamUp',
                headerTitleAlign: 'left',
                paddingTop:20,
          headerStyle: {
            backgroundColor: '#92A3FD',
            height: 180,
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
            
          },
            }} />
             <Tab.Screen name ="Request" component={RequestScreen} options ={{
                tabBarIcon:({focused})=>(
                 <View style={{alignItems:'center',justifyContent:'center', top:10}}>
                    <Image 
                        source={require('../assets/icons/Calendar.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor:focused ? '#C58BF2' : '#748c94',
                        }}

                    />
                    <Text style={{tintColor:focused ? '#C58BF2' : '#748c94',fontSize:12}}>Request</Text>

                   
                 </View>   
                ),
            }} />
           <Tab.Screen name='Norification' component={Notification} 
                options={{
                    tabBarIcon:({focused})=>(
                    <Image
                        source={require('../assets/icons/Search.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor:'#fff'}}
                        />
                    ),
                    tabBarButton:(props) =>(                                                                                                              
                        <CustomTabBarButton {...props}
                        />)
                }}
           />
            <Tab.Screen name ="Team"    component={TeamScreen}   options ={{
                tabBarIcon:({focused})=>(
                 <View style={{alignItems:'center',justifyContent:'center', top:10}}>
                    <Image 
                        source={require('../assets/icons/Plus.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor:focused ? '#C58BF2' : '#748c94',
                        }}

                    />
                    <Text style={{tintColor:focused ? '#C58BF2' : '#748c94',fontSize:12}}>Team</Text>

                   
                 </View>   
                ),
            }}  />
             <Tab.Screen name ="Profile" component={ProfileScreen} options ={{
                tabBarIcon:({focused})=>(
                 <View style={{alignItems:'center',justifyContent:'center', top:10}}>
                    <Image 
                        source={require('../assets/icons/Profile.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor:focused ? '#C58BF2' : '#748c94',
                        }}

                    />
                    <Text style={{tintColor:focused ? '#C58BF2' : '#748c94',fontSize:12}}>Profile</Text>

                   
                 </View>   
                ),
            }} />
           
        </Tab.Navigator>

    );
}
const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7f5df0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
    }
});
export default Navigation;