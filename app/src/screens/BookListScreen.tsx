import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, ScrollView, StyleSheet } from 'react-native';
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
      <View style={{ flex: 1, padding: 10 }}>
        <Text>Liste des Livres</Text>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 20, padding: 15, borderBottomWidth: 1, alignItems: 'center' }}>
                <Text>{`Nom: ${item.name}`}</Text>
                <Text>{`Auteur: ${item.author}`}</Text>
                <Text>{`Éditeur: ${item.editor}`}</Text>
                <Text>{`Année de publication: ${item.year}`}</Text>
                <Text>{`Lu: ${item.read ? 'Oui' : 'Non'}`}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Text style={{ marginRight: 10 }}>Favoris:</Text>
                  <Ionicons
                    name={item.favorite ? "heart" : "heart-outline"}
                    size={24}
                    color="red"
                    onPress={() => toggleFavorite(item)}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <View style={styles.buttonWrapper}>
                    <Button
                      title="Détails"
                      onPress={() => router.push(`/src/screens/BookDetailScreen?id=${item.id}`)}
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <Button
                      title={item.read ? "Marquer comme non lu" : "Marquer comme lu"}
                      onPress={() => handleToggleStatus(item)}
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <Button
                      title="Supprimer"
                      onPress={() => handleDelete(item.id)}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />

        <Button
          title="Ajouter un livre"
          onPress={() => router.push("/src/screens/AddEditBookScreen")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '40%',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5, 
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default BookListScreen;
