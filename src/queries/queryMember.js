import { gql } from "@apollo/client";

const GETMEMBERS = gql`
  query getMembers {
    members {
      name
      id
      email
      phone
    }
  }
`;

export {GETMEMBERS};
