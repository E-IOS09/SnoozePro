import { View, Platform , StyleSheet} from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from 'phosphor-react-native';

export function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  
  
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key} // ✅ Fixed
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={ styles.tabBarItem}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
                
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
    tabBar: {
      position: 'absolute',
      bottom: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginHorizontal: 80,
      paddingVertical: 15 ,
      borderRadius: 35,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 10},
      shadowRadius: 10,
      shadowOpacity: 0.1,
    },

    tabBarItem:{
        flex:1, 
        justifyContent: "center",
        alignItems: 'center',
        gap : 5 
    }
  });

