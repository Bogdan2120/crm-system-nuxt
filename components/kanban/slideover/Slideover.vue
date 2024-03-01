<script setup lang="ts">
import { useDealSlideStore } from '~/store/deal-slide.store';

const store = useDealSlideStore()

const isLocalOpen = computed({
    get() {
        return store.isOpen
    },
    set(val) {
        store.isOpen = val
    }
})

</script>

<template>
    <div>
        <USlideover v-model="isLocalOpen">
            <UCard class="flex flex-col flex-1 overflow-y-auto" :ui="{
                body: { base: 'flex-1' },
                ring: '',
                divide: 'divide-y divide-border'
            }">
                <template #header>
                    <KanbanSlideoverTop />
                </template>
                <KanbanSlideoverComments />
            </UCard>
        </USlideover>
    </div>
</template>



<style scoped></style>