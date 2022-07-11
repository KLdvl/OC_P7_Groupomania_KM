<template>
    <v-container>
    <h1 class="text-center">{{post.title}}</h1>
    <v-img max-height="200" max-width="250" :src="post.imageUrl"></v-img>
    <p>{{post.content}}</p>
    <p>Last modified : {{new Date(post.date).toDateString()}}</p>
    </v-container>
    <v-container>
        <v-row>
            <v-btn @click.stop="onLike">LikeBtn</v-btn>
            <div class="mr-5">{{post.likes}} LIKES</div>
            <v-btn @click.stop="onDislike">DislikeBtn</v-btn>
            <div>{{post.dislikes}} DISLIKES</div>
        </v-row>
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
    const like = ref(0)

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
        .then(res => {
            res.ok
            router.push({name: 'home'})
        })
        .catch(err => console.log(err.message))
    }

    onMounted(()=> {
        fetch(`${serverUrl}${id}`, requestOptions)
        .then(res => {
            if(res.ok) {
                return res.json()
            }
        })
        .then(data => {
            post.value = data
            if(data.usersLiked.includes(parsedStorage.userId)) {
                like.value = 1
            }
            if(data.usersDisliked.includes(parsedStorage.userId)) {
                like.value = -1
            }
        })
        .catch(err => console.log(err.message))
    })

    function onLike() {
        let likeValue: any = {}
       switch(like.value) {
           case 0:
               likeValue = {
                       like: 1,
                       userId: parsedStorage.userId
                   }
               break;
           case 1:
               likeValue = {
                   like: 0,
                   userId: parsedStorage.userId
               }
               break;
               }

        fetch(`${serverUrl}${id}/like`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${parsedStorage.token}`
            },
            body: JSON.stringify(likeValue)
        })
        .then(res => {
            res.json()
            if(likeValue.like === 1) {
                post.value.likes++
            } else {
                post.value.likes--
            }
        })
        .catch(err => console.log(err.message))
    }

    function onDislike() {
        let dislikeValue: any = {}
        switch(like.value) {
            case 0:
                dislikeValue = {
                    like: -1,
                    userId: parsedStorage.userId
                }
                break;
            case -1:
                dislikeValue = {
                    like: 0,
                    userId: parsedStorage.userId
                }
                break;
        }

        fetch(`${serverUrl}${id}/like`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${parsedStorage.token}`
            },
            body: JSON.stringify(dislikeValue)
        })
            .then(res => res.json())
            .catch(err => console.log(err.message))
    }

</script>



