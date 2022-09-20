<template>
  <el-container style="width: 80vw;">
    <el-aside>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item icon="HomeFilled" name="1">
          <template #title>
            <el-icon>
              <HomeFilled />
            </el-icon>
            可选设备
          </template>
          <div v-for="item in linkIp" :key="item" style="">
            <el-button style="width:100%" @click="getFile(item)" v-if="item.State==1" type="primary">{{ item.Ip }}</el-button>
            <el-button style="width:100%" disabled v-else="">{{ item.Ip }}</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-main class="main">
      <el-row class="mainChild">
        <el-col :span="2">配置文件:</el-col>
        <el-col :span="3">
          <el-select v-model="fileName">
            <el-option v-for="f in files"
              :key="f.path"
              :value="f.name"
            />
          </el-select>
        </el-col>
        <el-col :span="2">配置项:</el-col>
        <el-col :span="3">
          <el-select v-model="prop">
            <el-option v-for="p in props"
              :key="p.key"
              :value="p.name"
            />
          </el-select>
        </el-col>
        <el-col :span="2">值过滤:</el-col>
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
          <el-input type="textarea" v-model="parameter" :rows="18" placeholder="{key1:value1,key2:value2}" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17"></el-col>
        <el-col :span="2">
          <el-button @click="saveFile">保存</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="sendFile">发送</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="sendAllFile">发送全部</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">

import {
  scan,
  host,
  getHostFile,
  file,
  hostFile,
  allFile,
  search,
} from '@/api/index'
import { onMounted, ref, Comment } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";


onMounted(()=>{
  getHost()
});

var fileName: string;
const files=[
      {
        name: "配置文件1",
        path: "/root/config1.conf"
      },
      {
        name: "配置文件2",
        paht: "/root/config2.conf"
      }
    ];
var prop: string;
const props= [
      {
        name: "属性1",
        key: "prop1"
      },
      {
        name: "属性2",
        key: "prop2"
      }
    ];
var propValue= "";

// 获取host
async function getChangeHost () {
  parameter.value = null
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
  let res = await search(fileName, prop, propValue)
  if (res.data.code === 0) {
    console.log(res.data.data)
  }
}

// 获取文件
const parameter = ref()
async function getFile(item: any) {
  linkHost.value = item
  let obj = { host: item }
  let res = await getHostFile(obj)
  if (res.data.code === 200) {
    parameter.value = res.data.data
  }
}
// 保存文件
async function saveFile() {
  if (!linkHost.value) {
    ElMessage.warning('请选择设备链接地址')
    return
  }
  if (!parameter.value) {
    ElMessage.warning('请填写设备配置文件')
    return
  }
  let obj = {
    host: linkHost.value,
    file: parameter.value
  }
  let res = await file(obj)
  if (res.data.code === 200) {
    ElMessage.success('保存成功')
  }
}
// 发送文件
async function sendFile() {
  if (!linkHost.value) {
    ElMessage.warning('请选择设备链接地址')
    return
  }
  let obj = {
    host: linkHost.value
  }
  let res = await hostFile(obj)
  if (res.data.code === 200) {
    ElMessage.success('发送成功')
  }
}
// 发送全部文件
async function sendAllFile() {
  if (!parameter.value) {
    ElMessage.warning('请填写设备配置文件')
    return
  }
  let obj = {
    file: parameter.value
  }
  let res = await allFile(obj)
  if (res.data.code === 200) {
    ElMessage.success('发送成功')
  }
}
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
