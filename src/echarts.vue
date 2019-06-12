<template>
<div>

<div v-show="studyCircles" class="newcoursewareScreening">
<el-row class="elRow" style="z-index:5;">
  <el-col class="elCol" :span="6">
  <div class="grid-content bg-purple ">
<el-button  class="el-screening el-screening-1" >{{ message }}</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="6">
  <div class="grid-content bg-purple">

  </div>
  </el-col>
  <el-col class="elCol" :span="6" v-show="!showBtn">
  <div class="grid-content bg-purple">
  <el-button @click="success" type="success">审核设置</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="6" v-show="!showBtn">
  <div class="grid-content bg-purple">
  <el-button @click="warning" type="warning">标签管理</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="6" v-show="showBlock"> 
  <div class="grid-content bg-purple">
  </div>
  </el-col>
  <el-col class="elCol" :span="2" v-show="showAll"> 
  <div class="grid-content bg-purple">
  </div>
  </el-col>
  <el-col class="elCol" :span="4" v-show="showAll"> 
  <div class="grid-content bg-purple">
  <el-button @click="primary" v-show="false" type="primary">全选</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="6" v-show="showBtn">
  <div class="grid-content bg-purple">
  <el-button @click="courseSure" type="success">确定</el-button>
  </div>
  </el-col>
</el-row> 
</div>
<router-view v-show="echarts"></router-view>
<router-view @status="status" name="auditSettings" v-show="audit"></router-view>
<router-view @normalCheck="normalCheck"  @counterShowArray="counterShowArray" @pitchOn="pitchOn" :checkAll="checkAll" name="auditCounter" v-show="mark"></router-view>
</div>
</template>
<script>
 import axios from 'axios'  
 import Qs from 'qs'
 // jquery
export default {
	data() {
      return {
        checkAll: 0,
        studyCircles: false,
        showBtn:false,
        showBlock:false,
        showAll:false,
        echarts:true,
        message:'学习圈管理',
        hert: '',
        audit:false,
        mark:false,
        bert:'',
        dert:''
      }    
    }, 
    created(){
      var that=this
      
    if(this.$route.params.activeType==3){
      this.studyCircles=true 
      
    }
     this.$nextTick(()=>{
      $.popstate=function(){
        $(window).unbind('popstate')
 $(window).on('popstate', function () {
  that.$router.push({ 
    name:'echartsContent',
    params:{
      activeType:3
    }
  })
 }) 
 }
// $.popstate() 
    })
    },
    methods:{
      success(){
   this.echarts=false
   this.showBtn=true
   this.showBlock=true
   this.audit=true
   this.message='审核设置'
  // //  ('确定')
  
      }, 
     warning(){
         this.echarts=false
         this.showBtn=true
         this.mark=true
         this.showAll=true
         this.message='标签管理(橙色是选中状态)' 
         if(this.$store.state.schoolId){
          this.$store.commit('setSchoolId',this.$store.state.schoolId)
         }
     }, 
    courseSure(){
     
      var that=this
     // console.log(this.hert)
      // console.log(this.$store.state.schoolId)
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    if(this.audit){
      HTTP.post("/appconsole/forum/updateAuditing", Qs.stringify({
       'schoolId': this.$store.state.schoolId,
       'status':this.hert
       }))
    .then(res => {
        var data=res.data
     // //  ('在这')
     // //  (data) 
      if(!parseInt(data.code)){
       that.$router.push({  
          name: 'atowone',
          params: {
            stationId:6,
            name:'echartsContent',
            activeType:3
            }
           })
      }
    })
   .catch(error => {
       //  (error)
    })
    }
   
    if(this.dert.length){
  
      var mn=true
       console.log(this.dert)
      $.each(this.dert,function(b,blem){
        var status=1
       $.each(that.bert,function(d,dlem){
        if(blem==dlem){
        status=0
        }else{
        mn=false
        }
       })

    //   console.log(that.$store.state.schoolId)
    //   console.log(blem)
    //   console.log(status)
     //  console.log('----------')
       HTTP.post("/appconsole/forum/updateBlock", Qs.stringify({
       'schoolId': that.$store.state.schoolId,
       'id':blem,
       'status':status
       }))
    .then(res => {
        var data=res.data
      
     
      //  (data)
      if(!parseInt(data.code)){
         that.$router.push({  
          name: 'atowone',
          params: {
            stationId:6,
            name:'echartsContent',
            activeType:3
            }
           })
      }
    })
   .catch(error => {
     //  (error)
    })
      })
    }
    },
    status(val){
     // //  (val)
      this.hert=val
    },
    counterShowArray(val){
      
      this.bert=val
    },
    pitchOn(val){
      this.dert=val
    },
    primary(){
     
      this.checkAll=1
    },
    normalCheck(val){
      this.checkAll=val
    }

    }
    }
</script>
<style scoped>
@import 'assets/css/courseware.css'
</style>