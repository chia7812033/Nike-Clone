import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cartSlice";

import { useGetProductQuery } from "../features/apiSlice";

const ProductDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetProductQuery(route.params.id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.error}</Text>;
  }

  const product = data.data;

  const addToCart = () => {
    dispatch(addCartItem({ product }));
  };

  return (
    <View>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: Dimensions.get("window").width,
                aspectRatio: 1,
                backgroundColor: "red",
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View className='p-4 pb-10 mb-12'>
          <Text className='text-[34px] font-[500] my-2'>{product.name}</Text>

          <Text className='font-[500] text-[16px]'>${product.price}</Text>

          <Text className='my-2 text-[18px] leading-6 font-[300]'>
            {product.description}
          </Text>
        </View>

        <TouchableOpacity
          className='bg-black absolute bottom-6 w-[90%] items-center self-center p-4 rounded-full'
          onPress={addToCart}
        >
          <Text className='text-white font-[500] text-[16px]'>Add to cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;
