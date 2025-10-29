const API_URL = 'http://10.105.1.210:3000'; // Remplace par l'IP de ton PC

// Récupérer tous les livres
export const getBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books`);
    console.log('Response:', response); // Vérifie la réponse brute
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des livres');
    }
    const data = await response.json();
    console.log('Data:', data); // Vérifie les données renvoyées
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Récupérer un livre par ID
export const getBookById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`);
    console.log('Response:', response); // Vérifie la réponse brute
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du livre');
    }
    const data = await response.json();
    console.log('Data:', data); // Vérifie les données renvoyées
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Ajouter un livre
export const addBook = async (book: any) => {
  try {
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    console.log('Response:', response); // Vérifie la réponse brute
    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du livre');
    }

    const data = await response.json();
    console.log('Data:', data); // Vérifie les données renvoyées
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Modifier un livre par ID
export const updateBook = async (id: string, book: any) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    console.log('Response:', response); // Vérifie la réponse brute
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du livre');
    }

    const data = await response.json();
    console.log('Data:', data); // Vérifie les données renvoyées
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Supprimer un livre par ID
export const deleteBook = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'DELETE',
    });

    console.log('Response:', response); // Vérifie la réponse brute
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du livre');
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Changer le statut "lu" ou "non lu"
export const updateBookStatus = async (id: string, book: any) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    console.log('Response:', response); // Vérifie la réponse brute
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du statut');
    }

    const data = await response.json();
    console.log('Data:', data); // Vérifie les données renvoyées
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
