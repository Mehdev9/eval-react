import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, ScrollView } from 'react-native';
import { getBooks, deleteBook, updateBookStatus } from '../services/BookService';

const BookListScreen = ({ navigation }: any) => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError('Erreur lors de la récupération des livres');
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id); // Supprime le livre de l'API
      setBooks(books.filter((book) => book.id !== id)); // Supprime le livre de l'état local

      Alert.alert('Succès', 'Le livre a été supprimé avec succès');
    } catch (error) {
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
              <View style={{ marginBottom: 10, padding: 10, borderBottomWidth: 1 }}>
                <Text>{`Nom: ${item.name}`}</Text>
                <Text>{`Auteur: ${item.author}`}</Text>
                <Text>{`Éditeur: ${item.editor}`}</Text>
                <Text>{`Année de publication: ${item.year}`}</Text>
                <Text>{`Lu: ${item.read ? 'Oui' : 'Non'}`}</Text>
                <Button title="Détails" onPress={() => navigation.navigate('BookDetail', { bookId: item.id })} />
                <Button title={item.read ? "Marquer comme non lu" : "Marquer comme lu"} onPress={() => handleToggleStatus(item)} />
                <Button title="Supprimer" onPress={() => handleDelete(item.id)} />
              </View>
            );
          }}
        />
        <Button
          title="Ajouter un livre"
          onPress={() => navigation.navigate('AddEditBook', { setBooks })} // Passer setBooks comme prop
        />
      </View>
    </ScrollView>
  );
};

export default BookListScreen;
