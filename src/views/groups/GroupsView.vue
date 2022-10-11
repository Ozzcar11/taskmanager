<script setup>
import { ref } from 'vue';
import { GroupAPI } from '@/api/groups.js'


const props = defineProps({})

let firstClick = ref(true)

const addInputRef = ref(null)
const addInput = ref('')

const groups = ref([])

const requestGroups = async () => {
   const res = await GroupAPI.allGroups()
   groups.value.push(...res.data)
}

const handleAddGroup = async () => {
   if (firstClick.value) {
      firstClick.value = false
      addInputRef.value.focus()
   } else {
      firstClick.value = true
      if (!addInput.value) return
      await GroupAPI.add(JSON.stringify({ groupName: addInput.value }))
      groups.value = []
      requestGroups()
   }
}

const deleteGroup = async (hostGroupId) => {
   await GroupAPI.delete(JSON.stringify({ hostGroupId }))
   groups.value = groups.value.filter(item => item.key !== hostGroupId)
}

requestGroups()
</script>

<template>
   <div class="empty-card checkbox">
      <h1 class="empty-card__headline">Доступные группы</h1>
      <el-scrollbar height="370px" class="checkbox__container">
         <div class="checkbox__names" v-for="(item, index) in groups" :key="item.key">
            <span>{{ item.label }}</span>
            <el-button class="checkbox__delete" type="primary" size="default" @click="deleteGroup(item.key)">
               <el-icon>
                  <DeleteFilled />
               </el-icon>
            </el-button>
         </div>
      </el-scrollbar>
      <div class="checkbox__add">
         <el-button class="checkbox__button" size="default" @click="handleAddGroup">
            <el-icon>
               <Plus />
            </el-icon>
         </el-button>
         <span v-if="firstClick" @click="handleAddGroup" class="checkbox__desc">Добавить группу</span>
         <el-input v-show="!firstClick" ref="addInputRef" class="checkbox__input" @keyup.enter="handleAddGroup"
            v-model="addInput" placeholder="Название группы" clearable />
      </div>
   </div>
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
}

.checkbox {
   height: 500px;

   &__container {
      height: 370px;

      & .el-scrollbar__view {
         display: flex;
         flex-direction: column;
      }
   }

   &__button {
      width: 10px;
      background-color: transparent;
      border: none;
      border-right: 1px solid $Bombay;
      border-radius: 0;

      &:hover,
      &:active,
      &:focus {
         background-color: inherit;
      }
   }

   &__names {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &+& {
         margin-top: 10px;
      }
   }

   &__delete {
      padding: 10px;
      background-color: transparent;
      border: none;

      &:hover {
         background-color: rgb(180, 17, 17);
      }
   }

   &__desc {
      color: #fff;
      margin-left: 10px;
      font-size: 14px;
      opacity: 0.5;
      cursor: pointer;
   }

   &__input {
      & .el-input__wrapper {
         font-size: 16px;
         border-radius: 0;
         background-color: transparent;
         box-shadow: none;
      }

      .el-input__inner {
         &::placeholder {
            font-size: 14px;
         }

         color: #fff;
      }
   }

   &__add {
      display: flex;
      align-items: center;
      margin: 10px 0px
   }
}
</style>
