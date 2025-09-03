import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ShipmentGQL } from "@/gql/types";
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export const useToast = () => {
  const [item, setItem] = useState<ShipmentGQL | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const Toast = () => {
    if (isOpen) {
      return (
        <ThemedView style={styles.container}>
          <ThemedView style={styles.toastContainer}>
            <ThemedText type="defaultSemiBold">
              {`${item?.origin} → \n${item?.destination}`}
            </ThemedText>
            <ThemedText>{`Current Price: $${item?.price}`}</ThemedText>
            <TextInput
              style={styles.textInput}
              placeholder="Place Bid"
              value={value}
              keyboardType="number-pad"
              onChangeText={(text) => setValue(text)}
            />
            <ThemedView style={styles.buttonContainer}>
              <Button>Bid</Button>
              <Button
                onPressIn={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      );
    }
  };

  return { item, setItem, isOpen, setIsOpen, Toast };
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
  toastContainer: {
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
    width: 240,
    height: 220,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    zIndex: 11,
  },
  textInput: {
    width: 140,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    columnGap: 14,
  },
});
