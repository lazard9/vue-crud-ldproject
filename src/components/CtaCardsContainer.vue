<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import CtaCard from './CtaCard.vue';

const auth = useAuthStore();
const loggedIn = computed(() => auth.loggedIn);
</script>

<template>
    <div class="grid gap-6 md:grid-cols-2 justify-center">
        <CtaCard title="Explore Destinations" description="Browse our collection of beautiful locations."
            buttonText="See all" buttonColor="blue" link="/destinations" />

        <CtaCard v-if="loggedIn" title="Add a Destination"
            description="Share your favorite place with others." buttonText="Add now" buttonColor="purple"
            link="/destinations/add" />

        <CtaCard v-else title="Join the community" description="Log in to contribute your own destinations!"
            buttonText="Login" buttonColor="green" :action="auth.openLoginModal" />
    </div>
</template>
