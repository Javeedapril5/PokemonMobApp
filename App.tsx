import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import PokemonList from './components/PokemonList';
import CartSummary from './components/CartSummary';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './store';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({focused}) => {
              if (route.name === 'Pokemon') {
                return (
                  <Image
                    source={require('./assets/pokemon.png')}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'contain',
                    }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require('./assets/cart.png')}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'contain',
                    }}
                  />
                );
              }
            },
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              // padding: Platform.OS == 'ios' ? 10 : 12,
              flex: 0.09,
            },
          })}>
          <Tab.Screen name="Pokemon" component={PokemonList} />
          <Tab.Screen name="Cart" component={CartSummary} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
