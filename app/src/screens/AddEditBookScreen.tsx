import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { addBook, updateBook, getBookById } from '../services/BookService';

const AddEditBookScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const bookId = Array.isArray(params.bookId) ? params.bookId[0] : params.bookId;
  
  const [book, setBook] = useState<any>({
    name: '',
    author: '',
    editor: '',
    year: '',
    read: false,
    cover: null,
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setBook({ ...book, cover: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    if (bookId) {
      await updateBook(bookId, book);
    } else {
      await addBook(book);
    }
    router.push('/src/screens/BookListScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{bookId ? 'Modifier le livre' : 'Ajouter un livre'}</Text>

        <TextInput
          value={book.name}
          placeholder="Nom du livre"
          onChangeText={(text) => setBook({ ...book, name: text })}
          style={styles.input}
        />
        <TextInput
          value={book.author}
          placeholder="Auteur"
          onChangeText={(text) => setBook({ ...book, author: text })}
          style={styles.input}
        />
        <TextInput
          value={book.editor}
          placeholder="Éditeur"
          onChangeText={(text) => setBook({ ...book, editor: text })}
          style={styles.input}
        />
        <TextInput
          value={book.year}
          placeholder="Année de publication"
          keyboardType="numeric"
          onChangeText={(text) => setBook({ ...book, year: text })}
          style={styles.input}
        />

        {book.cover && <Image source={{ uri: book.cover }} style={styles.imagePreview} />}

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>
            {book.cover ? 'Changer l\'image' : 'Ajouter une image'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {bookId ? 'Mettre à jour' : 'Enregistrer'}
          </Text>
        </TouchableOpacity>
      </View>
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
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 20,
    width: '80%',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  imageButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 20,
    width: '20%',
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#30d438ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '50%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEditBookScreen;
