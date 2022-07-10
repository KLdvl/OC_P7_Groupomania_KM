<template>
    <v-card v-for="(post, index) in posts"
            :key="post._id"
            class="mx-auto mt-4"
            max-width="344"
    >

        <v-img
                :src="post.imageUrl"
                height="200px"
        ></v-img>

        <v-card-title>
            {{post.title}}
        </v-card-title>

        <v-card-subtitle>
            Last modified : {{new Date(post.date).toDateString()}}
        </v-card-subtitle>

        <v-card-actions>
            <router-link :to="{name: 'post', params: {id: post._id}}">
            <v-btn
                    color="secondary"
                    text
            >
                Explore
            </v-btn>
            </router-link>

            <v-spacer></v-spacer>

            <v-btn
                    icon
                    @click="showContent(index)"
            >
                <v-icon>{{ index === selectedIndex ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="index === selectedIndex">
                <v-divider></v-divider>

                <v-card-text>
                    {{post.content}}
                </v-card-text>
            </div>
        </v-expand-transition>

    </v-card>
</template>

<script setup lang="ts">
    import {onMounted, ref} from "vue"

    const posts = ref([])
    const show = ref(false)
    const selectedIndex= ref(null)

    function showContent(index: any) {
        if(selectedIndex.value === null || selectedIndex.value !== index) {
            selectedIndex.value = index
            show.value = true
        } else {
            selectedIndex.value = null
            show.value = false
        }
    }

    const serverUrl = "http://localhost:8080/api/post/"
    const parsedStorage = JSON.parse(localStorage.user)
    const requestOptions : any = {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: `token ${parsedStorage.token}`
        }
    }

    onMounted(() => {
        fetch(serverUrl, requestOptions)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
            })
            .then(data => posts.value = data)
            .catch(err => console.log(err.message))
    })
    </script>