import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Importation des hooks
import { addBook, updateBook, getBookById } from '../services/BookService';

const AddEditBookScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // Récupération du paramètre `bookId` de l'URL
  const bookId = Array.isArray(params.bookId) ? params.bookId[0] : params.bookId;
  const [book, setBook] = useState<any>({
    name: '',
    author: '',
    editor: '',
    year: '',
    read: false,
  });

  useEffect(() => {
    if (bookId) {
      const loadBook = async () => {
        const bookData = await getBookById(bookId);
        setBook(bookData);
      };
      loadBook();
    }
  }, [bookId]);

  const handleSave = async () => {
    let newBook;
    if (bookId) {
      newBook = await updateBook(bookId, book); // Met à jour le livre
    } else {
      newBook = await addBook(book); // Ajoute un nouveau livre
    }

    // Redirige vers la liste des livres après enregistrement
    router.push('/');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        value={book.name}
        placeholder="Nom du livre"
        onChangeText={(text) => setBook({ ...book, name: text })}
        style={{ borderWidth: 1, width: '80%', marginBottom: 10 }}
      />
      <TextInput
        value={book.author}
        placeholder="Auteur"
        onChangeText={(text) => setBook({ ...book, author: text })}
        style={{ borderWidth: 1, width: '80%', marginBottom: 10 }}
      />
      <TextInput
        value={book.editor}
        placeholder="Éditeur"
        onChangeText={(text) => setBook({ ...book, editor: text })}
        style={{ borderWidth: 1, width: '80%', marginBottom: 10 }}
      />
      <TextInput
        value={book.year}
        placeholder="Année de publication"
        keyboardType="numeric"
        onChangeText={(text) => setBook({ ...book, year: text })}
        style={{ borderWidth: 1, width: '80%', marginBottom: 10 }}
      />
      <Button title="Enregistrer" onPress={handleSave} />
    </View>
  );
};

export default AddEditBookScreen;
