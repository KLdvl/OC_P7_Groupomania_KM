<template>
  <div class="signup">
    <h1>Please enter E-mail and password to sign up</h1>
    <form @submit="onSubmit" class="add-form">
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
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp.vue",
};
</script>

<style scoped></style>
