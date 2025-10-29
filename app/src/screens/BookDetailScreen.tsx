import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getBookById } from '../services/BookService';

const BookDetailScreen = () => {
  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [book, setBook] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadBookDetails = async () => {
      const bookData = await getBookById(id);
      setBook(bookData);
    };
    if (id) {
      loadBookDetails();
    }
  }, [id]);

  const handleBookUpdate = (updatedBook: any) => {
    setBook(updatedBook);
  };

  if (!book) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nom : {book.name}</Text>
      <Text>Auteur : {book.author}</Text>
      <Text>Éditeur : {book.editor}</Text>
      <Text>Année de publication : {book.year}</Text>
      <Text>Statut : {book.lu ? 'Lu' : 'Non lu'}</Text>
      <Text>Note des lecteurs : {book.rating}</Text>
      <Button
        title="Modifier"
        onPress={() =>
          router.push('/src/screens/AddEditBookScreen')
        }
      />
    </View>
  );
};

export default BookDetailScreen;
