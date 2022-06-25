<template>
  <div class="signup">
    <h1 class="text-center text-tertiary">Please enter E-mail and password to sign up</h1>
    <v-form @submit="onSubmit" class="add-form">
      <v-container>
        <EmailField />
        <PasswordField />
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-btn append>
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
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
export default {
  name: "SignUp.vue",
  components: {PasswordField, EmailField}
};
</script>

<style scoped></style>
