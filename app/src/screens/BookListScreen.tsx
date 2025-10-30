import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { getBooks, deleteBook, updateBookStatus, updateBookFavorite } from '../services/BookService';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BookListScreen = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des livres');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));

      Alert.alert('Succès', 'Le livre a été supprimé avec succès');
    } catch {
      setError('Erreur lors de la suppression du livre');
      Alert.alert('Erreur', 'Échec de la suppression du livre');
    }
  };

  const handleToggleStatus = async (book: any) => {
    try {
      const updatedBook = await updateBookStatus(book.id, { ...book, read: !book.read });
      setBooks(books.map(b => (b.id === book.id ? updatedBook : b)));
    } catch (error) {
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  const toggleFavorite = async (book: any) => {
    try {
      const updatedBook = await updateBookFavorite(book.id, !book.favorite);
      setBooks(books.map(b => (b.id === book.id ? updatedBook : b)));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des Livres</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/src/screens/AddEditBookScreen")}
        >
          <Text style={styles.addButtonText}>Ajouter un livre</Text>
        </TouchableOpacity>
        {books.map((item) => (
          <View style={styles.card} key={item.id}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardAuthor}>Auteur: {item.author}</Text>
            <Text style={styles.cardDetails}>Éditeur: {item.editor}</Text>
            <Text style={styles.cardDetails}>Année de publication: {item.year}</Text>
            <Text style={styles.cardDetails}>Lu: {item.read ? 'Oui' : 'Non'}</Text>

            <View style={styles.favoriteContainer}>
              <Text style={styles.favoriteText}>Favoris:</Text>
              <Ionicons
                name={item.favorite ? "heart" : "heart-outline"}
                size={24}
                color="red"
                onPress={() => toggleFavorite(item)}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cardButton} onPress={() => router.push(`/src/screens/BookDetailScreen?id=${item.id}`)}>
                <Text style={styles.cardButtonText}>Détails</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardButton} onPress={() => handleToggleStatus(item)}>
                <Text style={styles.cardButtonText}>
                  {item.read ? "Marquer comme non lu" : "Marquer comme lu"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cardButton, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
                <Text style={styles.cardButtonDeleteText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardAuthor: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  cardDetails: {
    fontSize: 14,
    marginBottom: 4,
    color: '#777',
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    gap: 10,
  },
  cardButton: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#E53935',
  },
  cardButtonDeleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#30d438ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookListScreen;
