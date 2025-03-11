// /Users/david/42/react/spotifu/src/componentes/musicscreen.js
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from 'expo-av'; // Import Audio from expo-av

const MusicScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { song } = route.params;

    const [sound, setSound] = useState(null); // State for the sound object
    const [isPlaying, setIsPlaying] = useState(false); // State to track playing status

    useEffect(() => {
        // Load the sound when the component mounts
        loadSound();

        // Unload the sound when the component unmounts
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []); // Empty dependency array to run only once

    const loadSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: song.src }, // Use the song's src here
                { shouldPlay: false } // Don't play immediately
            );
            setSound(sound);
        } catch (error) {
            console.error('Error loading sound:', error);
        }
    };

    const handlePlayPause = async () => {
        if (sound) {
            try {
                if (isPlaying) {
                    await sound.pauseAsync();
                } else {
                    await sound.playAsync();
                }
                setIsPlaying(!isPlaying); // Toggle playing status
            } catch (error) {
                console.error('Error playing/pausing sound:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Music Screen</Text>
            <View>
                <Image source={require('../../assets/spotylista.png')} style={styles.image} />
            </View>
            <View style={styles.row}>
                <Text>{song.title}</Text>
                <Text>{song.artist}</Text>
            </View>
            <View style={styles.rowicono}>
                <TouchableOpacity style={styles.icono} onPress={handlePlayPause}>
                    {isPlaying ? (
                        <AntDesign name="pause" size={30} color="black" />
                    ) : (
                        <AntDesign name="playcircleo" size={30} color="black" />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.icono} >
                    <AntDesign name="alipay-square" size={30} color="black" />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
    },
    icono: {
        padding: 10,
    },
    rowicono: {
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
});

export default MusicScreen;
