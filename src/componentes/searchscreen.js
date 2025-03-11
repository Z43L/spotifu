import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { ImageBackground } from 'react-native';
import axios from "axios";
import * as WebBrowser from 'expo-web-browser'; // Import WebBrowser
import * as SecureStore from 'expo-secure-store';
import SpotifyWebApi from 'spotify-web-api-js';

WebBrowser.maybeCompleteAuthSession(); // Add this

const spotifyApi = new SpotifyWebApi();

function SearchScreen() {
    const navigation = useNavigation();
    const [value, onChangeText] = useState('')
    const [songs, setSongs] = useState([]);
    const [isSpotifyLoggedIn, setIsSpotifyLoggedIn] = useState(false); // State to track Spotify login
    const [accessToken, setAccessToken] = useState(null);
    const SPOTIFY_CLIENT_ID = 'b3bd33f41d9d42e498fa2fcf8b0e5d92'; // Replace with your Spotify Client ID

    useEffect(() => {
        // Check if an access token is already stored
        const checkStoredToken = async () => {
            const storedToken = await SecureStore.getItemAsync('spotifyAccessToken');
            if (storedToken) {
                setAccessToken(storedToken);
                setIsSpotifyLoggedIn(true);
                spotifyApi.setAccessToken(storedToken);
                fetchSongsFromSpotify(storedToken); // Fetch songs immediately
            }
        };
        checkStoredToken();
    }, []);

    const handleSpotifyLogin = async () => {
        try {
            // This is the URL of your backend route for handling Spotify authentication
            const redirectUrl = await WebBrowser.openAuthSessionAsync(`https://spotifu.onrender.com/login`);
        
            if (redirectUrl) {
              // Extract access token from URL
                const tokenMatch = redirectUrl.url.match(/accessToken=([^&]*)/);
                if (tokenMatch && tokenMatch[1]) {
                    const newAccessToken = decodeURIComponent(tokenMatch[1]);
                    setAccessToken(newAccessToken);
                    spotifyApi.setAccessToken(newAccessToken);
                    await SecureStore.setItemAsync('spotifyAccessToken', newAccessToken);
                    setIsSpotifyLoggedIn(true);
                    fetchSongsFromSpotify(newAccessToken); // Fetch songs immediately
                }
            }
        } catch (error) {
            console.error('Error during Spotify login:', error);
        }
    };

    const fetchSongsFromSpotify = async (token) => {
        try {
            if (token) {
                const searchResult = await spotifyApi.searchTracks(value === '' ? 'a' : value); // Search for 'a' if no search term
                const foundSongs = searchResult.tracks.items.map((track) => ({
                    id: track.id,
                    title: track.name,
                    artist: track.artists.map((artist) => artist.name).join(', '),
                    src: track.preview_url,
                }));
                setSongs(foundSongs);
            }
        } catch (error) {
            console.error("Error fetching songs from Spotify:", error);
        }
    };

    const goToMusicScreen = (song) => {
        navigation.navigate('MusicScreen', { song: song });
    };

    useEffect(() => {
        if (isSpotifyLoggedIn) {
          fetchSongsFromSpotify(accessToken);
        }
      }, [value, isSpotifyLoggedIn]);

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
                {songs.length > 0 && songs.map((song) => (
                    <TouchableOpacity key={song.id} style={styles.playlistItem} onPress={() => goToMusicScreen(song)}>
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
    // Rest of your styles...
});

export default SearchScreen;
