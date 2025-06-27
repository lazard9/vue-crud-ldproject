<script setup>
import CtaCard from './CtaCard.vue'
import { inject } from 'vue';

const auth = inject('auth');
const loggedIn = auth.loggedIn.value;
</script>

<template>
    <div class="grid gap-6 justify-center" :class="{ 'md:grid-cols-2': loggedIn }">
        <CtaCard title="Explore Destinations" description="Browse our collection of beautiful locations."
            buttonText="See all" buttonColor="blue" link="/destinations" />
        <CtaCard v-if:="loggedIn" title="Add a Destination" description="Share your favorite place with others."
            buttonText="Add now" buttonColor="purple" link="/destinations/add" />
    </div>
</template>
