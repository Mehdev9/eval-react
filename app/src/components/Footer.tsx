import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>© 2025 Gestion des Livres - Tous droits réservés</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#003366',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    color: '#D4AF37',
    fontSize: 14,
  },
});

export default Footer;
