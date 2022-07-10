<!--<template>-->
<!--    <v-container>-->
<!--        <h1 class="text-center">New Post</h1>-->
<!--        <v-form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">-->
<!--            <div class="form-row">-->
<!--                <v-text-field-->
<!--                        v-model="title"-->
<!--                        type="text"-->
<!--                        name="title"-->
<!--                        class="form-control mt-5"-->
<!--                        :class="{'is-invalid' : errors.title}"-->
<!--                        counter="30"-->
<!--                        hint="Number of characters :"-->
<!--                        label="Post title"-->
<!--                        variant="solo"-->
<!--                        placeholder="Enter title of your post"-->
<!--                        color="primary"-->
<!--                >-->
<!--                </v-text-field>-->
<!--                <div class="invalid-feedback">{{errors.title}}</div>-->
<!--                <v-textarea-->
<!--                        type="text"-->
<!--                        name="content"-->
<!--                        class="form-control"-->
<!--                        :class="{'is-invalid' : errors.content}"-->
<!--                        counter="3000"-->
<!--                        hint="Number of characters :"-->
<!--                        label="Content of post"-->
<!--                        variant="solo"-->
<!--                        placeholder="Write your content here"-->
<!--                        auto-grow-->
<!--                        color="primary"-->
<!--                >-->
<!--                </v-textarea>-->
<!--                <div class="invalid-feedback">{{errors.content}}</div>-->
<!--                <v-file-input-->
<!--                        chips-->
<!--                        accept="image/*"-->
<!--                        label="File input"-->
<!--                        prepend-icon="mdi-camera"-->
<!--                        color="primary"-->
<!--                >-->
<!--                </v-file-input>-->
<!--                <v-row class="form-group">-->
<!--                    <v-btn type="submit" color="success">-->
<!--                        Submit Post-->
<!--                    </v-btn>-->
<!--                    <v-btn type="reset" color="error">-->
<!--                        Reset Form-->
<!--                    </v-btn>-->
<!--                    <router-link :to="{name: 'home'}">-->
<!--                        <v-btn tile>Go Back</v-btn>-->
<!--                    </router-link>-->
<!--                </v-row>-->
<!--            </div>-->
<!--        </v-form>-->
<!--    </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--    import { ref } from 'vue'-->
<!--    import {useField, useForm } from 'vee-validate'-->
<!--    import * as yup from 'yup'-->

<!--    // const schema = yup.object({-->
<!--    //     title: yup.string()-->
<!--    //         .required()-->
<!--    //         .min(3, "Minimum 3 characters")-->
<!--    // })-->
<!--    //-->
<!--    // const { errors, meta } = useForm({-->
<!--    //     validationSchema: schema-->
<!--    // })-->
<!--    //-->
<!--    // const { value: title } = useField('title')-->
<!--    //-->
<!--    // async function onSubmit() {-->
<!--    //     if(!meta.value.valid) return-->
<!--    // }-->
<!--    //-->
<!--    //-->
<!--    //-->
<!--    //-->


<!--    // const title = ref("")-->
<!--    // const titleRules = [v => v.length <= 30 || 'Max 30 characters']-->
<!--    // const content = ref("")-->
<!--    // const contentRules = [v => v.length <= 3000 || 'Max 3000 characters']-->
<!--    // const valid = ref(true)-->

<!--</script>-->

<template>
    <v-container>
        <h1 class="text-center">New Post</h1>
        <v-form @submit="onSubmit">
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
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup';

    const { handleSubmit } = useForm();

            let { value: title, errorMessage: titleError } = useField('title',
                yup.string()
                .nullable()
                .required("You must enter a title")
                .min(3, "Title must have a minimum of 3 characters")
                .max(30, "Title must have a maximum of 30 characters"))

            let { value: content, errorMessage: contentError } = useField('content',
            yup.string()
                .nullable()
                .required("You must write a content")
                .min(5, "Content must have a minimum of 5 characters")
                .max(3000, "Content must have a minimum of 3000 characters")
            )

            let { value: image, errorMessage: imageError } = useField('image',
            yup.mixed()
                .required("File is required")
            )

    const onSubmit = handleSubmit(values => {
        alert(JSON.stringify(values, null, 2))
    })
</script>

