import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useFeedTabViewModel = () => {
  const [location, setLocation] = useState('서울 마포구');

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const currentLocation = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    if (address[0]) {
      const city = address[0].city || '';
      const district = address[0].district || '';
      const formattedLocation = district ? `${city} ${district}` : city || '서울 마포구';
      setLocation(formattedLocation);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location };
};
