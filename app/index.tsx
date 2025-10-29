import React from 'react';
import { Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  const navigateToBookList = () => {
    router.push('/src/screens/BookListScreen');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenue sur l&apos;application de gestion de livres !</Text>
      <Button title="Voir la liste des livres" onPress={navigateToBookList} />
    </View>
  );
};

export default Index;
