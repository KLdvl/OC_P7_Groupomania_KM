<template>
    <v-container>
    <h1 class="text-center">{{post.title}}</h1>
    <v-img max-height="200" max-width="250" :src="post.imageUrl"></v-img>
    <p>{{post.content}}</p>
    <p>Last modified : {{new Date(post.date).toDateString()}}</p>
    </v-container>
    <v-container>
        <v-row justify="space-around">
            <v-btn tile color="success"><v-icon left>mdi-pencil</v-icon>EDIT</v-btn>
            <v-btn id="del" @click.stop="onDelete" tile color="error">DELETE</v-btn>
            <router-link :to="{name: 'home'}">
            <v-btn tile >GO BACK</v-btn>
            </router-link>
        </v-row>
            </v-container>
</template>

<script setup lang="ts">
    import {onMounted, ref} from "vue"
    import {useRoute, useRouter } from "vue-router"
    const route = useRoute()
    const router = useRouter()

    const post = ref([])

    const serverUrl = "http://localhost:8080/api/post/"
    const parsedStorage = JSON.parse(localStorage.user)
    const id = route.params.id
    const requestOptions : any = {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: `token ${parsedStorage.token}`
        }
    }

    function onDelete() {
        fetch(`${serverUrl}${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                Authorization: `token ${parsedStorage.token}`
            }
        })
        .then(res => res.ok)
        .catch(err => console.log(err.message))
        router.push({name: 'home'})
    }

    onMounted(()=> {
        fetch(`${serverUrl}${id}`, requestOptions)
        .then(res => {
            if(res.ok) {
                return res.json()
            }
        })
        .then(data => post.value = data)
        .catch(err => console.log(err.message))
    })

</script>