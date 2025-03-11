import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AntDesign, MaterialIcons, Entypo} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
                <Entypo name="home" size={24} color="black" />
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

    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light gray background
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc', // Light gray border
    },
    navItem: {
        padding: 10,
    },
});

export default Navbar;
