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
    // Tailwind nema baš svaki "3x" korak, zato biramo najbliže
    const sizes = {
        '1': 'h-12 w-12',   // 3 * 4 = 12 (3rem)
        '2': 'h-18 w-18',   // Tailwind nema h-18, pa možemo h-20 (5rem) ili h-[72px]
        '3': 'h-24 w-24',   // 3 * 8 = 24 (6rem)
        '4': 'h-28 w-28',   // 3 * 10 = 30, najbliže h-28 (7rem)
        '5': 'h-36 w-36',   // Tailwind nema h-36, može se custom ili h-40 (10rem)
        '6': 'h-48 w-48',   // 3 * 16 = 48 (12rem)
        '7': 'h-56 w-56',   // Tailwind nema h-56, može h-56 (14rem)
        '8': 'h-72 w-72',   // 3 * 24 = 72 (18rem)
        '9': 'h-80 w-80',   // Tailwind nema h-80, može se custom
        '10': 'h-96 w-96',  // 3 * 32 = 96 (24rem)
    };
    // Za veličine koje Tailwind nema u stock verziji, možeš koristiti JIT custom klase (npr. h-[72px]), ili ih prilagoditi po potrebi.

    // Za primer, umesto h-18, h-36, h-56, h-80 možeš koristiti custom:
    const fallbackSizes = {
        '2': 'h-20 w-20',   // 5rem ~ 80px
        '5': 'h-40 w-40',   // 10rem ~ 160px
        '7': 'h-56 w-56',   // 14rem ~ 224px
        '9': 'h-80 w-80',   // 20rem ~ 320px
    };

    if (!sizes[props.size]) {
        return 'h-48 w-48';
    }

    // Ako klasa postoji u fallback i stock-u, uzmi stock; inače fallback
    return sizes[props.size] || fallbackSizes[props.size] || 'h-48 w-48';
});
</script>

<template>
    <svg :class="`${sizeClass} ${color} animate-spin`" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" role="status" aria-label="Loading">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
</template>
