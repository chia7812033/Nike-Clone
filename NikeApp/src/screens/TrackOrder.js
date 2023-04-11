import { View, Text, TextInput, ActivityIndicator } from "react-native";
import React from 'react'
import { useGetOrderQuery } from '../features/apiSlice'
import { useState } from 'react'

const TrackOrder = () => {

  const [ref, setRef] = useState("");
  const { data, isLoading, error } = useGetOrderQuery(ref);

  return (
    <View className="p-2">
      <TextInput
        className="p-2 rounded-xl border border-gray-300 my-2"
        value={ref}
        onChangeText={setRef}
        placeholder='Your order reference'
      />
      {isLoading && <ActivityIndicator />}
      {data?.status !== "OK" && <Text>Order not found</Text>}
      {data?.status === "OK" && <Text>Order: {JSON.stringify(data.data)}</Text>}
    </View>
  );
}

export default TrackOrder
