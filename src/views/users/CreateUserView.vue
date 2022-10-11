<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue"
import { UserAPI } from "@/api/user";
import { useRouter } from "vue-router";

const router = useRouter()

const ruleFormRef = ref()
const createUserForm = reactive({
   username: "",
   password: "",
   role: null,
   middleName: "",
})

const rules = reactive({
   name: [
      {
         required: true,
         message: "Это поле обязательно",
         trigger: "blur",
      },
      {
         type: 'string',
         message: "Это поле должно быть строкой",
         trigger: "blur",
      }
   ],
   username: [
      {
         required: true,
         message: "Это поле обязательно",
         trigger: "blur",
      },
      {
         type: 'string',
         message: "Это поле должно быть строкой",
         trigger: "blur",
      },
      {
         min: 3,
         max: 32,
         message: "Это поле должно быть больше 3 и меньше 32 символов",
         trigger: "blur",
      }
   ],
   password: [
      {
         required: true,
         message: "Это поле обязательно",
         trigger: "blur",
      },
      {
         type: 'string',
         message: "Это поле должно быть строкой",
         trigger: "blur",
      },
      {
         min: 8,
         max: 16,
         message: "Это поле должно быть больше 8 и меньше 16 символов",
         trigger: "blur",
      }
   ],
   middleName: [
      {
         required: true,
         message: "Это поле обязательно",
         trigger: "blur",
      },
      {
         type: 'string',
         message: "Это поле должно быть строкой",
         trigger: "blur",
      },
      {
         min: 6,
         max: 32,
         message: "Это поле должно быть больше 6 и меньше 32 символов",
         trigger: "blur",
      }
   ],
   role: [
      {
         required: true,
         message: "Это поле обязательно",
         trigger: "change",
      }
   ],
})

const submitForm = async (formEl) => {
   if (!formEl) return
   await formEl.validate(async (valid,) => {
      if (valid) {
         createUserForm.role = +createUserForm.role
         await UserAPI.add(JSON.stringify(createUserForm))
         router.push('/users')
         ElMessage({
            message: 'Пользователь успешно зарегестрирован',
            type: 'success'
         })
      } else {
         ElMessage.error('Проверьте правильность заполнения полей')
      }
   })
}

</script>

<template>
   <el-container direction="vertical" class="empty-card create-user">
      <h1 class="empty-card__headline">Создание пользьзователя</h1>
      <el-form ref="ruleFormRef" :model="createUserForm" :rules="rules" label-position="top">
         <el-form-item class="create-user__item" label="Логин" prop="username">
            <el-input v-model="createUserForm.username" />
         </el-form-item>
         <el-form-item class="create-user__item" label="Пароль" prop="password">
            <el-input type="password" v-model="createUserForm.password" />
         </el-form-item>
         <el-form-item class="create-user__item" label="Имя" prop="name">
            <el-input v-model="createUserForm.name" />
         </el-form-item>
         <el-form-item class="create-user__item" label="Отчество" prop="middleName">
            <el-input v-model="createUserForm.middleName" />
         </el-form-item>
         <el-form-item class="create-user__item" style="margin-bottom: 100px" label="Роль пользователя" prop="role">
            <el-select v-model="createUserForm.role" placeholder="Выберите роль">
               <el-option label="Администратор" value="0" />
               <el-option label="Пользователь" value="1" />
            </el-select>
         </el-form-item>
         <el-button class="empty-card__button" type="primary" @click="submitForm(ruleFormRef)">
            Создать пользователя
         </el-button>
      </el-form>
   </el-container>
</template>

<style lang="scss">
.empty-card {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 400px;
   padding: 20px;
   background-color: $CodGray;
   border-radius: 12px;

   &__headline {
      color: $Picton;
      font-size: 18px;
      margin-bottom: 20px;
      text-align: center;
   }

   &__button {
      width: 100%;
   }
}

.create-user {
   &__item {
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
}
</style>
