// /Users/david/42/react/spotifu/src/componentes/lista_cancion.js
import { TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ListaCancion = ({ style }) => {
  const navigation = useNavigation(); // Use 'navigation', not 'navigatior'

  const redirectlista = () => {
    navigation.navigate('PlaylistScreen'); // Use 'navigation', not 'navigator'
  };

  return (
    <View>
      <TouchableOpacity onPress={redirectlista}>
        <ImageBackground source={require('../../assets/spotylista.png')} style={[styles.imageBackground, style]}>
          <AntDesign name="playcircleo" size={30} color="black" style={styles.icono} />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icono: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default ListaCancion;
