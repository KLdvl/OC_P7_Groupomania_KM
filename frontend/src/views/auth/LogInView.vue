<template>
  <div class="login">
    <h1 class="text-center text-tertiary">Please enter E-mail and password to log in</h1>
    <v-form @submit.prevent="handleLogin" class="add-form">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
                    color="primary"
                    v-model="email"
                    type="email"
                    label="E-mail"
                    variant="solo"
                    placeholder="Enter your e-mail address"
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
  import {ref} from "vue"
  import {useRouter} from "vue-router"
  const router = useRouter()

  const email = ref("")
  const password = ref("")

  function handleLogin() {
    // Check if email && password field are filled
    if(!email.value || !password.value) return

    const user = {
      email: email.value,
      password: password.value
    }
    const serverUrl = "http://localhost:8080/api/auth/login"
    const requestOptions: any = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      mode: "cors",
      body: JSON.stringify(user)
  };

    fetch(serverUrl, requestOptions)
            .then(function(res){
              if(res.status !== 200) {
                throw new Error(res.status)
                }
              return res.json();
              })
            .then(function(data){
              localStorage.setItem('user', JSON.stringify(data))
              router.push({name: "home"})
              })
            .catch(function(err) {
              console.log(err)
              })
  }
</script>
