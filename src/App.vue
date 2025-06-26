<script setup>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import LoginModal from './components/LoginModal.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { isLoggedIn } from '@/utils/auth';

const showLogin = ref(false);
const loggedIn = ref(isLoggedIn());

// const router = useRouter();
const routerKey = ref(0);

function openLoginModal() {
    showLogin.value = true;
}

function closeLoginModal() {
    showLogin.value = false;
}

function onLogout() {
    loggedIn.value = false;
    routerKey.value++;
    // router.push('/');
}

function onLoginSuccess() {
    loggedIn.value = true;
    closeLoginModal();
    routerKey.value++;
    // router.push('/');
}
</script>

<template>
    <Navbar @open-login="openLoginModal" @logout="onLogout" :loggedIn="loggedIn" :key="routerKey" />
    <router-view :loggedIn="loggedIn" :key="routerKey" />
    <Footer :loggedIn="loggedIn" :key="routerKey" />
    <LoginModal v-if="showLogin" @close="closeLoginModal" @login="onLoginSuccess" />
</template>
