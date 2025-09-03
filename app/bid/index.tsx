import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PLACE_BID } from "@/gql/client";
import { useMutation } from "@apollo/client/react";
import { Button } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Bid() {
  const navigation = router;
  const { id, origin, destination, price, status } = useLocalSearchParams<{
    id: string;
    origin: string;
    destination: string;
    price: string;
    status: string;
  }>();

  // Local states
  const [value, setValue] = useState("");

  // Mutation
  const [placeBid, { data, loading, error }] = useMutation(PLACE_BID);

  const handleBid = async () => {
    if (!id) return;

    const amount = Number(value);

    try {
      await placeBid({
        variables: { id, amount },
        optimisticResponse: {
          placeBid: {
            id,
            price: amount,
            status,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
    navigation.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.route} type="subtitle">
        {origin} → {destination}
      </ThemedText>
      <ThemedText style={styles.text}>${price}</ThemedText>
      <TextInput
        style={styles.textInput}
        placeholder="Place Bid"
        value={value}
        keyboardType="number-pad"
        onChangeText={(text) => setValue(text)}
      />
      <Button onPressIn={handleBid}>Bid</Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
  },
  textInput: {
    width: 140,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  route: {},
  text: {},
});
