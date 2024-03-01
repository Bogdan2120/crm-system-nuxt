<script setup lang="ts">
import { account } from '@/utils/appwrite'

import { useAuthStore, useIsLoadingStore } from '~/store/auth.store'

const isLoadingStore = useIsLoadingStore()
const store = useAuthStore()
const router = useRouter()


const logout = async () => {
    isLoadingStore.set(true)
    await account.deleteSession('current')
    store.clear()
    await router.push('/login')
    isLoadingStore.set(false)
}
</script>

<template>
    <aside class="px-5 bg-sidebar py-8 h-full relative w-full">
        <button class="absolute top-2 right-3 transition-colors hover:text-primary">
            <Icon name="line-md:log-out" size="20" @click="logout" />
        </button>

        <NuxtLink to="/" class="mb-10 block">
            <NuxtImg src="./logo.svg" alt="Logo" width="120px" class="mx-auto" />
        </NuxtLink>


        <LayoutMenu />

    </aside>
</template>

<style scoped></style>
