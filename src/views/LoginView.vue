<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/login"
import { ElMessage } from 'element-plus'

const router = useRouter()

const ruleFormRef = ref()
const formData = ref({
   username: "",
   password: "",
})
const formRules = ref({
   username: [
      { required: true, message: "Пожалуйста введите логин", trigger: "blur" },
      { min: 3, message: "Минимальная длина 3 символа", trigger: "blur" },
   ],
   password: [
      { required: true, message: "Пожалуйста введите пароль", trigger: "blur" },
   ],
})

const submitForm = async (formEl) => {
   if (!formEl) return

   await formEl.validate(async (valid, fields) => {
      if (valid) {
         const authStore = useAuthStore()
         try {
            authStore.token = "bdc405c9-c4ec-43ee-af87-f1e2dabac290"
            await authStore.login(JSON.stringify(formData.value))
            router.push('/')
         } catch (e) {
            ElMessage.error(e)
         }
      } else {
         console.log("error", fields)
      }
   })
}
</script>

<template>
   <div class="login">
      <div class="login__logo">
         <img src="../assets/images/EllcoTMLogo.svg" alt="EllcoTM лого" />
         <span>Ellco TM</span>
      </div>
      <el-form ref="ruleFormRef" class="login__form" label-position="top" :rules="formRules" :model="formData">
         <h1 class="login__headline">Авторизация</h1>
         <el-form-item class="login__input" label="Логин" prop="username">
            <el-input placeholder="Логин" v-model="formData.username" />
         </el-form-item>
         <el-form-item class="login__input" label="Пароль" prop="password">
            <el-input placeholder="Пароль" v-model="formData.password" show-password />
         </el-form-item>
         <el-button style="margin-top: 40px" type="primary" size="large" @click="submitForm(ruleFormRef)">Войти
         </el-button>
      </el-form>
   </div>
</template>

<style lang="scss">
.login {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: $Shark;

   &__logo {
      color: #fff;
      padding: 20px;
      display: flex;
      align-items: center;
      user-select: none;
      pointer-events: none;

      span {
         font-size: 20px;
         font-weight: 700;
         margin-left: 10px;
      }
   }

   &__form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 360px;
      padding: 24px;
      background-color: $Woodsmoke;
   }

   &__headline {
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin: auto;
   }

   &__input {
      .el-form-item__label {
         &::before {
            display: none !important;
         }

         color: $GraySuit;
         font-size: 12px;
      }

      .el-input__wrapper {
         font-size: 12px;
         padding: 3px 10px !important;
         background-color: $CodGray;
         border-radius: 6px;
         border: 1px solid $MidGray;
         box-shadow: none;

         &:hover {
            box-shadow: inset 0px 0px 0px 1px $GraySuit;
         }

         &.is-focus {
            box-shadow: inset 0px 0px 0px 1px $Dodger;
         }
      }

      .el-form-item__error {
         margin-top: 2px;
      }

      .el-input__inner {
         color: #fff;
      }
   }

   button.el-button {
      width: 100%;
      text-align: center;
   }
}
</style>
