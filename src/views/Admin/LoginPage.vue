<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { ILogin } from '@/api/types';
import { loginAdmin, loginDefault } from '@/api/user';
import { Lock, User } from '@element-plus/icons-vue';
import router from '@/router';

const rules = reactive<FormRules<ILogin>>({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 64, message: '密码长度在6-64个字符', trigger: 'blur' },
  ],
});

const formRef = ref<FormInstance>();
const loginForm = ref<ILogin>({ ...loginDefault });

const login = async (formRef: FormInstance) => {
  await formRef.validate(valid => {
    if (valid) {
      loginAdmin(loginForm.value).then(res => {
        if (!res) return;
        ElNotification({
          type: 'success',
          title: res.msg,
        });
        router.push('/admin');
        localStorage.setItem('userid', res.data.uuid);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('nickname', res.data.nickname);
      });
    }
  });
};
</script>

<template>
  <div class="login-container">
    <el-form
      class="login-form"
      autocomplete="on"
      ref="formRef"
      :model="loginForm"
      :rules="rules"
      status-icon>
      <div class="title">登录</div>
      <el-form-item prop="username">
        <el-input
          placeholder="账号"
          v-model="loginForm.username"
          autocomplete="on">
          <template #prepend>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          placeholder="密码"
          v-model="loginForm.password"
          autocomplete="on"
          type="password"
          show-password>
          <template #prepend>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-button type="primary" @click="login(formRef!)">登录</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  background-color: #2d3a4b;

  .login-form {
    max-width: 520px;
    padding: 160px 30px 0;
    margin: 0 auto;

    button {
      width: 100%;
      margin-top: 16px;
    }
  }

  .title {
    font-size: 26px;
    color: #eee;
    margin-bottom: 40px;
    text-align: center;
    font-weight: bold;
  }

  .el-input {
    height: 40px;
    font-size: 14px;

    .el-icon {
      font-size: 20px;
    }
  }
}
</style>
