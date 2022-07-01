<template>
    <v-container>
        <h1 class="text-center">New Post</h1>
        <v-form ref="form">
            <v-text-field
                    v-model="title"
                    :rules="titleRules"
                    counter="30"
                    hint="Number of characters :"
                    class="mt-5"
                    label="Post title"
                    variant="solo"
                    placeholder="Enter title of your post"
                    color="primary"
            ></v-text-field>
            <v-textarea
                    solo
                    name="input-7-4"
                    label="Solo textarea"
                    auto-grow
                    color="primary"
            ></v-textarea>
            <v-file-input
                    chips
            accept="image/*"
            label="File input"
            >
            </v-file-input>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "CreatePost",
        data() {
            return {
                title: "",
                titleRules: [v => v.length <= 30 || 'Max 30 characters']
            }
        }
    }
</script>