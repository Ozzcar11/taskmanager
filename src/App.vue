<script setup>
import { RouterView, useRoute } from "vue-router";
import { soketInstance } from "@/utils/socketio";
import { useNotificationStore } from "@/stores/notification";
import { useFiltersStore } from "@/stores/statusFilter";
import { ElNotification } from "element-plus";
import { getStringStatus, getStringStatusRU } from "@/utils/getStringStatus";
import { formatTimeDate, formatDaysDate } from "@/utils/formatDate";
import { fileNameHandler } from '@/utils/fileNameURl'
import { RequestAPI } from '@/api/request'

const notificationStore = useNotificationStore();
const filterStore = useFiltersStore();

const route = useRoute();

const notifHTML = (data) => {
   return `<div class="notification">
       <div class="notification__header">
          <img src="${fileNameHandler(getStringStatus(data.status))}" />
          <span class="${getStringStatus(data.status)}">${getStringStatusRU(
      data.status
   )}</span>
       </div>
       <div class="notification__body">
         <p>Проблема ${data.status == 3
         ? `решена в ${formatTimeDate(
            data.resolvedDate
         )} ${formatDaysDate(data.resolvedDate)}`
         : `началась в ${formatTimeDate(
            data.createDate
         )} ${formatDaysDate(data.createDate)}`
      }</p>
         <p>Хост: ${data.host}</p>
         <p>Имя хоста: ${data.hostname}</p>
       </div>
   </div>`;
};

soketInstance.on("notification", async (data) => {
   if (notificationStore.getFilterStatus === data.status || notificationStore.getFilterStatus == 0) {
      if (!notificationStore.getSearchStatus) {
         notificationStore.setWsData(data);
         const res = await RequestAPI.countProblems()
         filterStore.setFilter(res.data.counts);
         if (data.socketType !== 3 && route.path === "/" && notificationStore.getNotificationStatus) {
            ElNotification({
               dangerouslyUseHTMLString: true,
               message: notifHTML(data),
               position: "bottom-right",
               offset: 50,
            });
         }
      }
   }
});
</script>

<template>
   <RouterView />
</template>

<style lang="scss">
body {
   font-family: Roboto, sans-serif;
}

.el-notification {
   color: #fff;
   background-color: $Tuna;
   border: none;

   .notification {
      color: #fff;

      &__header {
         font-size: 16px;
         font-weight: 700;
         display: flex;
         align-items: center;
         margin-bottom: 5px;

         span {
            margin: 2px 0px 0px 10px;
         }
      }

      span {
         &.error {
            color: rgb(226, 85, 85);
         }

         &.warning {
            color: rgb(223, 193, 26);
         }

         &.success {
            color: rgb(64, 206, 64);
         }
      }

      &__body {
         width: 290px;

         p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
         }
      }
   }
}
</style>
