import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Button,ActivityIndicator } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../types'; // Assuming you have types defined somewhere
import {addToCart, removeFromCart} from '../reducers/cartSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const PokemonList: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<{name: string; url: string}[]>(
    [],
  );

  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  const[isLoading,setIsLoading]  = useState<boolean>(false)
  const [isError,setIsError] = useState<boolean>(false)
  const [errorMessage,setErrorMessage] = useState<string>("")

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0',
        );
        const data = await response.json();
        
        const pokemonWithWeight = await Promise.all(
          data.results.map(async (pokemon: any,index:number) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
              name: pokemon.name,
              url: pokemon.url,
              weight: pokemonData.weight,
              index:index
            };
          })
        );
        // console.log(pokemonWithWeight)
        setPokemonData(pokemonWithWeight);
        setIsLoading(false)
        setIsError(false)
      } catch (error:any) {
        setErrorMessage(error.message)
        setIsError(true);
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleToggleCart = (pokemon: {name: string; url: string,weight:number}) => {
    const itemInCart = cartItems.find(
      (item:any) => item.pokemon.name === pokemon.name,
    );
    if (itemInCart) {
      dispatch(removeFromCart({pokemonName: pokemon.name}));
    } else {
      dispatch(addToCart({pokemon, quantity: 1}));
    }
  };

  const isPokemonInCart = (pokemon: {name: string; url: string}) => {
    return cartItems.some((item:any) => item.pokemon.name === pokemon.name);
  };

  const CardUI = (item:any) => {
    console.log(item)
    const data = item.item;
    return (
      
      <View style={styles.card}
      key={data.index}>
        <>
        <Image
          style={styles.image}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              data.url.split('/')[6]
            }.png`,
          }}
        />
        <Text style={styles.name}>{data.name}</Text>
        <Button
          title={isPokemonInCart(data) ? 'Remove from Cart' : 'Add to Cart'}
          onPress={() => handleToggleCart(data)}
          color={isPokemonInCart(data) ? 'red' : '#008CBA'}
        />
        <View style={{marginBottom:15}}/>
        </>
      </View>
     
    );
  };

  return (
    <>
    {isLoading ?  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator color={"#0000ff"} size={'large'}/>
      </View>:<>
      {/* <SafeAreaView style={styles.container}> */}
      {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
        {/* <ScrollView style={styles.container}> */}
          <FlatList
            data={pokemonData}
            numColumns={2}
            keyExtractor={item => item.name}
            renderItem={CardUI}
            showsVerticalScrollIndicator={false}
            bounces={false}
          />
        {/* </ScrollView> */}
        {/* </ScrollView> */}
        </>
        }
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal:10,
    shadowColor: '#000',
    width:"45%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  name: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
  },
});

export default PokemonList;
