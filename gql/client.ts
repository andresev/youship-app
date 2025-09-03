import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: `http://localhost:4000` }),
  cache: new InMemoryCache(),
});

const GET_SHIPMENTS = gql`
  query GetShipments {
    shipments {
      id
      origin
      destination
      price
      weightLbs
      status
    }
  }
`;

const PLACE_BID = gql`
  mutation TryBid($id: ID!, $amount: Int!) {
    placeBid(id: $id, amount: $amount) {
      id
      price
      status
    }
  }
`;

export { client, GET_SHIPMENTS, gql };
