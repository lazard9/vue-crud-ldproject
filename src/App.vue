<script setup>
import { ref, provide } from 'vue';
// import { useRouter } from 'vue-router';
import LoginModal from './components/LoginModal.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { isLoggedIn } from '@/utils/auth';

const showLogin = ref(false);
const loggedIn = ref(isLoggedIn());

// const router = useRouter();
const routerKey = ref(0);

// Modal open/close
function openLoginModal() {
    showLogin.value = true;
}

function closeLoginModal() {
    showLogin.value = false;
}

// Login/logout
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

function login(username, password) {
    if (username === 'admin' && password === 'password') {
        document.cookie = "session=1; max-age=3600; path=/";
        onLoginSuccess();
        return { success: true };
    } else {
        return { success: false, message: 'Invalid username or password.' };
    }
}

// PROVIDE login modal controls and status
provide('auth', {
    showLogin,
    openLoginModal,
    closeLoginModal,
    onLoginSuccess,
    onLogout,
    login,
    loggedIn,
});
</script>

<template>
    <Navbar :loggedIn="loggedIn" :key="routerKey" />
    <router-view :loggedIn="loggedIn" :key="routerKey" />
    <Footer :loggedIn="loggedIn" :key="routerKey" />
    <LoginModal v-if="showLogin" />
</template>
