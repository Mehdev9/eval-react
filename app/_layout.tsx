import { Stack } from "expo-router";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Button } from 'react-native';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Application de Gestion de Livres</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Stack />
        <View style={styles.buttonContainer}>
          <Button
            title="Ajouter un livre"
            onPress={() => console.log("Ajouter un livre")}
            color="#4CAF50" // Bouton vert (le même vert que le background)
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4caf4fc3', // Vert doux
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20, // Pour donner un peu d'espace en bas
  },
  buttonContainer: {
    marginTop: 20,
  },
});
