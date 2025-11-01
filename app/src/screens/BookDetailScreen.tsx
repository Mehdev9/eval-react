import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nom : {book.name}</Text>
        <Text style={styles.cardDetail}>Auteur : {book.author}</Text>
        <Text style={styles.cardDetail}>Éditeur : {book.editor}</Text>
        <Text style={styles.cardDetail}>Année de publication : {book.year}</Text>
        <Text style={styles.cardDetail}>Statut : {book.lu ? 'Lu' : 'Non lu'}</Text>
        <Text style={styles.cardDetail}>Note des lecteurs : {book.rating}/5</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push('/src/screens/AddEditBookScreen')}
      >
        <Text style={styles.editButtonText}>Modifier</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardDetail: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  editButton: {
    backgroundColor: '#30d438ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookDetailScreen;
