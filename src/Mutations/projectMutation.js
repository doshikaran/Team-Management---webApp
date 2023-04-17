import { gql } from "@apollo/client";

const ADDPROJECT = gql`
  mutation addProject(
    $name: String!
    $desc: String!
    $subject: String!
    $status: ProjectStatus!
    $memberId: ID!
  ) {
    addProject(
      name: $name
      subject: $subject
      desc: $desc
      status: $status
      memberId: $memberId
    ) {
      name
      id
      subject
      desc
      status
      member {
        name
        id
        email
        phone
      }
    }
  }
`;

const UPDATEPROJECT = gql`
  mutation updateProject(
    $name: String!
    $id: ID!
    $subject: String!
    $desc: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(name: $name, id: $id, desc: $desc, status: $status, subject: $subject) {
      name
      id
      desc
      subject
      status
      member {
        name
        id
        email
        phone
      }
    }
  }
`;

const DELETEPROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export { ADDPROJECT, UPDATEPROJECT, DELETEPROJECT };
