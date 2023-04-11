import { FlatList, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartListItem from "../components/CartListItem";
import {
  selectCartItems,
  selectSubtotal,
  selectDeliveryPrice,
  selectTotal,
  clear,
} from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../features/apiSlice";

const ShoppingCart = () => {

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const deliveryPrice = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  const [createOrder, { data, isLoading, error }] = useCreateOrderMutation({});

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryPrice,
      total,
      customer: {
        name: "Danny",
        address: "123 Main St",
        email: "example@example.com",
      },
    });

    if (result.data?.status === 201) {
      Alert.alert(
        "Order completed successfully",
        `Your order reference is ${result.data.data.ref}`
      );
      dispatch(clear());
    }
  };

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
        onPress={onCreateOrder}
      >
        <Text className='text-white font-[500] text-[16px]'>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style_text = "text-gray-500 text-[16px]";
const style_row = "flex-row justify-between";

export default ShoppingCart;
