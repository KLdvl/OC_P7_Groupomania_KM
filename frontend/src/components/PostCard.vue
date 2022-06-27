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
                    @click="selectedIndex = index"
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

<script>
    export default {
        name: "PostCard",
        props: {},
        data() {
            return {
                show: false,
                selectedIndex: null,
                posts: []
            }
        },
        mounted() {
                    const serverUrl = "http://localhost:8080/api/post/";
                    // if(!localStorage.user) {
                    //     return
                    // }
                    const parsedStorage = JSON.parse(localStorage.user)
                    const token = parsedStorage.token
                    const requestOptions = {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            Authorization: `token ${token}`
                        }
                    }
                    fetch(serverUrl, requestOptions)
            .then(res => {
                if(!res.ok) {
                    const error = new Error(res.statusText);
                    error.json = res.json();
                    throw error;
                }
                return res.json();
            })
            .then(data => this.posts = data)
            .catch(err => console.log(err.message))
        }
    }
</script>