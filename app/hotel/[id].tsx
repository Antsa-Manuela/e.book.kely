import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { API_URL } from '../../src/utils/config';

export default function HotelDetails() {
  const { id } = useLocalSearchParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/getHotelDetails.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setHotel(data.hotel);
        else console.warn(data.message);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (!hotel) return <Text style={{ marginTop: 50 }}>Hôtel introuvable</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: hotel.image_url }} style={styles.image} />
      <Text style={styles.name}>{hotel.nom}</Text>
      <Text style={styles.location}>{hotel.localisation}</Text>
      <Text style={styles.description}>{hotel.description}</Text>
      <Text style={styles.price}>{hotel.prixParNuit} Ar / nuit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
// styles ici
});
