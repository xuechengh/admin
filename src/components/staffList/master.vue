<template>
  <div>
<div clsss="staffList" v-show="bmt">
<div class="el-title">
<router-link :to="{name:'pesonnel'}"> 
 <el-row :gutter="20" class="el-pans">
  <el-col :span="12" class="el-pan el-l el-1"><div class="grid-content bg-purple" style="font-size:14px;">人事管理({{ teacherCount }})</div></el-col>
  <el-col :span="12" class="el-pan el-r el-r-padding" tag="a" style="position:relative;">
  <div class="grid-content bg-purple">
  <span>&nbsp;</span>
  <div style="position:absolute;top:0;right:86px;width:60px;">
  <router-link :to="{name:'pesonnel'}" @click.native="pesonnelFun()" style="text-align:center;display:block;width:100%;height:100%;" ><span style="font-size:14px;color:rgb(64,158,255);">查看</span></router-link>
  </div>
  <div style="position:absolute;top:0;right:20px;width:60px;">
  <router-link :to="{name:'addpeople'}" @click.native="masterFun()" style="text-align:center;display:block;width:100%;height:100%;"><span style="font-size:14px;color:rgb(64,158,255);">添加</span></router-link>
  </div>
  </div></el-col>
</el-row>
</router-link>
</div>
<div class="el-content">
   <el-row :gutter="20" class="el-cord">
  <el-col :span="6" class="">
   <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">0</span>人请假</div>
   </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">0</span>人早退</div>
  </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
   <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">0</span>人旷工</div>
  </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
   <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">0</span>人迟到</div>
  </el-tooltip>
  </el-col>
</el-row>
</div>
</div>
  </div>
  </template>
  <script>
  import axios from 'axios'
  import Qs from 'qs'
  import {mapGetters} from 'vuex'
  export default {
   props: ['bmt'],
   data: () => ({ 
     teacherCount:0
   }),
   mounted(){ 
  this.teacherCount=this.$store.state.teacherCount
   },
    computed:{
   ...mapGetters([
     'getTeacherCount'
   ])
 },
 watch:{
   getTeacherCount: function(li){
      this.teacherCount=li
   }
   
 },
 methods:{
  pesonnelFun: function(){
      this.$store.commit('setPesonnelType',0)
      this.$store.commit('setSkip',1)
   },
  masterFun:function(){
      this.$store.commit('setPesonnelType',0)
      this.$store.commit('setSkip',0)
  }  
 }
  }
  </script>
  