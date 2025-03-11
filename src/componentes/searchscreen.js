import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { ImageBackground } from 'react-native';
import axios from "axios";
import * as WebBrowser from 'expo-web-browser'; // Import WebBrowser

WebBrowser.maybeCompleteAuthSession(); // Add this

function SearchScreen() {
    const navigation = useNavigation();
    const [value, onChangeText] = useState('')
    const [songs, setSongs] = useState([]);
    const [isSpotifyLoggedIn, setIsSpotifyLoggedIn] = useState(false); // State to track Spotify login

    const handleSpotifyLogin = async () => {
        try {
            const result = await WebBrowser.openAuthSessionAsync('http://192.168.1.5:3000/login'); // Replace with your IP address
            console.log('Login result:', result);
            // You can handle the result here if needed
            setIsSpotifyLoggedIn(true); // Set the state to true after login
        } catch (error) {
            console.error('Error during Spotify login:', error);
        }
    };

    const goToMusicScreen = (song) => {
        navigation.navigate('MusicScreen', { song: song });
    };

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://192.168.1.5:3000/api/songs');
            setSongs(response.data);
        }
        catch (error) {
            console.error('Error fetching songs:', error);
        }
    }

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.textinp}>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={(text) => onChangeText(text)}
                    value={value}
                    styles={styles.inpute}
                />
            </View>
            {!isSpotifyLoggedIn && ( // Show login button only if not logged in
                <View>
                    <Button title="Login with Spotify" onPress={handleSpotifyLogin} />
                </View>
            )}

            <ScrollView contentContainerStyle={styles.playlistContainer}>
                {value === '' ? songs.map((song) => (
                    <TouchableOpacity key={song.title} style={styles.playlistItem} onPress={() => goToMusicScreen(song)}>
                        <ImageBackground source={require('../../assets/spotylista.png')} style={styles.imageBackground}>
                            <AntDesign name="playcircleo" size={30} color="black" style={styles.icono} />
                        </ImageBackground>
                        <Text style={styles.playlistItemText}>{song.title}</Text>
                    </TouchableOpacity>
                )) : songs.filter(song => song.title.toLowerCase().includes(value.toLowerCase())).map((song) => (
                    <TouchableOpacity key={song.title} style={styles.playlistItem} onPress={() => goToMusicScreen(song)}>
                        <ImageBackground source={require('../../assets/spotylista.png')} style={styles.imageBackground}>
                            <AntDesign name="playcircleo" size={30} color="black" style={styles.icono} />
                        </ImageBackground>
                        <Text style={styles.playlistItemText}>{song.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

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
    textinp: {
        width: '100%',
        height: '10%',
        justifyContent: 'baseline',
        alignItems: 'baseline',
        marginTop: 50,
    },
});

export default SearchScreen;
