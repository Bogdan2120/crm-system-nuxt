<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { COLLECTION_CASTOMERS, DB_ID } from '~/app.constants';
import type { ICustomer } from '~/types/deals.types';

useSeoMeta({
    title: 'Customers',
    description: 'List of Customers',
})

const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CASTOMERS)
})

//const customers = (data?.value?.documents as unknown as ICustomer[])
</script>

<template>
    <div class="p-10">
        <TitlePage>Customers</TitlePage>
        <div v-if="isLoading">Loading...</div>
        <UiTable v-else>
            <UiTableHeader>
                <UiTableRow>
                    <UiTableHead class="w-[80px]">Image</UiTableHead>
                    <UiTableHead class="w-[80px]">Name company</UiTableHead>
                    <UiTableHead class="w-[80px]">Email</UiTableHead>
                    <UiTableHead class="w-[80px]">From source</UiTableHead>
                </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
                <UiTableRow v-for="customer in (customers?.documents as unknown as ICustomer[])" :key="customer.$id">
                    <UiTableCell class="w-[80px]">
                        <NuxtLink :to="`/customers/edit/${customer.$id}`">
                            <NuxtImg :src="customer.avatar_url" :alt="customer.name"
                                class="w-[50px] h-[50px] object-contain rounded-full" />
                        </NuxtLink>
                    </UiTableCell>
                    <UiTableCell class=" font-medium">{{ customer.name }}</UiTableCell>
                    <UiTableCell>{{ customer.email }}</UiTableCell>
                    <UiTableCell>{{ customer.from_source }}</UiTableCell>
                </UiTableRow>
            </UiTableBody>
        </UiTable>
    </div>
</template>