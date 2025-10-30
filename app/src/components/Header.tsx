import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Gestion des Livres</Text>

      <View style={styles.navContainer}>
        <TouchableOpacity onPress={() => router.push('./')}>
          <Text style={styles.navLink}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/src/screens/BookListScreen')}>
          <Text style={styles.navLink}>Livres</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/src/screens/AddEditBookScreen')}>
          <Text style={styles.navLink}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    height: 80,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  navLink: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
    textDecorationLine: 'underline',
  },
});

export default Header;
