import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import ProductDetailsScreen from "./screens/ProductDetailScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import TrackOrder from "./screens/TrackOrder";

import { TouchableOpacity, Text } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectCartLength } from "./features/cartSlice";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const cartLength = useSelector(selectCartLength);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          name='Products'
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <>
                <TouchableOpacity className='mx-1 p-2'>
                  <MaterialCommunityIcons
                    onPress={() => navigation.navigate("Track Order")}
                    name='truck-delivery'
                    size={22}
                    color='gray'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Cart")}
                  className='flex-row mx-1 p-2'
                >
                  <FontAwesome5 name='shopping-cart' size={18} color='gray' />
                  <Text className='ml-1 font-[500]'>{cartLength}</Text>
                </TouchableOpacity>
              </>
            ),
          })}
        />
        <Stack.Screen
          name='Product Details'
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name='Cart' component={ShoppingCart} />
        <Stack.Screen name='Track Order' component={TrackOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
