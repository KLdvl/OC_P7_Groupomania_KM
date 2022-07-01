<template>
    <v-container>
        <h1 class="text-center" >Posts les plus récents</h1>
        <v-row class="mt-5 mb-5 justify-center">
            <router-link :to="{name: 'createpost'}">
            <v-btn>Add a new post</v-btn>
            </router-link>
        </v-row>
        <v-row>
                <PostCard />
        </v-row>


    </v-container>
</template>

<script>
    import PostCard from "../../components/PostCard";

    export default {
        name: "AllPosts",
        components: {PostCard},
    }
</script>

