import React ,{useState}from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Location from './Location';

import {
  removeFromCart,
  adjustQuantity,
  clearCart,

} from '../reducers/cartSlice';

const CartSummary: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  console.log(cartItems)
  const dispatch = useDispatch();
  const [locationData, setLocationData] = useState<any>();

  const fetchLocation = async () => {
    try {
      const location = await Location.getCurrentLocation();
      setLocationData(location);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveItem = (pokemonName: string) => {
    dispatch(removeFromCart({pokemonName}));
  };

  const handleAdjustQuantity = (pokemonName: string, quantity: number) => {
    dispatch(adjustQuantity({pokemonName, quantity}));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const getTotalPrice = () =>{
       let total  = 0;
       cartItems.map((item:any) => {
           total += item.quantity * item.pokemon.weight;
       })
      return total;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Summary:</Text>
      {cartItems.map((item:any) => (
        <View key={item.pokemon.name} style={styles.cartItem}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.pokemon.name}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.quantity}>weight: {item.pokemon.weight}</Text>
            <Text style={styles.quantity}>price: {item.pokemon.weight* item.quantity}</Text>
          </View>
          <View style={styles.actions}>
            <View style={{marginRight:20}}>
              <Button
                title="+"
                onPress={() =>
                  handleAdjustQuantity(item.pokemon.name, item.quantity + 1)
                }
              />
            </View>
            <View style={{marginRight:20}}>
              <Button
                title="-"
                onPress={() =>
                  handleAdjustQuantity(item.pokemon.name, item.quantity - 1)
                }
              />
            </View>
            <View style={{marginRight:5}}>
              <Button
                title="Remove"
                onPress={() => handleRemoveItem(item.pokemon.name)}
              />
            </View>
          </View>
        </View>
      ))}
      {cartItems.length > 0 && (
        <View style={{marginTop:15,marginBottom:15}}>
          <Text style={styles.totalPrice}> Total Price : {getTotalPrice()}</Text>
        <Button title="Clear Cart" onPress={handleClearCart} />
        </View>
      )}
      <View style={{marginTop:30,marginBottom:10}}>
      <Button title="Fetch Location" onPress={fetchLocation} />
      {locationData && (
        <View>
          <Text>Latitude: {locationData.latitude}</Text>
          <Text>Longitude: {locationData.longitude}</Text>
        </View>
      )}
     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor:'#ffffff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    marginTop: 20,
  },
  totalPrice :{
   margin:20,
   fontSize:20,
   color:"#000000"
   

  }
});

export default CartSummary;
