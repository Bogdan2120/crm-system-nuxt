<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    defaultText: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <div class=" mb-3">
        <label v-if="defaultText" class="opacity-75 mb-0.5 block text-xs">
            {{ defaultText }}
        </label>
        <div class="text-base">
            <slot />
        </div>
    </div>
</template>



<style scoped></style>