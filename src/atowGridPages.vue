<template>
<div>
<el-row class="el-title elRow"  v-show="gridshow">
  <el-col class="elCol" :span="24"><div class="grid-content bg-purple-dark ">学科</div></el-col>
</el-row>
<el-row class="el-content elRow" :key="index"  v-for="(item,index) in list" v-show="gridshow" style="border-top:1px solid rgb(242,242,242);">
 <router-link :to="{name:'knowledge'}" v-if="item.status==1" @click.native="grid(item.id,item.status)">
  <el-col class="elCol" :span="20" >
  <div class="grid-content bg-purple-dark ">{{ item.name }}</div>
  </el-col>
  </router-link>
   <div v-else >
   <el-tooltip class="item" effect="dark" content="显示状态下，修改标签" placement="top-start">
  <el-col class="elCol" :span="20" >
  <div class="grid-content bg-purple-dark ">{{ item.name }}</div>
  </el-col>
   </el-tooltip>
  </div>
  <el-col class="elCol" :span="4">
  <div class="grid-content bg-purple-dark ">
  <el-button type="danger" @click="interDisciplinary(item.id,0)" v-if="item.status==1">隐藏</el-button>
  <el-button type="success" @click="interDisciplinary(item.id,1)" v-else >显示</el-button> 
  </div>
  </el-col>
</el-row>
<router-view :gridshow.sync="gridshow" :id="id"></router-view>
</div>
</template>
<style scoped>
@import 'assets/css/atowGridPages.css'
</style>
<script>
 import axios from 'axios'
 import Qs from 'qs'
 // jquery
 export default {
   data: () => ({
     list:[],
     gridshow: true,
     id: ''
   }),
  created () {
    //  ('调2次')
    //  (this.$store.state.schoolId)
     document.title='筛选菜单管理'
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
     HTTP.post("/appconsole/resource/laberType", Qs.stringify({
       'schoolId': this.$store.state.schoolId
     }))
    .then(res => {
       var data=res.data 
      if(!parseInt(data.code)){
      this.list = data.data.list
      }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
  },
  methods:{
    grid(id){
    this.gridshow=false
    this.id=id 
    },
    interDisciplinary:function(id,status){
      //  (id)
      //  (status)
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
       HTTP.post("/appconsole/resource/hideType", Qs.stringify({
         'schoolId': this.$store.state.schoolId,
         'id':id,
         'status':status 
         }))
    .then(res => {
       var data=res.data 
       
      if(!parseInt(data.code)){
        this.$router.push({
          name: 'atowone',
          params: {stationId:2}
        })
      }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
    }
  }
 }
</script>
