import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoSmall from '@/assets/logo/logo_small.svg';
import UserIcon from '@/assets/icons/user.svg';
import { MapSearch } from './MapSearch';
import { Colors, Layout } from '@/shared/constants';

interface MapHeaderProps {
  onProfilePress: () => void;
}

export const MapHeader = ({ onProfilePress }: MapHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <LogoSmall width={60} height={13} />
      <MapSearch />
      <TouchableOpacity onPress={onProfilePress}>
        <UserIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
});
