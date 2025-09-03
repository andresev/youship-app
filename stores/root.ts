import { fetchShipments } from "@/services/api";
import { cast, flow, types } from "mobx-state-tree";

const Shipment = types.model("Shipments", {
  id: types.identifier,
  origin: types.string,
  destination: types.string,
  price: types.number,
  weightLbs: types.number,
  status: types.enumeration("Status", ["OPEN", "BID", "ASSIGNED"]),
});

const RootStore = types
  .model("RootStore", {
    shipments: types.array(Shipment),
    // page: types.optional(types.number, 1),
    // hasMore: types.optional(types.boolean, true),
    loading: types.optional(types.boolean, false),
    refreshing: types.optional(types.boolean, false),
    // loadingMore: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    fetchInitial: flow(function* () {
      self.loading = true;
      self.error = null;
      try {
        const data = yield fetchShipments(1); // call your API
        self.shipments = cast(data); // replace array contents
      } catch (e: any) {
        self.error = e?.message ?? "Failed to load shipments";
      } finally {
        self.loading = false;
      }
    }),
    refresh: flow(function* () {
      self.refreshing = true;
      self.error = null;
      try {
        const data = yield fetchShipments(1);
        self.shipments = cast(data); // replace list
        // self.page = 1; // reset page since we reloaded
        // self.hasMore = data.length > 0; // keep hasMore accurate
      } catch (e: any) {
        self.error = e?.message ?? "Failed to refresh";
      } finally {
        self.refreshing = false;
      }
    }),
  }));

export const store = RootStore.create({ shipments: [] });
