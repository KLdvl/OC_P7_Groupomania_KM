<template>
    <div class="login">
        <h1 class="text-center text-tertiary">Please enter E-mail and password to log in</h1>
        <v-form @submit="onSubmit" class="add-form">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                                class="form-control"
                                color="primary"
                                name="email"
                                v-model="email"
                                type="email"
                                label="E-mail"
                                variant="solo"
                                placeholder="Enter your e-mail address"
                                :error-messages="emailError"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                                color="primary"
                                v-model="password"
                                type="password"
                                label="Password"
                                variant="solo"
                                placeholder="Enter your password"
                                name="password"
                                :error-messages="passwordError"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="3">
                        <v-btn type="submit" append>
                            Log In
                            <v-icon icon="mdi-login"></v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script setup lang="ts">
    // Importing required external resources
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router"
    import {useField, useForm} from "vee-validate";
    import * as yup from 'yup'

    // Creating router variables
    const router = useRouter()
    const store = useStore();
    const {handleSubmit} = useForm();

    // Creating function for loging in
    const onSubmit = handleSubmit(values => {
        const formData = new FormData;
        formData.append('email', values.email)
        formData.append('password', values.password)

        const serverUrl = "http://localhost:8080/api/auth/login"
        const requestOptions: any = {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        };
        const login = () => {
            store.dispatch('login')
        }

        fetch(serverUrl, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
            })
            .then(data => {
                localStorage.setItem('user', JSON.stringify(data))
                login()
                router.push({name: 'home'})
            })
            .catch(err => console.log(err.message))
    })

    const {value: email, errorMessage: emailError} = useField('email',
        yup.string()
            .email("Your e-mail must be valid")
            .required("You must enter an email"))

    const {value: password, errorMessage: passwordError} = useField('password',
        yup.string()
            .required("You must enter a password")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/,
                "Must contain between 8 & 12 characters, One uppercase, One lowercase, One number and One special character")
    )

</script>