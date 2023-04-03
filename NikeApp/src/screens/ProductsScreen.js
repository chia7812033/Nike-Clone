import { FlatList, Image, View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { selectProducts, setSelectedProduct } from "../features/productsSlice";


const ProductScreen = ({ navigation }) => {

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable onPress={() => {
            navigation.navigate('Product Details');
            dispatch(setSelectedProduct(item.id));
          }} className='w-1/2 p-0.5'>
            <Image source={{ uri: item.image }} className='w-full h-[200px]' />
          </Pressable>
        )}
        numColumns={2}
      />
    </View>
  );
};

export default ProductScreen;
