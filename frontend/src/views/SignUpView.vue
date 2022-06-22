<template>
  <div class="signup">
    <h1>Please enter E-mail and password to sign up</h1>
    <v-form @submit="onSubmit" class="add-form">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="E-mail" variant="solo" placeholder="Enter your e-mail address">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
          <v-text-field label="Password" variant="solo" placeholder="Enter your password">
          </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-btn
                    append
            >Sign Up
              </v-btn>
          </v-col>
        </v-row>

      </v-container>
      <div class="form-control">
        <label>E-mail Address</label>
        <input
          type="email"
          v-model="email"
          name="email"
          placeholder="Enter your name"
        />
      </div>
      <div class="form-control">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <input type="submit" value="Sign Up" class="btn btn-block" />
    </v-form>
  </div>
</template>

<script>
export default {
  name: "SignUp.vue"
};
</script>

<style scoped></style>
