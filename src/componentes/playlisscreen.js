import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { React, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const PlaylistScreen = () => {
    const navigation = useNavigation();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSongsFromSpotify();
    }, []);

    const fetchSongsFromSpotify = async () => {
        try {
            const token = await SecureStore.getItemAsync('spotifyAccessToken');
            spotifyApi.setAccessToken(token);
            if (token) {
                // Replace with your logic to get playlist tracks
                const result = await spotifyApi.searchTracks("a"); // You need to adapt this to fetch from playlists
                const foundSongs = result.tracks.items.map((track) => ({
                    id: track.id,
                    title: track.name,
                    artist: track.artists.map((artist) => artist.name).join(', '),
                    src: track.preview_url,
                }));
                setSongs(foundSongs);
            }
        } catch (error) {
            console.error('Error fetching songs from Spotify:', error);
        }
    };

    const goToMusicScreen = (song) => {
        navigation.navigate('MusicScreen', { song: song });
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
    // Rest of your styles
});

export default PlaylistScreen;
