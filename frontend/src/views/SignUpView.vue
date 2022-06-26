<template>
  <div class="signup">
    <h1 class="text-center text-tertiary">Please enter E-mail and password to sign up</h1>
    <v-form @submit.prevent="handleSignup" class="add-form">
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
              Sign Up
              <v-icon icon="mdi-send"></v-icon>
              </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: "SignUpView",
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      handleSignup() {
        if(!this.email || !this.password) return

        const user = {
          email: this.email,
          password: this.password
        }
        const serverUrl = "http://localhost:8080/api/auth/signup"
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          mode: "cors",
          body: JSON.stringify(user)
        };
        let self = this;
        fetch(serverUrl, requestOptions)
        .then(function(res){
          if(res.status !== 201){
            throw new Error(res.status)
          }
          return res.json();
        })
        .then(function(data){
          localStorage.setItem('user', JSON.stringify(data))
          self.$router.push({name: "home"})
        })
        .catch(function(err){
          console.log(err)
        })

      }
    }
  }
</script>

