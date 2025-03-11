import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ListaCancion from './src/componentes/lista_cancion';
import Playlist from './src/componentes/playlist';
import Navbar from './src/componentes/navbar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/componentes/mainscreen';
import PlaylistScreen from './src/componentes/playlisscreen';
import MusicScreen from './src/componentes/musicscreen';
import SearchScreen from './src/componentes/searchscreen';

const Stack = createNativeStackNavigator();

function UserScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}



function LibraryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Library!</Text>
    </View>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Main" options={{ headerShown: false }} component={MainScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="MusicScreen" component={MusicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 50,
  },
  scrollContentContainer: {
    paddingBottom: 20, // Add some padding at the bottom of the scroll view
  },
  listContainer: {
    backgroundColor: '#fff',
  },
  ListaCancion: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  playlist: {
    width: 350, // Bigger size
    height: 350, // Bigger size
    marginHorizontal: 20, // Maintain the margin
  },
  pista: {
    width: 150, //Fixed width
    height: 100, //Fixed height
  },
  separator: {
    width: 20,
    height: 0,
  },
  separatorhigh: {
    width: 0,
    height: 20,
  },
});
