<template>
  <div class="login">
    <h1 class="text-center text-tertiary">Enter E-mail and password to log in</h1>
    <v-form @submit="onSubmit" class="add-form">
      <v-container>
        <EmailField />
        <PasswordField />
      </v-container>
    </v-form>
  </div>
</template>

<script>
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
export default {
  name: "LogIn.vue",
  components: {PasswordField, EmailField},
};
</script>

<style scoped></style>
