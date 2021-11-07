import { gql } from '@apollo/client';

// a query to grab the current user who if they have a new saved or removed book-- this will be updated immediately to generate on the SAVED BOOKS PAGE
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
