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
            <v-btn tile color="error">DELETE</v-btn>
            <router-link :to="{name: 'home'}">
            <v-btn tile >GO BACK</v-btn>
            </router-link>
        </v-row>
            </v-container>
</template>

<script>
    export default {
        name: "PostPage",
        data() {
            return {
                post: []
            }
        },
        mounted() {
            const serverUrl = "http://localhost:8080/api/post/";
            const parsedStorage = JSON.parse(localStorage.user)
            const token = parsedStorage.token
            const id = this.$route.params.id
            const requestOptions = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `token ${token}`
                }
            }
            fetch(`${serverUrl}${id}`, requestOptions)
                .then(res => {
                    if(!res.ok) {
                        const error = new Error(res.statusText);
                        error.json = res.json();
                        throw error;
                    }
                    return res.json();
                })
                .then(data => this.post = data)
                .catch(err => console.log(err.message))
        }
    }
</script>
