import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      email
      name
      createdAt
      likes {
          email
      }

      comments {
        id
        email
        createdAt
        body
      }
    }
  }
`;