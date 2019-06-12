<template>
  <div>
<div clsss="staffList">
<div class="el-title"> 
 <el-row :gutter="20" class="el-pans">
  <el-col :span="12" class="el-pan el-l el-1"><div class="grid-content bg-purple" style="font-size:14px;">班级学员管理(<span>{{studentCount}}</span>)</div></el-col>
  <el-col :span="12" class="el-pan el-r el-r-padding">
  <div class="grid-content bg-purple">
  <span>&nbsp;&nbsp;</span>
   <div style="position:absolute;top:0;right:86px;width:60px;">
  <router-link :to="{name:'pesonnel'}" @click.native="pesonnelFun" style="text-align:center;display:block;width:100%;height:100%;" ><span style="font-size:14px;color:rgb(64,158,255);">查看</span></router-link>
  </div>
  <div style="position:absolute;top:0;right:20px;width:60px;">
  <router-link :to="{name:'addpeople'}" @click.native="traineeFun" style="text-align:center;display:block;width:100%;height:100%;"><span style="font-size:14px;color:rgb(64,158,255);">添加</span></router-link>
  </div>

  </div>
  </el-col>
</el-row>
</div>
<div class="el-content"> 
   <el-row :gutter="20" class="el-cord"> 
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">{{ leaveTotal }}</span>人请假</div>
  </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">{{ lateTotal }}</span>人早退</div>
  </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">{{ earlyTotal }}</span>人旷课</div>
  </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">{{ escapeTotal }}</span>人迟到</div>
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
    data() {
      return {
        leaveTotal: 0,
        lateTotal: 0,
        earlyTotal: 0,
        escapeTotal: 0,
        studentCount:0
      }
    },
    mounted(){
      this.leaveTotal = this.$store.state.leaveTotal
      this.lateTotal = this.$store.state.lateTotal
      this.earlyTotal = this.$store.state.earlyTotal
      this.escapeTotal = this.$store.state.escapeTotal
      this.studentCount = this.$store.state.classStudentCount
     
   },
    computed:{
   ...mapGetters([
     'getLeaveTotal',
     'getLateTotal',
     'getEarlyTotal',
     'getEscapeTotal',
     'getClassStudentCount'
   ])
 },
  watch:{
   getLeaveTotal: function(li){
      this.leaveTotal=li
   },
   getLateTotal: function(li){
     this.lateTotal=li
   },
   getEarlyTotal: function(li){
     this.earlyTotal=li
   },
    getEscapeTotal: function(li){
     this.escapeTotal=li
   },
   getClassStudentCount: function(li){
     this.studentCount=li
   }
 },
 methods:{
   pesonnelFun(){
    this.$store.commit('setPesonnelType',1)
    this.$store.commit('setSkip',1)
   },
   traineeFun(){
    this.$store.commit('setPesonnelType',1)
    this.$store.commit('setSkip',0)
     var that=this,schoolClassListAry = []
     var HTTP = axios.create({
    baseURL:this.$local.temporary() 
    })
    HTTP.post("/appconsole/student/list", Qs.stringify({ 
      'schoolId': this.$store.state.schoolId ,
      'pageNo': 1 ,
      'pageSize': 24,
      'keyword': ''
      }))
    .then(res => {
    var data =res.data
    console.log(data)
    if(data.code==0){
     $.each(data.data.schoolClassList,function(s,slem){
        var sAry ={
          'name':slem.name,
          'id':slem.id
        }
        schoolClassListAry.push(sAry)
      })
    //  console.log(JSON.stringify(schoolClassListAry))
       that.$store.commit('setSchoolClassList',JSON.stringify(schoolClassListAry))  
    }
    })
   .catch(res =>{

    })
    //
   }
 }
  }
</script>
  