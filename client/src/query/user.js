import { gql } from "@apollo/client";

const fragmentUROK = gql`

fragment userPreview on User {
   id
   name
   letter
 }

`
export const GET_ALL_USERS = gql`
   query {
      getAllUsers {
         id, name
      }
   }

`
export const GET_USER_BY_ID = gql`
   query getUserById($id: ID){
      getUserById(id: $id) {
         id,name,letter
      }
   }

`