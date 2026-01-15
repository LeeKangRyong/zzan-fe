import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

import HomeEmptyIcon from '../../assets/icons/home_empty.svg';
import HomeGrayIcon from '../../assets/icons/home_gray.svg';
import FeedEmptyIcon from '../../assets/icons/menu_empty.svg';
import FeedGrayIcon from '../../assets/icons/menu_gray.svg';
import PlusIcon from '../../assets/icons/plus.svg';

const getIconByRouteName = (routeName: string, isFocused: boolean) => {
  const color = isFocused ? Colors.black : Colors.gray;
  const props = { width: 24, height: 24, fill: color };

  if (routeName === 'main') {
    return isFocused ? <HomeEmptyIcon {...props} /> : <HomeGrayIcon {...props} />;
  }
  
  if (routeName === 'feed') {
    return isFocused ? <FeedEmptyIcon {...props} /> : <FeedGrayIcon {...props} />;
  }

  if (routeName === 'post') {
    return <PlusIcon width={24} height={24} fill={Colors.white} />;
  }
  
  return <View />;
};

const getLabelByRouteName = (routeName: string) => {
  if (routeName === 'main') return '홈';
  if (routeName === 'feed') return '피드';
  return null;
};

export const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {state.routes.map((route, index) => {
          if (!['main', 'post', 'feed'].includes(route.name)) return null;

          const isFocused = state.index === index;
          const isPost = route.name === 'post';
          const label = getLabelByRouteName(route.name);
          const textColor = isFocused ? Colors.black : Colors.gray;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable 
              key={route.key} 
              onPress={onPress} 
              style={[styles.tabItem, isPost && styles.plusButtonContainer]}
            >
              {isPost ? (
                <View style={styles.plusButtonOuterCircle}>
                  <View style={styles.plusButtonInnerCircle}>
                    {getIconByRouteName(route.name, isFocused)}
                  </View>
                </View>
              ) : (
                <>
                  {getIconByRouteName(route.name, isFocused)}
                  {label && (
                    <Text style={[styles.label, { color: textColor }]}>{label}</Text>
                  )}
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  contentWrapper: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    marginTop: 4,
  },
  plusButtonContainer: {
    top: -40,
  },
  plusButtonOuterCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonInnerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});