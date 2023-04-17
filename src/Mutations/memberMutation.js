import { gql } from "@apollo/client";

const ADDMEMBER = gql`
  mutation addMember($name: String!, $email: String!, $phone: String!) {
    addMember(name: $name, email: $email, phone: $phone) {
      name
      id
      email
      phone
    }
  }
`;

const DELETEMEMBER = gql`
  mutation deleteMember($id: ID!) {
    deleteMember(id: $id) {
      name
      id
      email
      phone
    }
  }
`;

export {ADDMEMBER, DELETEMEMBER}