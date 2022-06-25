<template>
    <div>
        <h1 class="text-center" >Posts les plus récents</h1>
<PostCard />
    </div>
</template>

<script>
    import PostCard from "../components/PostCard";
    export default {
        name: "AllPosts",
        components: {PostCard}
    }
</script>

<style scoped>

</style>