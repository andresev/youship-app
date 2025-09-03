import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ShipmentGQL } from "@/gql/types";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export const useToast = () => {
  const [item, setItem] = useState<ShipmentGQL | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const Toast = () => {
    return (
      <ThemedView style={styles.toastContainer}>
        <ThemedText>
          {item?.origin} → {item?.destination}
        </ThemedText>
        <ThemedText>{item?.price}</ThemedText>
        <TextInput />
      </ThemedView>
    );
  };

  return { item, setItem, isOpen, setIsOpen, Toast };
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
    width: 200,
    height: 220,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    zIndex: 10,
  },
});
