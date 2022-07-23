<template>
    <!--    <v-card v-for="(post, index) in posts"-->
    <!--            :key="post._id"-->
    <!--            class="mx-auto mt-4"-->
    <!--            max-width="344"-->
    <!--    >-->

    <!--        <v-img-->
    <!--                :src="post.imageUrl"-->
    <!--                height="200px"-->
    <!--        ></v-img>-->

    <!--        <v-card-title>-->
    <!--            {{post.title}}-->
    <!--        </v-card-title>-->

    <!--        <v-card-subtitle>-->
    <!--            Last modified : {{new Date(post.date).toDateString()}}-->
    <!--        </v-card-subtitle>-->

    <!--        <v-card-actions>-->
    <!--            <router-link :to="{name: 'post', params: {id: post._id}}">-->
    <!--                <v-btn-->
    <!--                        color="secondary"-->
    <!--                        text-->
    <!--                >-->
    <!--                    Explore-->
    <!--                </v-btn>-->
    <!--            </router-link>-->

    <!--            <v-spacer></v-spacer>-->

    <!--            <v-btn-->
    <!--                    icon-->
    <!--                    @click="showContent(index)"-->
    <!--            >-->
    <!--                <v-icon>{{ index === selectedIndex ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>-->
    <!--            </v-btn>-->
    <!--        </v-card-actions>-->
    <!--        <v-expand-transition>-->
    <!--            <div v-show="index === selectedIndex">-->
    <!--                <v-divider></v-divider>-->

    <!--                <v-card-text>-->
    <!--                    {{post.content}}-->
    <!--                </v-card-text>-->
    <!--            </div>-->
    <!--        </v-expand-transition>-->
    <!--    </v-card>-->

    <v-col cols="12">
        <v-card
                class="mb-5"
                v-for="post in posts"
                :key="post._id"
                color="tertiary"
                theme="dark"
        >
            <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                    <v-card-title class="text-h5">
                        {{post.title}}
                    </v-card-title>

                    <v-card-subtitle>Last modified : {{new Date(post.date).toDateString()}}</v-card-subtitle>

                    <v-card-actions>
                        <router-link :to="{name: 'post', params: {id: post._id}}" custom v-slot="{navigate}">
                        <v-btn
                                @click="navigate"
                                role="link"
                                class="ml-2"
                                variant="outlined"
                                size="small"
                        >
                            EXPLORE
                        </v-btn>
                        </router-link>
                    </v-card-actions>
                </div>

                <v-avatar
                        class="ma-3"
                        size="125"
                        rounded="0"
                >
                    <v-img :src="post.imageUrl"></v-img>
                </v-avatar>
            </div>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
    import {onMounted, ref} from "vue"

    const posts = ref([])
    const show = ref(false)
    const selectedIndex = ref(-1)


    function showContent(index: number) {
        if (selectedIndex.value === -1 || selectedIndex.value !== index) {
            selectedIndex.value = index
            show.value = true
        } else {
            selectedIndex.value = -1
            show.value = false
        }
    }

    const serverUrl = "http://localhost:8080/api/post/"
    const parsedStorage = JSON.parse(localStorage.user)
    const requestOptions: { method: string, mode: 'cors', headers: { Authorization: string } } = {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: `token ${parsedStorage.token}`
        }
    }

    onMounted(() => {
        fetch(serverUrl, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => posts.value = data)
            .catch(err => console.error(err.message))
    })
</script>