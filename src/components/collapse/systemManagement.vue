<template>
<div> 
<el-row :gutter="20" class="el-tum systemTum "  style="overflow:hidden;"  >
<el-col :span="24" > 
<div class="grid-content bg-purple " v-show="matament">
<el-collapse v-model="activeNames"  @change="handleChange" class="el-mraginTop-10 systemCab systemHeight" style="height:152px;">
  <el-collapse-item  name="1" style="padding:0;"  >
   <div slot="title" class="collapseTitle" >
     <span class="el-text-align-1" >系统管理</span>
    </div>
    <div style="background:#fff;" v-show="dmt" >
    <router-link :to="{name:'erbac'}" class="elCollapse" tag='div' >
    <a  class="firsta"><span class="el-text-align-1 supervise">权限管理</span><div class="el-icon-arrow-right iconRing" ></div></a>
    </router-link>
    </div>
    
    <div >
    <router-link  :to="{name:'effectivecrop'}" class="elCollapse" tag='div'>
    <a ><span class="el-text-align-1">APP Banner管理</span><div class="el-icon-arrow-right"></div></a>
    </router-link>
    </div>

     <div v-show="hideOut">
    <router-link  :to="{name:'appbanner'}" class="elCollapse" v-show="emt" tag='div'>
    <a ><span class="el-text-align-1">APP Banner管理</span><div class="el-icon-arrow-right"></div></a>
    </router-link>
    </div>
    <div>
    <router-link :to="{name:'modulecustom'}" class="elCollapse" v-show="emt" tag='div'>
    <a ><span class="el-text-align-1 supervise">模块自定义管理</span><div class="el-icon-arrow-right"></div></a>
    </router-link>
    </div>
   
    <div>
    <router-link to="/" class="elCollapse" tag='div' @click.native="typefun()">
    <a ><span class="el-text-align-1">主页布局管理</span><div class="el-icon-arrow-right"></div></a>
    </router-link>
    </div>
     <div v-show="hideOut">
    <router-link :to="{name:'aaa'}" class="elCollapse" tag='div'>
    <a ><span class="el-text-align-1">测试</span><div class="el-icon-arrow-right"></div></a>
    </router-link>
    </div>
    <div v-show="hideOut">
    <router-link :to="{name:'index'}" class="elCollapse" tag='div'>
    <a ><span class="el-text-align-1">提出需求</span><div class="el-icon-arrow-right"></div></a>
    </router-link>
    </div>
  </el-collapse-item>
</el-collapse>
</div>
</el-col>
</el-row>
</div>
</template> 
<script>
// jquery
import axios from 'axios'
import Qs from 'qs'
  export default {
    props: ['dmt','emt'],
    data() {
      return {
        activeNames: ['1'],
        hideOut:false,
        matament:0,
        systemHeight:152,
        setType:0
      }
    },
    watch:{
      dmt(){
       this.matament++
       
      },
      emt(){
        this.matament++
      },
      matament(){
      
        if(this.matament==1){
       
           this.$store.commit('setSystemHeight',102) 
           this.matemfun(102)
        }else if(this.matament==2){
          
          this.$store.commit('setSystemHeight',252)
          this.matemfun(252)
        }
      }
    },
    created(){
      this.$nextTick(()=>{
      //  alert(this.$store.state.systemHeight)
      if(this.$store.state.systemHeight){
        this.matemfun(this.$store.state.systemHeight)
        this.matament=this.$store.state.systemHeight
      }
        //  ('zhe里'+this.dmt)
     $('.systemTum').css('background','rgb(242,242,242)')
     $('.el-icon-arrow-right').css({
       'position':'relative',
       'right':'25px'
     })
     $('.systemCab').width($('.systemTum').width())  
     $('.el-collapse-item__content').css({
       'background':'rgb(242,242,242)'
       })
     $('.el-collapse-item__wrap').css(
       'border','1px solid rgb(242,242,242)'
      )
      $('.el-collapse-item__header').css('background','rgb(250,250,250)')
      $('.elCollapse').css('background','#fff')
      })
    },
    methods: {
      handleChange(val) {
        //  (val)
      //  alert($('.systemHeight').css('height'))
        if($('.systemHeight').css('height')=='48px'){
       $('.systemHeight').animate({
         height:252
       },300) 
        }else{
         $('.systemHeight').animate({
         height:48
       },300) 
        }
       
      
      },
      matemfun:function(height){
        // alert(height)
       $('.systemHeight').height(height) 
      },
      typefun:function(){ 
       var that=this 
       var HTTP = axios.create({
    baseURL:this.$local.temporary() 
    }) 
      HTTP.post("/appconsole/index/showBBLImgs", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId
       }))
    .then(res => {
      var data=res.data
      if(data.code==0){
        this.$store.commit('setAcroppertype',data.data.type)
      this.$router.replace({  
           path: '/Acropper'
       })
    // console.log(data.icoList)
     }
    //  console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
     
      }
    }
  }
</script>
