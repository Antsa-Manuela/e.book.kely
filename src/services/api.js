import { API_URL } from '../utils/config';

/**
 * 🔹 Récupère la liste des hôtels
 */
export async function getHotels() {
  try {
    const response = await fetch(`${API_URL}/getHotels.php`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Format de réponse invalide');

    console.log('✅ Hôtels récupérés :', data);
    return data;
  } catch (error) {
    console.error('❌ Erreur dans getHotels:', error.message);
    return [];
  }
}

/**
 * 🔹 Récupère les détails d’un hôtel spécifique
 */
export async function getHotelDetails(hotelId) {
  try {
    const response = await fetch(`${API_URL}/getHotelDetails.php?id=${hotelId}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

    const data = await response.json();
    if (!data?.success) throw new Error(data?.message || 'Réponse invalide');

    console.log('✅ Détails hôtel :', data.hotel);
    return data.hotel;
  } catch (error) {
    console.error('❌ Erreur dans getHotelDetails:', error.message);
    return null;
  }
}
