import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GET_SHIPMENTS } from "@/gql/client";
import { GetShipmentsDataTypes } from "@/gql/types";
import { store } from "@/stores/root";
import { useQuery } from "@apollo/client/react";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeScreen() {
  const navigation = router;
  const { data, loading, error, refetch } =
    useQuery<GetShipmentsDataTypes>(GET_SHIPMENTS);

  useEffect(() => {
    store.fetchInitial();
  }, [loading, data]);

  if (store.loading)
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        color={"#0274ad"}
      />
    );

  if (store.error) return <ThemedText>{store.error}</ThemedText>;

  const renderItem = ({ item }: any) => {
    console.log(JSON.stringify(item, null, 2));

    const handleItem = () =>
      navigation.navigate({
        pathname: "/bid",
        params: {
          id: item?.id,
          origin: item?.origin,
          destination: item?.destination,
          price: item?.price,
          status: item?.status,
        },
      });

    return (
      <TouchableOpacity
        onPress={handleItem}
        activeOpacity={0.8}
        style={styles.renderItem}
      >
        <ThemedText style={styles.renderItemText} type="subtitle">
          {item?.origin} → {item?.destination}
        </ThemedText>
        <ThemedText style={styles.renderItemText}>
          ${item?.price} • {item?.weightLbs} lbs • {item?.status}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Shipments</ThemedText>
        </ThemedView>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={store.shipments.slice()}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          refreshing={store.refreshing}
          onRefresh={store.refresh}
        />
      </>
    </SafeAreaView>
  );
}

export default observer(HomeScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    paddingVertical: 14,
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
