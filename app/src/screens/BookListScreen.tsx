import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, ScrollView } from 'react-native';
import { getBooks, deleteBook, updateBookStatus } from '../services/BookService';
import { useRouter } from 'expo-router'; // Importation de useRouter pour la navigation

const BookListScreen = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Hook de navigation

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
                
                {/* Remplace Link par Button */}
                <Button
                  title="Détails"
                  onPress={() => router.push(`/src/screens/BookDetailScreen?id=${item.id}`)} // Naviguer vers BookDetailScreen avec l'ID
                />
                
                <Button
                  title={item.read ? "Marquer comme non lu" : "Marquer comme lu"}
                  onPress={() => handleToggleStatus(item)}
                />
                
                <Button
                  title="Supprimer"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            );
          }}
        />
        
        {/* Ajouter un livre avec Button */}
        <Button
          title="Ajouter un livre"
          onPress={() => router.push("/src/screens/AddEditBookScreen")} // Naviguer vers AddEditBookScreen
        />
      </View>
    </ScrollView>
  );
};

export default BookListScreen;
