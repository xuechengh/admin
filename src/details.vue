<template>
<div>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">基本信息</el-menu-item>
  <el-tooltip class="item" effect="dark" content="此功能还在开发当中" placement="top-start">
  <el-menu-item index="2">上架记录</el-menu-item>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" content="此功能还在开发当中" placement="top-start">
  <el-menu-item index="3">活动</el-menu-item>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" content="此功能还在开发当中" placement="top-start">
  <el-menu-item index="4">销量</el-menu-item>
  </el-tooltip>
</el-menu>
<div class="line">
 <el-row class="el-details-row1">
  <el-col :span="4"><div class="grid-content bg-purple">标题:</div></el-col>
  <el-col :span="20"><div class="grid-content bg-purple-light">{{ info.name }}</div></el-col>
</el-row>
 <el-row class="el-details-row2">
  <el-col :span="4"><div class="grid-content bg-purple">封面:</div></el-col>
  <el-col :span="20">
  <div class="grid-content bg-purple-light">
  <span class="span-img">
  <img  :src=" info.coverUrl "/>
  </span>
  </div>
  </el-col>
</el-row>
 <el-row class="el-details-row1">
  <el-col :span="4"><div class="grid-content bg-purple">类型:</div></el-col>
  <el-col :span="20"><div class="grid-content bg-purple-light"><el-button type="info" plain>课件</el-button></div></el-col>
</el-row>
 <el-row class="el-details-row1">
  <el-col :span="4"><div class="grid-content bg-purple">文件大小:</div></el-col>
  <el-col :span="20"><div class="grid-content bg-purple-light">{{ info.size }}页/{{ fileSize }}<span v-if=" info.fileSize>(1024*1024) ">G</span><span v-else-if="info.fileSize>1024">M</span><span v-else>K</span></div></el-col>
</el-row>
<el-row class="el-details-row1">
  <el-col :span="4"><div class="grid-content bg-purple">学科:</div></el-col>
  <el-col :span="20"><div class="grid-content bg-purple-light"><el-button type="primary" plain>{{ info.labertype }}</el-button></div></el-col>
</el-row>
<el-row class="el-details-row1">
  <el-col :span="4"><div class="grid-content bg-purple">标签:</div></el-col>
  <el-col :span="20">
  <div class="grid-content bg-purple-light">
  <el-button type="warning" plain class="el-tag" :key="index" v-for="(item,index) in info.laber">{{ item }}</el-button>
  </div>
  </el-col>
</el-row>
<el-row class="el-details-row1">
  <el-col :span="4"><div class="grid-content bg-purple">价格:</div></el-col>
  <el-col :span="20"><div class="grid-content bg-purple-light" style="color:rgb(245,108,108);">{{ info.price }}元</div></el-col>
</el-row>
 <el-row class="el-details-row3">
  <el-col :span="4"><div class="grid-content bg-purple">简介:</div></el-col>
  <el-col :span="20">
  <div class="grid-content bg-purple-light">
  <span class="span-text">
  {{ info.descritpion }}
  </span>
  </div>
  </el-col>
</el-row>
</div>
 <el-row class="el-details-row4" v-show="!infoShelves">
  <el-col :span="4"><div class="grid-content bg-purple" v-show="false">采购价:<span style="color:rgba(245, 108, 108, 1);">7</span></div></el-col>
  <el-col :span="20">
  <div class="grid-content bg-purple-light">
  <el-button v-show="false">试看</el-button>
   <el-button type="warning" v-show="false" >采购</el-button>
    <el-button type="primary" v-show="false">索要样书</el-button>
     <el-button type="success" v-show="false">显示</el-button>
  </div>
  </el-col>
</el-row>
 <el-row class="el-details-row4" v-show="infoShelves">
  <el-col :span="4"><div class="grid-content bg-purple">已上架</div></el-col>
  <el-col :span="20">
  <div class="grid-content bg-purple-light">
      <el-button type="warning" >发放样书</el-button>
    <el-button type="primary">查看</el-button>
     <el-button type="danger" >下架</el-button>
  </div>
  </el-col>
</el-row>
</div>
</template>
<script>
import axios from 'axios'
import Qs from 'qs'
// jquery
  export default {
    data() {
      return {
        activeIndex: '1',
        info: [],
        infoShelves: false,
        fileSize: 0,
        iner:false
      };
    },
    created(){
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
    document.title='详情'
     let platformResourceId=this.$route.params.platformResourceId 

     //  (platformResourceId)
      HTTP.post("/appconsole/resource/info", Qs.stringify({ 
      'platformResourceId':platformResourceId
       }))
    .then(res => {
      var data=res.data
     if(!parseInt(data.code)){
       this.info=data.data
      this.fileSizefun()
     }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
    },
    methods: {
      handleSelect(key, keyPath) {
        //  (key, keyPath);
      },
      fileSizefun(){
        //  ('执行')
        let fileSize=this.info.fileSize
        fileSize<1024?this.fileSize=fileSize:(fileSize/1024)>1024?this.fileSize=parseInt((fileSize/1024)/1024):this.fileSize=parseInt(fileSize/1024)
        //  (this.fileSize)
      }
    }
  }
</script>
<style scoped>
@import 'assets/css/details.css'
</style>