<!--<template>-->
<!--    <v-container>-->
<!--        <h1 class="text-center">New Post</h1>-->
<!--        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">-->
<!--            <div class="form-row">-->
<!--                <Field-->
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
<!--                </Field>-->
<!--                <div class="invalid-feedback">{{errors.title}}</div>-->
<!--                <Field-->
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
<!--                </Field>-->
<!--                <VFileInput-->
<!--                        chips-->
<!--                        accept="image/*"-->
<!--                        label="File input"-->
<!--                        prepend-icon="mdi-camera"-->
<!--                        color="primary"-->
<!--                >-->
<!--                </VFileInput>-->
<!--                <v-row>-->
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
<!--        </Form>-->
<!--    </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!-- -->
<!--    // const title = ref("")-->
<!--    // const titleRules = [v => v.length <= 30 || 'Max 30 characters']-->
<!--    // const content = ref("")-->
<!--    // const contentRules = [v => v.length <= 3000 || 'Max 3000 characters']-->
<!--    // const valid = ref(true)-->

<!--</script>-->

<script setup>
    import { Form, Field } from 'vee-validate';
    import * as Yup from 'yup';

    const schema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        dob: Yup.string()
            .required('Date of Birth is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.string()
            .required('Accept Ts & Cs is required')
    });

    function onSubmit(values) {
        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    }
</script>

<template>
    <div class="card m-3">
        <h5 class="card-header">Vue 3 + VeeValidate - Form Validation Example</h5>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                <div class="form-row">
                    <div class="form-group col">
                        <label>Title</label>
                        <Field name="title" as="select" class="form-control" :class="{ 'is-invalid': errors.title }">
                            <option value=""></option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms">Ms</option>
                        </Field>
                        <div class="invalid-feedback">{{errors.title}}</div>
                    </div>
                    <div class="form-group col-5">
                        <label>First Name</label>
                        <Field name="firstName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                        <div class="invalid-feedback">{{errors.firstName}}</div>
                    </div>
                    <div class="form-group col-5">
                        <label>Last Name</label>
                        <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                        <div class="invalid-feedback">{{errors.lastName}}</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col">
                        <label>Date of Birth</label>
                        <Field name="dob" type="date" class="form-control" :class="{ 'is-invalid': errors.dob }" />
                        <div class="invalid-feedback">{{errors.dob}}</div>
                    </div>
                    <div class="form-group col">
                        <label>Email</label>
                        <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
                        <div class="invalid-feedback">{{errors.email}}</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col">
                        <label>Password</label>
                        <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{errors.password}}</div>
                    </div>
                    <div class="form-group col">
                        <label>Confirm Password</label>
                        <Field name="confirmPassword" type="password" class="form-control" :class="{ 'is-invalid': errors.confirmPassword }" />
                        <div class="invalid-feedback">{{errors.confirmPassword}}</div>
                    </div>
                </div>
                <div class="form-group form-check">
                    <Field name="acceptTerms" type="checkbox" id="acceptTerms" value="true" class="form-check-input" :class="{ 'is-invalid': errors.acceptTerms }" />
                    <label for="acceptTerms" class="form-check-label">Accept Terms & Conditions</label>
                    <div class="invalid-feedback">{{errors.acceptTerms}}</div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary mr-1">Register</button>
                    <button type="reset" class="btn btn-secondary">Reset</button>
                </div>
            </Form>
        </div>
    </div>
</template>
