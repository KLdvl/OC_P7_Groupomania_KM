<template>
    <v-app-bar class="bg-tertiary">
        <nav class="text-secondary d-flex w-100 justify-space-between">
            <div>
            <router-link to="/">Home</router-link> |
            <router-link to="/auth/sign_up">Sign-up</router-link> |
            <router-link to="/auth/log_in">Log-in</router-link>
            </div>
            <div>
                <router-link v-if="logged === true" @click="logout" to="/auth/log_in">Log-out</router-link>
            </div>
        </nav>
    </v-app-bar>
</template>

<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    const logged = ref(false)

    function logout() {
        window.localStorage.removeItem('user')
    }

    onMounted(()=> {
        const storage = window.localStorage.getItem('user')
       storage ? logged.value = true : logged.value = false
    })

</script>

<style>
    a {
        text-decoration: none;
    }
    a:visited {
        color: inherit;
    }
    a:hover {
        color: white;
    }
</style>