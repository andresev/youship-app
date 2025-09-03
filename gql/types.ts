export interface ShipmentGQL {
  id: string;
  origin: string;
  destination: string;
  price: number;
  weightLbs: number;
  status: "OPEN" | "BID" | "ASSIGNED";
}

export type GetShipmentsDataTypes = { shipments: ShipmentGQL[] };
