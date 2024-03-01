<script setup lang="ts">
import { storage } from '~/utils/appwrite'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid';
import { COLLECTION_CASTOMERS, DB_ID, STORAGE_ID } from '~/app.constants';
import type { ICustomer } from '~/types/deals.types';

interface ICustomerFormStae extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> { }

interface InputFileEvent extends Event {
    target: HTMLInputElement
}

useSeoMeta({
    title: 'Create customer',
})

const route = useRoute()
const customerId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFormStae>()

const { data, isSuccess } = useQuery({
    queryKey: ['get customer', customerId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_CASTOMERS, customerId)
})

watch(isSuccess, () => {
    const initialData = data.value as unknown as ICustomerFormStae

    setValues({
        avatar_url: initialData.avatar_url,
        email: initialData.email,
        name: initialData.name,
        from_source: initialData.from_source || ''
    })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [formSours, formSoursAttrs] = defineField('from_source')

const { mutate, isPending } = useMutation({
    mutationKey: ['update customer', customerId],
    mutationFn: (data: ICustomerFormStae) => DB.updateDocument(DB_ID, COLLECTION_CASTOMERS, customerId, data)
})

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
    mutationKey: ['upload image', customerId],
    mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
    onSuccess(data) {
        const response = storage.getFileDownload(STORAGE_ID, data.$id)
        setFieldValue('avatar_url', response.href)
    }
})

const onSubmit = handleSubmit(values => mutate(values))

</script>

<template>
    <div class="p-10">
        <TitlePage>
            Creating: {{ (data as unknown as ICustomerFormStae)?.name }}
        </TitlePage>
        <form @submit="onSubmit" class="form">
            <UiInput placeholder="Name" v-model="name" v-bind="nameAttrs" type="text" class="input" />
            <UiInput placeholder="Email" v-model="email" v-bind="emailAttrs" type="text" class="input" />
            <UiInput placeholder="From sours" v-model="formSours" v-bind="formSoursAttrs" type="text" class="input" />

            <img :src="values.avatar_url" :alt="values.name" v-if="values.avatar_url || isUploadImagePending"
                class="w-[50px] h-[50px] rounded my-2">

            <div class="grid w-full max-w-sm items-center gap-1.5 input">
                <label>
                    <div class="text-sm mb-2">Logotipy</div>
                    <UiInput type="file" :onchange="(e: InputFileEvent) => {
                        e?.target?.files?.length && uploadImage(e.target.files[0])
                    }" :disabled="isUploadImagePending" />
                </label>
            </div>

            <UiButton variant="secondary" :disabled="isPending" class="mt-3">
                {{ isPending ? 'Updating...' : 'Update' }}
            </UiButton>
        </form>
    </div>
</template>

<style scoped>
.input {
    @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}
</style>