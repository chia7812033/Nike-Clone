import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../features/cartSlice";

const CartListItem = ({ cartItem }) => {

  const dispatch = useDispatch();

  const increaseQuantity = () => {dispatch(changeQuantity({cartItem, quantity: 1}))};

  const decreaseQuantity = () => {dispatch(changeQuantity({ cartItem, quantity: -1 })); };


  return (
    <View className='p-2 px-4 flex-row'>
      <Image
        source={{ uri: cartItem.product.image }}
        className='w-[40%] aspect-square'
      />
      <View className='flex-1 ml-2'>
        <Text className='font-bold text-[18px]'>{cartItem.product.name}</Text>
        <Text className='text-[16px] text-gray'>
          Size {cartItem.product.sizes[0]}
        </Text>

        <View className='mt-auto flex-row items-center'>
          <Feather
            onPress={decreaseQuantity}
            name='minus-circle'
            size={30}
            color='gray'
          />
          <Text className='mx-2 font-bold text-gray-400 text-[18px]'>
            {cartItem.quantity}
          </Text>
          <Feather
            onPress={increaseQuantity}
            name='plus-circle'
            size={30}
            color='gray'
          />
          <Text className='text-[18px] ml-auto font-bold'>
            ${cartItem.product.price * cartItem.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartListItem;
