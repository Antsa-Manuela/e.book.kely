const BASE_URL = 'http://192.168.88.67/soutenance/api';

/**
 * 🔹 Récupère la liste des hôtels
 * @returns {Promise<Array>} Liste des hôtels ou tableau vide en cas d'erreur
 */
export async function getHotels() {
  try {
    const response = await fetch(`${BASE_URL}/getHotels.php`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Format de réponse invalide (attendu: tableau)');
    }

    console.log('✅ Hôtels récupérés :', data);
    return data;
  } catch (error) {
    console.error('❌ Erreur dans getHotels:', error.message);
    return [];
  }
}

/**
 * 🔹 Récupère les détails d’un hôtel spécifique
 * @param {string|number} hotelId - ID de l'hôtel
 * @returns {Promise<Object|null>} Détails de l'hôtel ou null en cas d'erreur
 */
export async function getHotelDetails(hotelId) {
  try {
    const response = await fetch(`${BASE_URL}/getHotelDetails.php?id=${hotelId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object' || !data.success) {
      throw new Error(data?.message || 'Réponse invalide');
    }

    console.log('✅ Détails hôtel :', data.hotel);
    return data.hotel;
  } catch (error) {
    console.error('❌ Erreur dans getHotelDetails:', error.message);
    return null;
  }
}
