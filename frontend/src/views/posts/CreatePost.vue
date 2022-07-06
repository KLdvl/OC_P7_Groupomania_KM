<template>
    <v-container>
        <h1 class="text-center">New Post</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
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
                    v-model="content"
                    :rules="contentRules"
                    solo
                    name="input-7-4"
                    label="Content of Post"
                    auto-grow
                    color="primary"
            ></v-textarea>
            <v-file-input
            chips
            accept="image/*"
            label="File input"
            prepend-icon="mdi-camera"
            color="primary"
            >
            </v-file-input>
            <v-row>
                <v-btn :disabled="!valid"
                       color="success"
                       @click="validate">Submit post !
                </v-btn>
                <v-btn color="error"
                       @click="reset"
                >
                    Reset form
                </v-btn>
                <router-link :to="{name: 'home'}">
                    <v-btn tile >GO BACK</v-btn>
                </router-link>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "CreatePost",
        data() {
            return {
                title: "",
                titleRules: [v => v.length <= 30 || 'Max 30 characters'],
                content: "",
                contentRules: [v => v.length <= 3000 || 'Max 3000 characters'],
                valid: true,
            }
        },
        methods: {
            validate(){
                this.$refs.form.validate()
            },
            reset(){
                this.$refs.form.reset()
            }
        }
    }
</script>