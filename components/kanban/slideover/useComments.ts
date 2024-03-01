import { useQuery } from '@tanstack/vue-query'
import { COLLECTION_COMMENTS, DB_ID } from '~/app.constants'
import { useDealSlideStore } from '~/store/deal-slide.store'

export const useComments = () => {
  const store = useDealSlideStore()
  const cardId = store.card?.id || ''

  return useQuery({
    queryKey: ['deal', cardId],
    queryFn: async () => DB.getDocument(DB_ID, COLLECTION_COMMENTS, cardId),
  })
}
