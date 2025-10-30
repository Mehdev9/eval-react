import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  const navigateToBookList = () => {
    router.push('/src/screens/BookListScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenue sur l&apos;application de gestion de livres !</Text>
      
      <TouchableOpacity style={styles.button} onPress={navigateToBookList}>
        <Text style={styles.buttonText}>Voir la liste des livres</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#30d438ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Index;
