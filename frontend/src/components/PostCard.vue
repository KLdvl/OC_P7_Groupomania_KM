<template>
    <v-card class="mx-auto my-12" max-width="300">
        <v-img height="250">
        </v-img>
        <v-card-header>
            <v-card-header-text>
                <v-card-title>test</v-card-title>
                <v-card-subtitle>
                    <span class="mr-1">Date de création du post</span>
                </v-card-subtitle>
            </v-card-header-text>
        </v-card-header>
        <v-card-text>
        </v-card-text>
    </v-card>
</template>

<script>
    const serverUrl = "http://localhost:8080/api/post/";
    const parsedStorage = JSON.parse(localStorage.user)
    const token = parsedStorage.token

    export default {
        name: "PostCard",
        data() {
            return {
                getResult: null
            }
        },
        methods: {
            formatResponse(res) {
                return JSON.stringify(res, null, 2);
            },
            async getAllData() {
                try {
                    const res = await fetch(serverUrl, {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `token ${token}`
        }
    });
                    const data = await res.json();
                    const result = {
                        status: res.status + "-" + res.statusText,
                        headers: {
                            "Content-Type": res.headers.get("Content-Type"),
                            "Content-Length": res.headers.get("Content-Length"),
                        },
                        length: res.headers.get("Content-Length"),
                        data: data,
                    };
                    this.getResult = this.formatResponse(result);
                } catch (err) {
                    this.getResult = err.message;
                }
            },
        },
        mounted() {
            this.getAllData()
        }
    }
</script>

