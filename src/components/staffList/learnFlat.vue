<template>
  <div>
<div clsss="staffList">
<div class="el-title">
 <el-row :gutter="20" class="el-pans">
  <el-col :span="16" class="el-pan el-l el-1"><div class="grid-content bg-purple" style="font-size:12px;">学习平板管理密码：<span>{{message}}</span></div></el-col>
  <el-col :span="8" class="el-pan el-r el-r-padding"><div class="grid-content bg-purple" style="margin-right:10px;"><el-button @click="flatBut" style="color:rgb(64,158,255);" size="mini">更换密码</el-button></div></el-col>
</el-row>
</div>
<div class="el-content" >
<el-row :gutter="20" class="el-cord">
  
</el-row>
</div>
</div>
  </div>
  </template>
  <script>
   import axios from 'axios'
   import Qs from 'qs'
  export default {
    data() {
      return {
          message:'',
          contId:0
      }
      },  
    created(){
     this.flatInit()
    },  
    methods:{
     flatInit(){
       
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/device/info", Qs.stringify({ 
      'schoolId': this.$store.state.schoolId
      }))
    .then(res => {
    console.log(res)
    var data = res.data
    if(data.code==0){

     this.message=data.data.schoolDetail.content,this.contId=data.data.schoolDetail.id
     
    }
    })
    .catch(error => {
        console.log(error)
    })   
       
     },
     flatBut(){
         console.log(this.contId)
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/device/update", Qs.stringify({ 
      'id': this.contId
      }))
    .then(res => {
     var data=res.data
     if(data.code==0){
      this.message=data.data.password
     }
    })
    .catch(error =>{

    })
    //     
     }
    }
  }
</script>
  