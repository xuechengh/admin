<template>
<div>
<div class="panBar" v-show="false">
<el-row :gutter="20" >
  <el-col :span="4" >
  <div class="grid-content bg-purple">
  <img class="panImg">
  </div>
  </el-col>
  <el-col :span="3" >
  <div class="grid-content bg-purple">
  </div>
  </el-col>
  <el-col :span="16" class="panStr" >
  <div class="grid-content bg-purple">
  <el-row :gutter="20" >
  <el-col :span="24" class="panl"><div class="grid-content bg-purple">111</div></el-col>
  <el-col :span="24" class="panl"><div class="grid-content bg-purple">222</div></el-col>
</el-row>
  </div>
  </el-col>
</el-row>
</div>
<el-row :gutter="20" >
  <el-col :span="24">
  <div class="grid-content bg-purple gpannels">
  <div class="gpantil" >
  <el-row :gutter="20" class="gert" >
  <el-col :span="17"><div class="grid-content bg-purple" style="text-indent:1em;background:rgb(242,242,242);">&nbsp;后台中管理的板块和功能</div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple" style="text-align:right;background:rgb(242,242,242);">全选</div></el-col>
  <el-col :span="3">
  <div class="grid-content bg-purple donBox" style="text-align:center;background:rgb(242,242,242);position:relative">
 <input class="boxall" type="checkbox" style="position:relative;top:5px;" >
  <div style="height:100%;width:100%;position:absolute;top:0;left:0;"></div>
  </div>
  </el-col>
</el-row>
  </div>
 
   <div class="gpantil gpantils" :key="index" v-for="(item,index) in gpannelist">
  <el-row :gutter="20" >
  <el-col :span="19"><div class="grid-content bg-purple" style="text-indent:1em;">&nbsp;{{item}}</div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple" style="text-align:right;"></div></el-col>
  <el-col :span="3">
  <div class="grid-content bg-purple monBox" style="text-align:center;position:relative; ">
  <input class="el-checkbox__new__input boxBtn" type="checkbox" style="position:relative;top:5px;">
  <div style="height:100%;width:100%;position:absolute;top:0;left:0;"></div>
  </div>
  </el-col>
</el-row>
  </div>

  </div>
  </el-col>
</el-row>
<el-row>
<div class="sureBtn"  >

  <el-col :span="24">
  <div class="grid-content bg-purple-dark erbacSure" >
  <router-link :to="{name:'Gpannel'}" @click.native="gpanSure" style="display:block;background:rgb(13, 16, 168);color:#fff;">
  确定
  </router-link>
  </div>
  </el-col>

</div>
</el-row>
</div>
</template>
<style scoped>
@import 'assets/css/erbac.css'
</style>
<script>
import axios from 'axios'
import Qs from 'qs'
// jquery
let gpannelist=[
  '版本套餐管理',
  '注册用户丶日活和月活查看',
  '学习卡管理',
  '人事管理',
  '班级学员管理',
  '权限管理',
  '启动页广告/banner/模块自定义/主页布局',
  '提交需求',
  '官网管理',
  '展厅管理',
  '咨询管理',
  '报名管理',
  '考勤管理',
  '课件管理',
  '视频管理',
  '电子书管理',
  '直播管理',
  '班级管理',
  '在线课程管理',
  '学习圈管理',
  '新闻管理',
  '家校通',
  '资讯管理',
  '内部资料管理',
  '成绩管理',
  '智能硬件管理',
  '公共课'
]
export default {
   data: () => ({ 
     gpannelist:gpannelist,
     checkmon:0,
     checkbor:1,
     appStr:[]
   }),
   watch:{
     checkmon(){
        this.$nextTick(()=>{
          let that=this
        
       $('.el-checkbox__new__input').each(function(i,elem){
         if(that.checkmon){
          $(elem).attr('checked','checked')
         }else{
           if(that.checkbor){
              $(elem).removeAttr('checked')
           }
          
         }  
       })
        
        })
       console.log(this.checkmon)   
     }
   },
   created(){
       let that=this
       let appStr=this.$route.params.resourceIds
       if(appStr){
      this.appStr=appStr.split(',')
       }
       
       
     //  console.log($('.el-checkbox__new__input').length)
     //  console.log(this.appStr)
       this.$nextTick(()=>{
         var inm=0
      $('.el-main').height($(document).height()) 
    //  alert($('.monBox').length)
      $('.monBox').each(function(i,elem){
         $.each(that.appStr,function(a,alem){  
           if(parseInt(alem)-1==i){
             inm++
             $(elem).find('.el-checkbox__new__input').attr('checked','checked')
             console.log(inm)
           }
           if(inm==27){
             
            $('.donBox').find('.boxall').attr('checked','checked') 
           }
         })
         $(elem).on('click',function(){
          if($(elem).find('.el-checkbox__new__input').attr('checked')){
        
           $(elem).find('.el-checkbox__new__input').removeAttr('checked')
           inm--
           console.log(inm)
           $('.donBox').find('.boxall').removeAttr('checked')
           that.checkmon=0
           that.checkbor=0
          }else{
           
            $(elem).find('.el-checkbox__new__input').attr('checked','checked')
            inm++
            if(inm==27){
             console.log(inm)
            $('.donBox').find('.boxall').attr('checked','checked') 
           }
          }
         })
       }) 
       
       $('.donBox').on('click',function(){
         if($(this).find('.boxall').attr('checked')){
          $(this).find('.boxall').removeAttr('checked')
           $('.monBox').each(function(i,elem){
             $(elem).find('.el-checkbox__new__input').removeAttr('checked')
           })
            inm=0
         }else{
          $(this).find('.boxall').attr('checked','checked')
           $('.monBox').each(function(i,elem){
             $(elem).find('.el-checkbox__new__input').attr('checked','checked')
           })
           inm=27
         }
       })

       })
   },
   methods:{
     gpanSure(){
       let that=this
       let appStr=''
       this.appStr=[]
     $('.el-checkbox__new__input').each(function(i,elem){
       if($(elem).attr('checked')){
       that.appStr.push(i+1)
       }
     })    
     appStr=this.appStr.toString()
     
    // console.log(appStr)
    // console.log(this.$route.params.userId)
    // console.log(this.$route.params.schoolId)
    // console.log(this.$route.params.type)
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    if(this.$route.params.erbacType){
      if(appStr){
     HTTP.post("/appconsole/index/addAdmin", Qs.stringify({
        'userId': this.$route.params.userId,
        'schoolId': this.$route.params.schoolId,
        'resourceIds':appStr,
        'type': this.$route.params.type
        }))
    .then(res => {
      var data=res.data
     if(data.code == 0){
      this.$router.push({
        name:'erbac'
      })
      
     }
     console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
      }else{
        this.$message({
          message: '至少有一个权限',
          type: 'warning',
          center:true
        }) 
      }
    }else{
     // console.log(this.$route.params.id)
     console.log(appStr)
      if(appStr){
       HTTP.post("/appconsole/index/updateAdmin", Qs.stringify({
        'id': this.$route.params.id,
        'resourceIds':appStr
        }))
    .then(res => {
      var data=res.data
     if(data.code == 0){
       
       this.$router.push({
        name:'erbac'
      })
      
     }
     console.log(data)
    })
    .catch(error => {
      console.log(error)
    }) 
      }else{
         this.$message({
          message: '至少有一个权限',
          type: 'warning',
          center:true
        })
      }
      
    }
     
   
     }
   }
}
</script>   
