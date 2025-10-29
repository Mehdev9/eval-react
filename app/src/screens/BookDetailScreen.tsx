import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getBookById } from '../services/BookService';

const BookDetailScreen = ({ route, navigation }: any) => {
  const { bookId } = route.params;
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const loadBookDetails = async () => {
      const bookData = await getBookById(bookId);
      setBook(bookData);
    };
    loadBookDetails();
  }, [bookId]);

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
        onPress={() => navigation.navigate('AddEditBook', { bookId })}
      />
    </View>
  );
};

export default BookDetailScreen;
