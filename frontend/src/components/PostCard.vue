<template>
    <v-card v-for="post in posts" :key="post._id" class="mx-auto my-12" max-width="300">
        <v-img height="250">
        </v-img>
        <v-card-header>
            <v-card-header-text>
                <v-card-title>{{post.title}}</v-card-title>
                <v-card-subtitle>
                    <span class="mr-1">{{post.date}}</span>
                </v-card-subtitle>
            </v-card-header-text>
        </v-card-header>
        <v-card-text>
        </v-card-text>
    </v-card>
    <div>{{posts}}</div>
</template>

<script>
    export default {
        name: "PostCard",
        props: {},
        data() {
            return {
                posts: []
            }
        },
        mounted() {
                    const serverUrl = "http://localhost:8080/api/post/";
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