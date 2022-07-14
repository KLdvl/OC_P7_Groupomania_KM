<template>
    <v-container>
        <h1 class="text-center">New Post</h1>
        <v-form @submit="onSubmit" enctype="multipart/form-data">
            <div class="form-row">
                <v-text-field
                        v-model="title"
                        name="title"
                        type="text"
                        class="form-control mt-5"
                        counter="30"
                        hint="Number of characters :"
                        label="Post title"
                        variant="solo"
                        placeholder="Enter title of your post"
                        color="primary"
                        :error-messages="titleError"
                    >
                </v-text-field>
                <v-textarea
                        v-model="content"
                        type="text"
                        class="form-control"
                        counter="3000"
                        hint="Number of characters :"
                        label="Content of post"
                        variant="solo"
                        placeholder="Write your content here"
                        auto-grow
                        color="primary"
                        :error-messages="contentError"
                >
                </v-textarea>
                <v-file-input
                        chips
                        v-model="image"
                        accept="image/*"
                        label="File input"
                        prepend-icon="mdi-camera"
                        color="primary"
                        clearable="true"
                        :error-messages="imageError"
                        type="file"
                >
                </v-file-input>
                <v-row class="form-group">
                    <v-btn type="submit" color="success">
                        Submit Post
                    </v-btn>
                    <v-btn type="reset" color="error">
                        Reset Form
                    </v-btn>
                    <router-link :to="{name: 'home'}">
                        <v-btn tile>Go Back</v-btn>
                    </router-link>
                </v-row>
            </div>
        </v-form>
    </v-container>
</template>

<script setup>
    import { useRouter } from "vue-router"
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup';

    const { handleSubmit } = useForm();
    const router = useRouter()
    const serverUrl = "http://localhost:8080/api/post/"
    const parsedStorage = JSON.parse(localStorage.user)

    const onSubmit = handleSubmit(values => {
        values.userId = parsedStorage.userId
        const formData = new FormData;
        formData.append('title', values.title)
        formData.append('content', values.content)
        formData.append('image', values.image[0])
        formData.append('userId', values.userId)

        fetch(serverUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `token ${parsedStorage.token}`
            },
            body: formData
        })
            .then(res => {
                if(res.status === 201) {
                    router.push({name: 'home'})
                }
            })
            .catch(err => console.log(err.message))
    })

            const { value: title, errorMessage: titleError } = useField('title',
                yup.string()
                .nullable()
                .required("You must enter a title")
                .min(3, "Title must have a minimum of 3 characters")
                .max(30, "Title must have a maximum of 30 characters"))

            const { value: content, errorMessage: contentError } = useField('content',
            yup.string()
                .nullable()
                .required("You must write a content")
                .min(5, "Content must have a minimum of 5 characters")
                .max(3000, "Content must have a minimum of 3000 characters")
            )

            const { value: image, errorMessage: imageError } = useField('image',
            yup.mixed()
                .required("File is required")
            )

</script>

