import { Stack } from "expo-router";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Button } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Stack />
        <View style={styles.buttonContainer}>
         
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
