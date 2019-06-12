<template>
<div>
<div class="searchBtn searchshadow">
<el-row :gutter="20">
  <el-col :span="24" style="padding:0;position:relative;">
  <div class="grid-content bg-purple" >
  <div style="position:absolute;top:0;left:15px;">
 <span >
   <el-date-picker  style="width:135px;"
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </span>
  </div>
  <div style="padding:0 80px 0 155px;">
  <el-input v-model="mobile" :placeholder="searchnam" ></el-input>
  </div>
   <div style="position:absolute;right:20px;top:0;">
   <el-button type="primary" @click="inspectFun()">搜索</el-button>
   </div>
  </div>
  </el-col>
</el-row>
</div>

<div class="userlist">

<div class="tabulatcard" :key="index" v-for="(item,index) in userlist">
<el-row :gutter="20">
  <el-col :span="24">
  <div class="grid-content bg-purple">
  <div class="tabulatext" >
  <span class="character" >
  <span class="tabl" >{{item.name}}</span>
  <span class="tabr tabb  el-size-14"  v-if="item.moblie" >{{item.moblie}}</span>
  <span class="tabr tabb el-size-14" v-else>暂无手机号</span>
  </span>
  <span class="character" >
    <span class="tabr"> 
   <button class="tag-read" :data-clipboard-text="item.moblie" @click="copy()"><span class="el-blur abn" style="position:relative;right:-6px;">复制号码</span></button>
    </span>
  </span>
  <span class="character" style="line-height:20px;" ><span class="tab el-blur el-size-14 tinm" >{{item.createTime.time}}</span></span>
  </div>
  </div>
  </el-col>
</el-row>
<div class="tabImgman">
<img class="tabImg" v-if="item.photoUrl" :src="item.photoUrl">
<img class="tabImg" v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png">
</div>
<div class="selectdial">
<router-link :to="{name:'userlist'}"  tag="a" :href="'tel:'+item.moblie+'?v=' + (new Date().getTime())" @click.native="toAndroid(item.moblie)"  style="display:block;">
<span class="dialup"><span class="dialImg el-icon-phone"></span></span>
<span class="dialup diagrn">{{mobileType}}</span>
</router-link>
</div>
</div>

</div>

 <div id="cb"  class="cb el-background-blur " style="background:rgb(242,242,242);"    v-loading="loading" >
    <span class="spancon mb" style="position:absolute;top:5px;"></span>
 </div>

</div>
</template>
<style scoped>
@import 'assets/css/erbac.css'
</style>
<script>
 import axios from 'axios'  
 import Qs from 'qs'
import Vue from 'vue'
import Clipboard from 'clipboard'
import Monment from 'moment'
Vue.prototype.moment = Monment
export default {
        data() {
            return {
            mobile:'',
            value1:'',
            userlist:[],
            copyBtn: null,
            message: '拷贝成功',
            start:'',
            loading:false,
            end:'',
            winken:true,
            pageNo:1,
            inum:0,
            searchnam:'输入手机号或用户名...',
            gettime:0,
            mobileType:'拨打号码'
            }    
        },
    watch:{
    value1(){
        let value1=this.value1
        let value = this.moment(value1).format("YYYY-MM-DD")
        let start=''
        let end=''
       // alert(value)
       if(value&&value!='Invalid date'){
       start=value
       end=this.formatPeriods(value)
       }
       this.start=start
       this.end=end
        this.pageNo=1  
        this.appconsole()
    
        
    },
  userlist(){
     var u = navigator.userAgent, app = navigator.appVersion,isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
   if(isiOS){
     // alert(u.indexOf('iPad'))
     if(u.indexOf('iPad') == -1){
    this.mobileType='长按拨号'
     }
   
   }
    this.winken=true
      $('.spancon').removeClass('el-icon-loading')
     this.$nextTick(()=>{
      if($(window).outerWidth()<=360){
        this.searchnam='搜索...'
     $('.tabulatcard').each(function(t,tlem){
    //  console.log($(tlem).find('.tabl').length)
    $(tlem).css({
      'height':'60px',
      'marginBottom':'50px'
    })
  
    $(tlem).find('.character').css({
      'height':'28px',
      'lineHeight':'28px',
      'padding':'0 90px 0 80px'
    })
   
  
     $(tlem).find('.tabl').css({
       'fontSize':'12px'
     })
     
     $(tlem).find('.tabr').css({
       'fontSize':'12px'
     })
     $(tlem).find('.abn').css({
       'fontSize':'12px'
     })
     $(tlem).find('.tinm').css({
       'fontSize':'12px'
     })
 
    
   
    
     $(tlem).find('.tabImgman').css({
       'width':'60px',
       'height':'60px'
     })
      
     $(tlem).find('.tabImg').css({
       'width':'60px',
       'height':'60px'
     })
     })
     
      } 
     })
  }
    },
    created(){
      var that=this
      document.title="用户列表"
     $('.el-main').height($(window).outerHeight())  
    $('.el-main').css({
    'background':'rgb(242,242,242)'
    })
     this.appconsole()
    this.$nextTick(()=>{
      $.popstate=function(){
        $(window).unbind('popstate')
 $(window).on('popstate', function () {
  document.title='管理控制台'
  that.$router.push({
    name:'index'
  })

 }) 
 }
$.popstate() 
     
    })
  

    },
    mounted() {
    
    $('meta[name=viewport]').attr('content','width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no')  
    window.addEventListener('scroll', this.handleScroll, false)
  },
    methods:{
     inspectFun(){
    this.pageNo=1   
    this.appconsole()
     },
     setDate() {
         alert(1)
     },
     copyLink(){
    
     },
    copy() {
   
        var clipboard = new Clipboard('.tag-read')
        
        clipboard.on('success', e => {
          this.$message({
          message: '复制成功',
          type: 'success',
          center: true
        })
          clipboard.destroy()
        })
        clipboard.on('error', e => {
           this.$message({
          message: '该浏览器不支持自动复制',
          type: 'error',
          center: true
        })
          // 释放内存
          clipboard.destroy()
        })
      },
      appconsole:function(){
        
        console.log(this.start)
        console.log(this.end)
        console.log(this.mobile)
        this.inum=0
        var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
     HTTP.post("/appconsole/index/userList", Qs.stringify({
       'schoolId': this.$store.state.schoolId,
       'nameLike':this.mobile,
       'start':this.start,
       'end':this.end,
       pageSize:12,
       pageNo:this.pageNo
       }))
    .then(res => {
        var data=res.data
        if(data.code==0){
        /*  
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        */
        let that=this
       if(!data.data.userList.length){
       $('.spancon').removeClass('el-icon-loading')
       }
       if(this.pageNo==1){
        that.userlist=data.data.userList
        /*
        data.data.userList.length?true:( that.$message({
          showClose: true,
          message: '找不到此人，请确认输入是否正确。',
          type: 'error',
          center:true
          }) )
          */
       }else{
         $.each(data.data.userList,function(p,plem){
         that.userlist.push(plem)
        })
       }
       $.each(data.data.userList,function(b,blem){
         var IMG = new Image()
         var Src=''
               var oDate = new Date(blem.createTime.time),  
    oYear = oDate.getFullYear(),   
    oMonth = oDate.getMonth()+1,  
    oDay = oDate.getDate(),  
    oHour = oDate.getHours(),  
    oMin = oDate.getMinutes(),  
    oSen = oDate.getSeconds(),  
    oTime = oYear +'-'+ getDouble(oMonth) +'-'+ getDouble(oDay) +'  '+ getDouble(oHour) +':'+ getDouble(oMin) +':'+getDouble(oSen);
    function getDouble(num){  
    if(parseInt(num) < 10){  
        num = '0'+num;  
    }  
    return num;  
    }
         blem.createTime.time=oTime
         if(blem.photoUrl){
           Src=blem.photoUrl
         }else{
          Src='https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png' 
         }
         IMG.src=Src
         	IMG.onload = function() {
             that.inum++
              if(data.data.userList.length==that.inum){
             // loading.close()
          } 
            
           }
       })
        }
        console.log(data)
    })
   .catch(error => {
       console.log(error)
    })
      },
    formatPeriods:function(date){
      var startTime = new Date(date).getTime() +  24 * 60 * 60 * 1000
    var startYear = new Date(startTime).getFullYear()
    var startMonth = new Date(startTime).getMonth() + 1
    var startDay = new Date(startTime).getDate()
    if(startMonth<10){
     startMonth="0"+startMonth
    }
    if(startDay<10){
      startDay="0"+startDay
    }
    return startYear+'-'+startMonth+'-'+startDay
    },
     handleScroll (){
    // console.log(this.winken)
   var that=this
   var winH  
   var scrollTop = this.$parent.$el.scrollTop
   if (this.winken) {
    this.pageNo++
    console.log('到达')
    this.winken=false
    
   if($('.spancon').hasClass('mb')){
     $('.spancon').addClass('el-icon-loading') 
   }
     
    
    
    setTimeout(function(){
    that.appconsole()
    },1000)
    
   
  }
   },
   callPhone(call,index){
   //  alert('tel:'+call+"?v=" + (new Date().getTime()))
   $('.selectdial').each(function(i,elem){
     $(elem).unbind('click')
     $(elem).on('click',function(){
       alert(0)
      $(elem).css({
       'border':'1px solid red'
     }) 
     })
     
   })
  
   window.location.href = 'tel:'+call+"?v=" + (new Date().getTime())
  //  window.location.replace('tel:'+call)
   },
   getMyDate(str){
//拼接时间  
   console.log(oTime)
   },
   toAndroid(num){
  var u = navigator.userAgent, app = navigator.appVersion,isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
   
  if(isAndroid){
   
   var BackParams = JSON.stringify({
           "action": "phoneCall",
           "phoneNum": num
       });
                    
       try {
          
          
            window.jsInterface.invokeMethod('toAndroid', BackParams);
       } catch (error) {
            console.log(error)
       }
  }
    

   

   }

    }
}
</script>