// /Users/david/42/react/spotifu/src/componentes/playlisscreen.js
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { React, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const PlaylistScreen = () => {
    const navigation = useNavigation();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://10.64.248.67:3000/api/songs');
            setSongs(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const goToMusicScreen = (song) => { //Function to go to MusicScreen
        navigation.navigate('MusicScreen', { song: song }); //Pass the song selected
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <ImageBackground source={require('../../assets/spotylista.png')} style={styles.imageTitle}>
                    <Text style={styles.playlistText}>Playlist</Text>
                </ImageBackground>
            </TouchableOpacity>
            <View style={styles.playlist} >
                <ScrollView contentContainerStyle={styles.playlistContainer}>
                    {songs.map((song) => (
                        <TouchableOpacity key={song.id} style={styles.playlistItem} onPress={() => goToMusicScreen(song)}> 
                            <ImageBackground source={require('../../assets/spotylista.png')} style={styles.imageBackground}>
                                <AntDesign name="playcircleo" size={30} color="black" style={styles.icono} />
                            </ImageBackground>
                            <Text style={styles.playlistItemText}>{song.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.navItem}>
                    <AntDesign name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.navItem}>
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Library')} style={styles.navItem}>
                    <MaterialIcons name="library-music" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('User')} style={styles.navItem}>
                    <MaterialIcons name="settings" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',


    },
    playlist: {
        flex: 1,
        width: '100%',

    },
    playlistText: {
        fontSize: 24,
    },
    playlistContainer: {
        width: '100%',
        alignItems: 'baseline',
        alignContent: 'baseline',

    },
    playlistItem: {
        width: '100%',
        alignContent: 'baseline',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
    },
    playlistItemText: {
        fontSize: 18,
        marginLeft: 10,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        width: '100%',
    },
    navItem: {
        padding: 10,
    },
    separator: {
        marginVertical: 1,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    imageBackground: {
        width: 'auto%',
        height: 'auto%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    imageTitle: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
});

export default PlaylistScreen;
