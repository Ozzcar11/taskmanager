<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/login"
import { UserAPI } from "../../api/user";

const props = defineProps({
   isCollapse: Boolean,
})

const router = useRouter()
const authStore = useAuthStore()

const nickname = ref('')

const logout = () => {
   authStore.logout()
   router.push('/login')
}

async function requestProfile() {
   const res = await UserAPI.profile()
   nickname.value = res.data.username
}
requestProfile()
</script>

<template>
   <div class="aside__footer">
      <span :class="{ item_collapsed: isCollapse }">{{ nickname }}</span>
      <el-button class="aside__exit" @click="logout">
         <img src="../../assets/icons/exit.svg" alt="" />
      </el-button>
   </div>
</template>

<style lang="scss">
.aside {
   &__footer {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);

      &>span {
         display: block;
         text-align: center;
         transition: all 0.3s var(--el-transition-function-ease-in-out-bezier);
         margin-bottom: 10px;
      }
   }

   &__exit {
      padding: 18px 30px;
      background-color: $Abbey;
      border: none;
   }
}
</style>
