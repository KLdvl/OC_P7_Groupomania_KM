<template>
    <div>
        <h1 class="text-center" >Posts les plus récents</h1>
        <PostCard />
        <div></div>
    </div>
</template>

<script>

    import PostCard from "../components/PostCard";
    // const serverUrl = "http://localhost:8080/api/post/";
    // const parsedStorage = JSON.parse(localStorage.user)
    // const token = parsedStorage.token

    export default {
        name: "AllPosts",
        components: {PostCard},
        // data() {
        //     return {
        //         getResult: null
        //     }
        // },
        // methods: {
        //     formatResponse(res) {
        //         return JSON.stringify(res, null, 2);
        //     },
        //     async getAllData() {
        //         try {
        //             const res = await fetch(serverUrl, {
        //                 method: "GET",
        //                 mode: "cors",
        //                 headers: {
        //                     Authorization: `token ${token}`
        //                 }
        //             });
        //             const data = await res.json();
        //             this.getResult = this.formatResponse(data);
        //         } catch (err) {
        //             this.getResult = err.message;
        //         }
        //     },
        // },
        // beforeMount() {
        //     this.getAllData()
        // }
    }
</script>

