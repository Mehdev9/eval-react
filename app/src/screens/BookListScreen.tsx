import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getBooks,
  deleteBook,
  updateBookStatus,
  updateBookFavorite,
  updateBookRating,
} from "../services/BookService";
import { useRouter } from "expo-router";

const StarRating = ({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (newRating: number) => void;
}) => {
  const handlePress = (newRating: number) => {
    onRatingChange(newRating);
  };

  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handlePress(star)}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={30}
            color="gold"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BookListScreen = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");  
  const [filter, setFilter] = useState<string>("all");
  const [sortCriteria, setSortCriteria] = useState<string>("title");
  const router = useRouter();

  const loadBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
      setFilteredBooks(booksData);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des livres");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    let filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter === "read") {
      filtered = filtered.filter((book) => book.read);
    } else if (filter === "unread") {
      filtered = filtered.filter((book) => !book.read);
    } else if (filter === "favorites") {
      filtered = filtered.filter((book) => book.favorite);
    }

    if (sortCriteria === "title") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === "author") {
      filtered.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortCriteria === "theme") {
      filtered.sort((a, b) => a.editor.localeCompare(b.editor));
    }

    setFilteredBooks(filtered);
  }, [searchQuery, filter, sortCriteria, books]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
      Alert.alert("Succès", "Le livre a été supprimé avec succès");
    } catch {
      setError("Erreur lors de la suppression du livre");
      Alert.alert("Erreur", "Échec de la suppression du livre");
    }
  };

  const handleToggleStatus = async (book: any) => {
    try {
      const updatedBook = await updateBookStatus(book.id, {
        ...book,
        read: !book.read,
      });
      setBooks(books.map((b) => (b.id === book.id ? updatedBook : b)));
    } catch (error) {
      setError("Erreur lors de la mise à jour du statut");
    }
  };

  const toggleFavorite = async (book: any) => {
    try {
      const updatedBook = await updateBookFavorite(book.id, !book.favorite);
      setBooks(books.map((b) => (b.id === book.id ? updatedBook : b)));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleRatingChange = async (id: string, newRating: number) => {
    try {
      await updateBookRating(id, newRating);
      setBooks(
        books.map((book) =>
          book.id === id ? { ...book, rating: newRating } : book
        )
      );
    } catch (error) {
      setError("Erreur lors de la mise à jour de la note");
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

        <TextInput
          style={styles.searchInput}
          placeholder="Recherche par titre ou auteur"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filters}>
          <Text style={styles.sortText}>Filtrer par:</Text>

          <TouchableOpacity onPress={() => setFilter("all")}>
            <Text style={styles.filterText}>Tous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("read")}>
            <Text style={styles.filterText}>Lu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("unread")}>
            <Text style={styles.filterText}>Non Lu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("favorites")}>
            <Text style={styles.filterText}>Favoris</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sortOptions}>
          <Text style={styles.sortText}>Trier par:</Text>
          <TouchableOpacity onPress={() => setSortCriteria("title")}>
            <Text style={styles.sortOption}>Titre</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortCriteria("author")}>
            <Text style={styles.sortOption}>Auteur</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortCriteria("theme")}>
            <Text style={styles.sortOption}>Thème</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.cardButton, styles.addButton]}
          onPress={() => router.push("/src/screens/AddEditBookScreen")}
        >
          <Text style={styles.cardButtonDeleteText}>Ajouter un livre</Text>
        </TouchableOpacity>

        {filteredBooks.map((item) => (
          <View style={styles.card} key={item.id}>
            <View style={styles.cardContent}>
              <View style={styles.textContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardAuthor}>Auteur: {item.author}</Text>
                <Text style={styles.cardDetails}>Éditeur: {item.editor}</Text>
                <Text style={styles.cardDetails}>Année de publication: {item.year}</Text>
                <Text style={styles.cardDetails}>Lu: {item.read ? "Oui" : "Non"}</Text>

                <View style={styles.favoriteContainer}>
                  <Text style={styles.favoriteText}>Favoris:</Text>
                  <Ionicons
                    name={item.favorite ? "heart" : "heart-outline"}
                    size={24}
                    color="red"
                    onPress={() => toggleFavorite(item)}
                  />
                </View>

                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Évaluez ce livre :</Text>
                  <StarRating
                    rating={item.rating}
                    onRatingChange={(newRating) =>
                      handleRatingChange(item.id, newRating)
                    }
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() =>
                      router.push(`/src/screens/BookDetailScreen?id=${item.id}`)
                    }
                  >
                    <Text style={styles.cardButtonText}>Détails</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => handleToggleStatus(item)}
                  >
                    <Text style={styles.cardButtonText}>
                      {item.read ? "Marquer comme non lu" : "Marquer comme lu"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.cardButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.cardButtonDeleteText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {item.cover && (
                <Image source={{ uri: item.cover }} style={styles.cardImage} />
              )}
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
    backgroundColor: "#f7f7f7",
    width: "60%",
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: "40%",
    alignSelf: "center",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    gap: 15,
  },
  filterText: {
    fontSize: 16,
    color: "#007AFF",
  },
  sortOptions: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 15,
  },
  sortText: {
    fontSize: 16,
    fontWeight: "600",
  },
  sortOption: {
    fontSize: 16,
    color: "#007AFF",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    flexDirection: "row",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textContent: {
    flex: 1,
    paddingRight: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardAuthor: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
  cardDetails: {
    fontSize: 14,
    marginBottom: 4,
    color: "#777",
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  favoriteText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 10,
  },
  addButton: {
    backgroundColor: "#30d438ff",
    width: "20%",
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cardButtonText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
   cardImage: {
  width: 150,
  height: 225,
  borderRadius: 10,
  marginBottom: 10,
  resizeMode: 'contain',
},
  deleteButton: {
    backgroundColor: "#E53935",
  },
  cardButtonDeleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "500",
  },
});

export default BookListScreen;
