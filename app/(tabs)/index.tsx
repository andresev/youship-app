import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GET_SHIPMENTS } from "@/gql/client";
import { GetShipmentsDataTypes } from "@/gql/types";
import { store } from "@/stores/root";
import { useQuery } from "@apollo/client/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeScreen() {
  const { data, loading, error } =
    useQuery<GetShipmentsDataTypes>(GET_SHIPMENTS);
  useEffect(() => {
    store.fetchInitial();
    console.log(JSON.stringify(data?.shipments[0], null, 2));
  }, [loading]);

  if (store.loading)
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        color={"red"}
      />
    );

  if (store.error) return <ThemedText>{store.error}</ThemedText>;

  const renderItem = ({ item }: any) => {
    return (
      <ThemedView style={styles.renderItem}>
        <ThemedText style={styles.renderItemText} type="subtitle">
          {item.origin} → {item.destination}
        </ThemedText>
        <ThemedText style={styles.renderItemText}>
          ${item.price} • {item.weightLbs} lbs • {item.status}
        </ThemedText>
      </ThemedView>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Test Data</ThemedText>
        <HelloWave />
      </ThemedView>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={store.shipments.slice()}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        refreshing={store.refreshing}
        onRefresh={store.refresh}
      />
    </SafeAreaView>
  );
}

export default observer(HomeScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flatlist: {
    flex: 1,
  },
  renderItem: {
    paddingVertical: 20,
    paddingHorizontal: "5%",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#0274ad",
  },
  renderItemText: {
    color: "white",
  },
});
