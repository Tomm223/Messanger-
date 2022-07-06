import { gql } from "@apollo/client"
export const GET_MESSAGES_LIMIT = gql`
   query getMessagesLimit ($limit: Int) {

      getMessagesLimit(limit: $limit) {
         id, name, message
      }
   }

` 