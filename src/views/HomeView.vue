<template>
  <el-container style="width: 80vw;">
    <el-aside style="height:100%">
      <el-menu style="height:100%" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
        default-active="2" text-color="#fff">
        <el-menu-item-group style="height:6%;" title="Group One">
          <template #title>
            <div style="font-size: 20px;color: white;">
              <el-icon>
                <HomeFilled />
              </el-icon>
              可选择设备
            </div>
          </template>
          <el-menu-item v-for="item in linkIp" :key="item">{{ item.Ip }}</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <el-row class="mainChild">
        <el-col align="center" :span="2">配置文件:</el-col>
        <el-col :span="3">
          <el-select v-model="fileName">
            <el-option v-for="f in files" :key="f.path" :value="f.name" />
          </el-select>
        </el-col>
        <el-col align="center" :span="2">配置项:</el-col>
        <el-col :span="3">
          <el-select v-model="prop">
            <el-option v-for="p in props" :key="p.key" :value="p.name" />
          </el-select>
        </el-col>
        <el-col align="center" :span="2">值过滤:</el-col>
        <el-col :span="3">
          <el-input v-model="propValue"></el-input>
        </el-col>
        <el-col :span="2" style="margin-left:5px">
          <el-button @click="serach">
            查找
          </el-button>
        </el-col>
      </el-row>
      <el-row class="mainChild">
        <el-col :span="24">
          <el-table :data="tableData" @select="tableSelect" @select-all="tableSelect" border style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="ip" label="ip" width="180" />
            <el-table-column prop="file" label="文件" width="180" />
            <el-table-column prop="prop" label="配置项" />
            <el-table-column prop="value" label="当前值" />
            <el-table-column prop="propValue" label="过滤值" />
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17"></el-col>
        <el-col :span="4">
          <el-input v-model="upValue" />
        </el-col>
        <el-col :span="2">
          <el-button @click="updataValue">更新</el-button>
        </el-col>
        <!-- <el-col :span="2">
          <el-button @click="saveFile">保存</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="sendFile">发送</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="sendAllFile">发送全部</el-button>
        </el-col> -->
      </el-row>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup >

import {
  scan,
  host,
  // getHostFile,
  file,
  hostFile,
  allFile,
  search,
  updata,
} from '@/api/index'
import { onMounted, ref, Comment } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";


onMounted(() => {
  getHost()
});

const fileName = ref()
const files = ref([
  {
    name: "配置文件1",
    path: "/root/config1.conf"
  },
  {
    name: "配置文件2",
    paht: "/root/config2.conf"
  }
]);
const prop = ref()
const props = ref([
  {
    name: "属性1",
    key: "prop1"
  },
  {
    name: "属性2",
    key: "prop2"
  }
]);
var propValue = ref();

// table数据
const tableData = ref([])
// 获取host
async function getChangeHost() {
  // parameter.value = null
  let res = await scan()
  if (res.data.code === 200) {
    linkIp.value = res.data.data
  }
}
// 获取缓存host
const linkIp = ref([])
const linkHost = ref()
async function getHost() {
  let res = await host()
  if (res.data.code === 0) {
    linkIp.value = res.data.data
  }
}
async function serach() {
  let res = await search(fileName, prop, propValue.value)
  if (res.data.code === 0) {
    console.log(res.data.data)
  }
}
// 获取table选中行
const tableselction = ref([])
function tableSelect(val: never[]) {
  tableselction.value = val
}
// 更新配置数据
const upValue = ref()
async function updataValue() {
  if (tableselction.value.length === 0) {
    ElMessage.warning('请选择需要更新的数据')
    return
  }
  let ipArr: any[] = []
  tableselction.value.forEach((e:any) => {
    ipArr.push(e.ip)
  })
  let obj = {
    host: ipArr,
    fileName: fileName.value,
    prop: prop.value,
    propVale: upValue.value
  }
  let res = updata(obj)
}
// 获取文件
// const parameter = ref()
// async function getFile(item: any) {
//   linkHost.value = item
//   let obj = { host: item }
//   let res = await getHostFile(obj)
//   if (res.data.code === 200) {
//     parameter.value = res.data.data
//   }
// }
// 保存文件
async function saveFile() {
  if (tableselction.value.length === 0) {
    ElMessage.warning('请选择需要保存的数据')
    return
  }
  let obj = {
    host: linkHost.value,
    file: fileName.value
  }
  let res = await file(obj)
  if (res.data.code === 200) {
    ElMessage.success('保存成功')
  }
}
// 发送文件
// async function sendFile() {
//   if (!linkHost.value) {
//     ElMessage.warning('请选择设备链接地址')
//     return
//   }
//   let obj = {
//     host: linkHost.value
//   }
//   let res = await hostFile(obj)
//   if (res.data.code === 200) {
//     ElMessage.success('发送成功')
//   }
// }
// 发送全部文件
// async function sendAllFile() {
//   if (!parameter.value) {
//     ElMessage.warning('请填写设备配置文件')
//     return
//   }
//   let obj = {
//     file: parameter.value
//   }
//   let res = await allFile(obj)
//   if (res.data.code === 200) {
//     ElMessage.success('发送成功')
//   }
// }
</script>
<style scoped>
.main {
  width: 60vw;
}

.mainChild {
  width: 60vw;
  margin: 0 0 10px 0;
}
</style>
