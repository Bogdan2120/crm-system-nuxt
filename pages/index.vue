<script setup lang="ts">
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/vue-query';

import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'
import { useDealSlideStore } from '~/store/deal-slide.store';
import type { IColumn, ICard } from '~/components/kanban/kanban.types';
import { convertCurrent } from '~/utils/convertCurrent'
import type { EnumStatus } from '~/types/deals.types';
import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
import { generateColumnStyle } from '~/components/kanban/generate-gradient'
useSeoMeta({
    title: "Home | CRM System"
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()

const store = useDealSlideStore()

type TypeMutationVariabls = {
    docId: string,
    status?: EnumStatus
}

const { mutate } = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({ docId, status }: TypeMutationVariabls) => DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status, }),
    onSuccess: () => refetch()
})

const handleDragStart = (card: ICard, column: IColumn) => {
    dragCardRef.value = card
    sourceColumnRef.value = column
}

const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
}

const handleDrag = (targetColum: IColumn) => {
    if (dragCardRef.value && sourceColumnRef.value) {
        mutate({
            docId: dragCardRef.value.id,
            status: targetColum.id
        })
    }
}
</script>

<template>
    <div class="p-10">
        <TitlePage> CRM Sustem by WD Group</TitlePage>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-5 gap-16">
                <div v-for="(column, index) in data" :key="column.id" @dragover="handleDragOver"
                    @drop="() => handleDrag(column)" class=" min-h-screen">
                    <div class=" rounded bg-slate-700 py-1 px-5 mb-2 text-center"
                        :style="generateColumnStyle(index, data?.length)">
                        {{ column.name }}
                    </div>
                    <div>
                        <KanbanCreateDeal :refetch="refetch" :status="column.id" />
                        <UiCard v-for="card in column.items" :key="card.id" class="mb-3" draggable="true"
                            @dragstart="() => handleDragStart(card, column)">
                            <UiCardHeader role="button" @click="store.set(card)">
                                <UiCardTitle>
                                    {{ card.name }}
                                </UiCardTitle>
                                <UiCardDescription>
                                    {{ convertCurrent(card.price) }}
                                </UiCardDescription>
                            </UiCardHeader>

                            <UiCardContent class="text-xs">
                                <div>Company: </div>
                                {{ card.companyName }}
                            </UiCardContent>
                            <UiCardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
                        </UiCard>
                    </div>
                </div>
            </div>

            <KanbanSlideover />
        </div>
    </div>
</template>


~/components/kanban/generate-gradient