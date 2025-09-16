// app/hotel/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

export default function HotelDetails() {
  const { id } = useLocalSearchParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://192.168.88.67/soutenance/api/getHotelDetails.php?id=${id}`)
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
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  image: { width: '100%', height: 200, borderRadius: 12 },
  name: { fontSize: 22, fontWeight: '700', marginTop: 12, color: '#3C1518' },
  location: { fontSize: 16, color: '#69140E' },
  description: { marginTop: 10, fontSize: 14, color: '#484848' },
  price: { marginTop: 10, fontSize: 18, fontWeight: '600', color: '#A44200' },
});
