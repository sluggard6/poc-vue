<template>
  <main>
    <span>登录系统</span>
    <el-form>
      <el-input type="text" v-model="username" placeholder="用户名"/>
      <el-input type="password" v-model="password" placeholder="密码"/>
    </el-form>
  </main>
</template>
<script lang="ts">
    export default {
        data() {
            return {
                username: "",
                password: ""
            }
        }
    }
</script>