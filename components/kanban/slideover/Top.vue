<script setup lang="ts">
import dayjs from 'dayjs'
import { useDealSlideStore } from '~/store/deal-slide.store'

const store = useDealSlideStore()



</script>

<template>
    <div class="border-border bg-black/20 rounded p-3">
        <div class="uppercase bold text-xl mb-4">About the deal</div>
        <KanbanSlideoverLabel default-text="Title deal">
            <h2>{{ store.card?.name }}</h2>
        </KanbanSlideoverLabel>

        <KanbanSlideoverLabel default-text="Amount of money">
            {{ convertCurrent(store.card?.price || 0) }}
        </KanbanSlideoverLabel>

        <KanbanSlideoverLabel default-text="Status">
            <UiBadge variant="outline">
                {{ store.card?.status }}
            </UiBadge>
        </KanbanSlideoverLabel>

        <KanbanSlideoverLabel default-text="Client">
            {{ store.card?.companyName }}
        </KanbanSlideoverLabel>

        <KanbanSlideoverLabel default-text="Created data">
            {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
        </KanbanSlideoverLabel>
    </div>
</template>



<style scoped></style>