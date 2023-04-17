import { gql } from "@apollo/client";

const GETAPROJECT = gql`
  query getaProject($id: ID!) {
    project(id: $id) {
      name
      subject
      id
      desc
      status
      member {
        name
        id
        phone
        email
      }
    }
  }
`;

const GETPROJECTS = gql`
  query getProjects {
    projects {
      name
      subject
      id
      desc
      status
    }
  }
`;

export { GETAPROJECT, GETPROJECTS };
