import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Importation des hooks d'Expo Router
import { getBookById } from '../services/BookService';

const BookDetailScreen = () => {
  const params = useLocalSearchParams(); // Récupérer l'ID du livre depuis l'URL
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [book, setBook] = useState<any>(null);
  const router = useRouter(); // Hook pour naviguer

  // Charger les détails du livre
  useEffect(() => {
    const loadBookDetails = async () => {
      const bookData = await getBookById(id);
      setBook(bookData);
    };
    if (id) {
      loadBookDetails();
    }
  }, [id]);

  // Fonction qui permet de mettre à jour le livre après la modification
  const handleBookUpdate = (updatedBook: any) => {
    setBook(updatedBook);  // Mise à jour de l'état local
  };

  if (!book) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nom: {book.name}</Text>
      <Text>Auteur: {book.author}</Text>
      <Text>Éditeur: {book.editor}</Text>
      <Text>Année de publication: {book.year}</Text>
      <Text>Statut: {book.lu ? 'Lu' : 'Non lu'}</Text>
      <Button
        title="Modifier"
        onPress={() =>
          router.push('/src/screens/AddEditBookScreen')  // Utilisation de router.push pour la navigation avec paramètres
        }
      />
    </View>
  );
};

export default BookDetailScreen;
