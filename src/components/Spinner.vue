<script setup>
import { computed } from 'vue';

const props = defineProps({
    size: {
        type: String,
        default: '5',
    },
    color: {
        type: String,
        default: 'text-sky-600 dark:text-sky-300',
    },
});

const sizeClass = computed(() => {
    const sizes = {
        '1': 'h-12 w-12',           // 3rem = 48px
        '2': 'h-20 w-20',           // 5rem = 80px
        '3': 'h-28 w-28',           // 7rem = 112px
        '4': 'h-[9rem] w-[9rem]',   // 9rem = 144px (custom)
        '5': 'h-48 w-48',           // 12rem = 192px
        '6': 'h-[15rem] w-[15rem]', // 15rem = 240px (custom)
        '7': 'h-[18rem] w-[18rem]', // 18rem = 288px (custom)
        '8': 'h-[21rem] w-[21rem]', // 21rem = 336px (custom)
        '9': 'h-[22rem] w-[22rem]', // 22rem = 352px (custom, između 21 i 24)
        '10': 'h-96 w-96',          // 24rem = 384px
    };
    return sizes[props.size] || sizes['5'];
});
</script>

<template>
    <svg :class="`${sizeClass} ${color} animate-spin`" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" role="status" aria-label="Loading">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
</template>
