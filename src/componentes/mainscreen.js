import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ListaCancion from './lista_cancion';
import Playlist from './playlist';
import Navbar from './navbar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlaylistScreen from './playlisscreen';

function MainScreen() {

    const redirectlista = () => {
        navigator.navigate('PlaylistScreen');
    }    
        return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.listContainer}>
            <View style={styles.ListaCancion}>
              <ListaCancion style={styles.pista} />
              <View style={styles.separator} />
              <ListaCancion style={styles.pista} />
            </View>
            <View style={styles.ListaCancion}>
              <ListaCancion style={styles.pista} />
              <View style={styles.separator} />
              <ListaCancion style={styles.pista} />
            </View>
            <View style={styles.ListaCancion}>
              <ListaCancion style={styles.pista} />
              <View style={styles.separator} />
              <ListaCancion style={styles.pista} />
            </View>
            <View style={styles.ListaCancion}>
              <ListaCancion style={styles.pista} />
              <View style={styles.separator} />
              <ListaCancion style={styles.pista} />
            </View>
            <View style={styles.separatorhigh} />
            <Text>Lista de canciones</Text>
            <View style={styles.separatorhigh} />
          </View>
          <Playlist style={styles.playlist} />
        
        </ScrollView>
        <Navbar />
      <StatusBar style={{backgroundColor: '#fff'}} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      marginTop: '10%',
      backgroundColor: '#fff',
    },
    scrollContentContainer: {
      paddingBottom: 10, // Add some padding at the bottom of the scroll view
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
  
export default MainScreen;
  