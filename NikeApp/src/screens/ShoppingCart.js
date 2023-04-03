import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartListItem from "../components/CartListItem";
import { selectCartItems, selectSubtotal, selectDeliveryPrice , selectTotal} from "../features/cartSlice";
import { useSelector } from "react-redux";


const ShoppingCart = () => {

  const cartItems = useSelector(selectCartItems);

  const subtotal = useSelector(selectSubtotal);
  const deliveryPrice = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <SafeAreaView className='w-full flex-1'>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={() => (
          <View className='m-4 pt-2 border-[#dcdcdc] border-t-2'>
            <View className={style_row}>
              <Text className={style_text}>Subtotal</Text>
              <Text className={style_text}>{subtotal} US$</Text>
            </View>
            <View className={style_row}>
              <Text className={style_text}>Delivery</Text>
              <Text className={style_text}>{deliveryPrice.toFixed(2)} US$</Text>
            </View>
            <View className={style_row}>
              <Text className='font-bold text-[18px]'>Total</Text>
              <Text className='font-bold text-[18px]'>
                {total.toFixed(2)} US$
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        className='bg-black absolute bottom-6 w-[90%] items-center self-center p-4 rounded-full'
        onPress={() => this}
      >
        <Text className='text-white font-[500] text-[16px]'>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style_text = "text-gray-500 text-[16px]";
const style_row = "flex-row justify-between";

export default ShoppingCart;
