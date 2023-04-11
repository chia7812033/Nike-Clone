import {
  FlatList,
  Image,
  View,
  Pressable,
  ActivityIndicator,
  Text,
} from "react-native";

import { useGetProductsQuery } from "../features/apiSlice";

const ProductScreen = ({ navigation }) => {

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Error for fetching data</Text>
  }

  const products = data.data

  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Product Details", {id: item._id});
              // dispatch(setSelectedProduct(item.id));
            }}
            className='w-1/2 p-0.5'
          >
            <Image source={{ uri: item.image }} className='w-full h-[200px]' />
          </Pressable>
        )}
        numColumns={2}
      />
    </View>
  );
};

export default ProductScreen;
