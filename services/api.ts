import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/", // swap to your mock server or json-server
  timeout: 8000,
});

export type Shipment = {
  id: string;
  origin: string;
  destination: string;
  price: number;
  weightLbs: number;
  status: "OPEN" | "BID" | "ASSIGNED";
};

export async function fetchShipments(page = 1): Promise<Shipment[]> {
  const { data } = await api.get(`/shipments?page=${page}`);
  return data;
}

export async function submitBid(id: string, amount: number) {
  const { data } = await api.post(`/shipments/${id}/bids`, { amount });
  return data;
}
