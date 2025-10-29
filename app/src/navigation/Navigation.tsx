import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddEditBookScreen from '../screens/AddEditBookScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import BookListScreen from '../screens/BookListScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="BookList">
      <Stack.Screen name="BookList" component={BookListScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="AddEditBook" component={AddEditBookScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
