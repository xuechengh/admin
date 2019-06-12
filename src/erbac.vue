<template>
<div style=" overflow:hidden;">
<div class="searchBtn" v-show="conservator">
<el-row :gutter="20">
  <el-col :span="24" style="position:relative;">
  <div class="grid-content bg-purple" style="text-align:left;">
  <div style="padding:0 80px 0 5px;">
<el-input placeholder="请输入老师的姓名或手机号..." v-model="nameLike"></el-input>
 </div>
 <div style="position:absolute;top:0;right:0;width:70px;">
 <el-button type="primary" @click="conservatorFun()">搜索</el-button>
 </div>
  </div>
  </el-col>
</el-row>
</div>

<div v-show="!conservator">

<div class="administrators"  :key="infor" v-for="(ibem,infor) in typeList">
 <el-row :gutter="20" style="border-bottom:1px solid rgb(242,242,242);">
  <el-col :span="12" class="el-pan el-l el-1" style="border:0;"><div class="grid-content bg-purple" style="font-size:14px;">{{ibem}}</div></el-col>
  <el-col :span="12" class="el-pan el-r el-r-padding" style="border:0;"><div class="grid-content bg-purple">
 <router-link :to="{name:'erbac'}" tag='a' @click.native='conservatorFun(infor+1)' style="border:1px solid writh;padding:10px 0;" > <span class="el-icon-plus" style="width:60px;font-size:16px;text-align:center;padding:10px 0;border:1px solid writh;"></span> </router-link>
  &nbsp;
  <span class="el-icon-arrow-down stretch"  style="border:0;background:#fff;font-size:16px;" >
  </span>
  &nbsp;
  </div></el-col>
</el-row>   

<div class="el-content" >
<div id="modelBlem" style=" overflow:hidden;background-color:#fff;padding:0 0 10px 0;">

  <div class="modelBlock el-moudle el-242" style="opacity:0;" name="modelBlock" :byId="item.id" :userId="item.sysUserId" v-if="infor==item.type-1" :admin="item.sysUserId"  :key="index" v-for="(item,index) in erbacList" >
  <div class="ft-moudle el-white" v-if="item.type==1">
  <router-link v-if="item.sysUserId!=adminUserId " :to="{name:'Gpannel',params:{resourceIds:item.resourceIds,id:item.id}}" tag="a">
  <div class="pictureAccompany">
  <img v-if="item.photoUrl" :src="item.photoUrl" />
  <img v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png" />
  <div class="genre"><span name="noteName" ></span></div>
  </div>
  <div class="genre genre-writh">
  <span >{{item.sysUserName}}</span>
  </div>
  </router-link>
  <router-link v-else :to="{name:'erbac'}" tag="a" @click.native="intendant()">
  <div class="pictureAccompany">
  <img v-if="item.photoUrl" :src="item.photoUrl" />
  <img v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png" />
  <div class="genre"><span name="noteName" ></span></div>
  </div>
  <div class="genre genre-writh">
  <span >{{item.sysUserName}}</span>
  </div>
  </router-link>
  <div class="genre genre-writh">
  <span v-if="item.sysUserId!=adminUserId ">
  <router-link v-show="amend" style="color:lightseagreen;padding:0;font-size:13px;" :to="{name:'Gpannel',params:{resourceIds:item.resourceIds,id:item.id}}"   @click="open2(item.id)">修改权限</router-link>
  <el-button style="color:red;padding:0;font-size:13px;" type="text"  @click="open2(item.id)">删除</el-button>
  
  </span>
   <span v-else>超级管理员</span>
  </div>
  
  </div>
  <div class="ft-moudle el-white" v-else>
  <div class="pictureAccompany">
   <img v-if="item.photoUrl" :src="item.photoUrl" />
  <img v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png" />
  <div class="genre"><span name="noteName" ></span></div>
  </div>
  <div class="genre genre-writh">
  <span >{{item.sysUserName}}</span>
  </div>
  <div class="genre genre-writh">
  <span v-if="item.sysUserId!=adminUserId ">
   <el-button style="color:red;padding:0;font-size:13px;" type="text"  @click="open2(item.id)">删除</el-button>
  </span>
   <span v-else>超级管理员</span>
  </div>
  </div>

  </div>
</div>
</div>
 
</div>

</div>
<div class="addErbac" v-show="conservator">
<div id="addErbac" style=" overflow:hidden;padding-top:0px;">
  <div class="modelBlock el-moudle el-242" style="background:#fff;opacity:0;"  name="modelBlock" :schoolId="item.schoolId" :userId="item.userId"  :key="index" v-for="(item,index) in erbacList" >
  <div class="ft-moudle el-white" >
 <span class="shade"></span>
 
  <div class="pictureAccompany"> 
  <div class="checkboxBtn" v-show="erbacBtn">
  <img  class="boxBtn boxBtna"  src="../src/assets/images/unchecke.png">
   <img  class="boxBtn boxBtnb"  src="../src/assets/images/checke.png">
  </div>
  <img v-if="item.photoUrl" :src="item.photoUrl" />
  <img v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png" />
  <img class="tickImg" src="../src/assets/images/tick.png">
  <div class="genre"><span name="noteName" ></span></div>
  </div>
  <div class="genre genre-writh" style="text-align:center;text-indent:0;background:#fff;">
  <span >{{item.name}}</span>
  </div>
  <div class="genre genre-writh" style=" border-radius:5px;color:#999;text-align:center;text-indent:0;background:#fff;padding-bottom:0px;">
  <span v-if="item.roleIds">{{role[item.roleIds]}}</span>
  <span v-else>&nbsp;&nbsp;</span> 
  </div>

  </div>
  </div>

</div>
</div>
<el-row>
<div class="sureBtn" v-show="erbacBtn" >
  <el-col :span="24">
  <div class="grid-content bg-purple-dark erbacSure" >
  <router-link :to="{name:'erbac'}" @click.native="gpanSure" style="display:block;background:rgb(13, 16, 168);color:#fff;">
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
export default {
   data: () => ({ 
    list:[1,2,3,4],
    typeList:[
      '控制后台',
      '直播管理员',
      '学习圈管理员',
      '展厅管理员',
      '班级管理员',
      '云课堂管理原',
      '内部资料管理员',
      '选修课管理员',
      '公共课管理员'
    ],
    role:{
     '3' : '超级管理员',
     '10':'校长',
     '11':'教学主管',
     '12':'招生主管',
     '13':'专业老师',
     '14':'行政主管',
     '15':'后勤主管',
     '16':'后勤老师',
     '17':'文化课老师',
     '18':'行政老师'
    },
    conservator:false,
    erbacBtn:false,
    visible2: true,
    erbacList:[],
    adminUserId:0,
    type:0,
    nameLike:'',
    screenErbac:[],
    amend:true
   }),
   watch:{
    erbacList(){
      this.$nextTick(()=>{
        if($(window).outerWidth()<360){
          this.amend=false
        }
        
      $('.el-main').height($(document).height())  
         var that=this
       $(function(){
  //  ($('#modelBlem').children().length)
        $documentWidth=$(document).width()
    $maxWidth=180
    $minWidth=70
    $k=null
 
    $.modelBlock=function(){
     //  ($documentWidth) 
     //  ($w)
     let $w
    
      $("html,body").animate({scrollTop:0},10)
   
    $('.modelBlock ').each(function(i,elem){
      let $elemWidth=$(elem).outerWidth()
      let  $elemHeight=$(elem).outerHeight()
      
      let $ratio=$elemWidth/$elemHeight
      $w=$k

     
     $(elem).find('img').css({
        'width':$w,
        'height':$w 
     })
     $(elem).find('.pictureAccompany').css({
      'width':$w,
      'height':$w 
    })
    $(elem).find('.pictureAccompany').children('.genre').css({
      'position':'absolute',
      'bottom':0,
      'width':$w,
      'opacity':'0.35'
    })
    let $h=$w/$ratio
    $(elem).css({
        'width':$w
    })
    $w=$(elem).outerWidth()
    
     let $num=parseInt($documentWidth/$w)
     let $surplus=$documentWidth-$num*$w
      if($surplus>=0){
      let  $m=$surplus/($num+1)
      }
     
      const lw=parseInt($(window).outerWidth()/$w)
  // console.log($(window).outerWidth()-lw*$w)
   
     $(elem).css({
        'margin-left':($(window).outerWidth()-lw*$w)/(lw+1)+'px'
      })
   
     if($('.modelBlock ').length-1==i){
      that.sheet=true
     $('.modelBlock ').css('opacity',1)
   
     }
         
      
      
    })
    }
$.finalWidth=function(){
    for(var e=$minWidth;e<=$maxWidth;$maxWidth--){
           if(($documentWidth-36)/$maxWidth>=3){
            $k=$maxWidth
          //  //  ('-------')
           // //  ($k)
            break;
           }
    } 
    $.modelBlock() 
  } 
 $.finalWidth()
 $.supervisor=function(){
   $('.administrators').each(function(i,elem){
     $(elem).find('.modelBlock').each(function(j,alem){
       let admin=parseInt($(alem).attr('admin')) 
       if(that.adminUserId==admin){
         if(j){
       $(alem).insertBefore($(elem).find('.modelBlock').eq(0))
         }
         
       }
     })
   })
 }
 $.supervisor()
 $.stretch=function(){
   $('.stretch').each(function(i,elem){
     $(elem).unbind()
    $(elem).on('click',function(){
       let  elContent= $(elem).parents('.administrators').find('.el-content')
       let  elHeight=elContent.height()
       if(elHeight){
        elContent.attr('elHeight',elHeight)
       }

     // console.log(elContent.css('opacity'))
       if(elContent.css('opacity')==1){
       $(elem).parents('.administrators').find('.el-content').animate({
        height:0,
        opacity:0
      },600,function(){
        $(elem).removeClass('el-icon-arrow-down ')
        $(elem).addClass('el-icon-arrow-right')
      })
       }else{
        elHeight=parseInt(elContent.attr('elHeight')) 
     $(elem).parents('.administrators').find('.el-content').animate({
        height:elHeight,
        opacity:1
      },600,function(){
       $(elem).removeClass('el-icon-arrow-right')
        $(elem).addClass('el-icon-arrow-down')
      })
       }
    
    })
   })
 }
 $.stretch()
 $.tick=function(){
  $('#addErbac').children('.modelBlock').each(function(i,elem){
    console.log($(elem).outerWidth())
    $(elem).find('.boxBtn').css({
     'width':$(elem).outerWidth()*20 /110,
     'height':$(elem).outerWidth()*20 /110
    })
   $(elem).unbind()
   $(elem).on('click',function(){
     let schoolId=parseInt($(this).attr('schoolId'))
     let userId=parseInt($(this).attr('userId')) 
      if(JSON.stringify(that.type)==1){ 
    $(this).find('.tickImg').animate({
      opacity:1
    },0,function(){
    setTimeout(function(){
    that.$router.push({  
           name: 'Gpannel',
           params:{
            erbacType:1,
            schoolId:schoolId,
            userId:userId,
            type:that.type
           } 
        })  
    },300)
    
     
       
    })
    }else{
    // alert(2)
      if(!$(this).find('.boxBtn').hasClass('pitch')){
     //   alert(1)
       $(this).find('.boxBtnb').addClass('pitch')
       $(this).find('.shade').show()
       $(this).find('.boxBtna').hide()
       $(this).find('.boxBtnb').show()
       
      }else{
       $(this).find('.boxBtnb').removeClass('pitch') 
       $(this).find('.shade').hide() 
       $(this).find('.boxBtnb').hide()
       $(this).find('.boxBtna').show()
      }
       

    }
   })
  if(JSON.stringify(that.type)==1){ 
    $(elem).find('.checkboxBtn').hide()
  }

  })
 }
 $.tick()
$.screenErbac=function(){
 console.log(that.screenErbac)
$('.modelBlock').each(function(i,elem){
  let userId=parseInt($(elem).attr('userId')) 
  $.each(that.screenErbac,function(e,alem){
   if(alem==userId){
    $(elem).hide()
    $('.modelBlock:visible').length?true:( that.$message({
            type: 'warning',
            message: '该人员已在管理员列表中。',
            center:true
         }))
   } 
  })
})
}
 $.screenErbac()
 }) 
 
       })
    }
   },
   created(){
    
    
     var that=this
     
      $(document).bind("contextmenu",function(e){
        return false;
    })
       var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/index/adminList", Qs.stringify({ 
      'schoolId': this.$store.state.schoolId 
      }))
    .then(res => {
      var data=res.data
      if(data.code==0){
      this.adminUserId=data.data.adminUserId  
      this.erbacList=data.data.list
       this.screenErbac=[]
      }
       console.log(data)
    })
    .catch(error => {
      //  (error)
    })
    this.$nextTick(()=>{
      $.popstate=function(){
    $(window).unbind('popstate')
 $(window).on('popstate', function () {
 //  that.$store.commit('setAcropperTop',0)
 if(that.conservator){
  
  that.$router.push({
    name:'erbac'
  })
 }else{
  that.$router.push({
    name:'index'
  })
 }
 }) 
 }
$.popstate() 
/*
 if(this.$store.state.acropperTop){
    $('.el-main').animate({scrollTop:this.$store.state.acropperTop},1000)
  }
  
*/
    })
 
       
   },
   methods:{
     conservatorFun:function(typeIndex){
      
       var that=this
      this.erbacList=[]
     //  this.$store.commit('setAcropperTop',$('.el-main').scrollTop())
        $('.administrators').eq(typeIndex-1).find('.modelBlock').each(function(i,elem){
         let userId=parseInt($(elem).attr('userId'))
         that.screenErbac.push(userId)
        })
     //  console.log(this.nameLike)
       this.conservator=true
       if(typeIndex!=1&&typeIndex){
         this.erbacBtn=true
       }
       const loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })  
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/index/teacherList", Qs.stringify({ 
      'schoolId': this.$store.state.schoolId,
      'nameLike': this.nameLike
      }))
    .then(res => {
      var data=res.data
      if(data.code==0){
         loading.close() 
      this.erbacList=data.data.teacherList
      /*
      data.data.teacherList.length?true:( this.$message({
            type: 'error',
            message: '找不到此人，请确认输入是否正确。',
            center:true
         }))
        */ 
      if(typeIndex){
        this.type=typeIndex
      }
      
      }
       console.log(data)
    })
    .catch(error => {
      //  (error)
    })
     },
       open2:function(id) {
         console.log(id)
        this.$confirm('是否删除该管理员?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/index/deleteAdmin", Qs.stringify({ 
      'id': id
      }))
    .then(res => {
      var data=res.data
      if(data.code==0){
        $('.modelBlock').each(function(i,elem){
         if(parseInt($(elem).attr('byId'))==id){
           $(elem).remove()
         }
        })
     this.$message({
            type: 'success',
            message: '删除成功!',
            center:true
          });
      }
       console.log(data)
    })
    .catch(error => {
      //  (error)
    })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center:true
          });          
        });
        this.$nextTick(()=>{
          $('.el-message-box').css({
           'width':'90%',
           'height':'130px' 
          })
          $('.el-message-box__title').css('font-size','14px')
          $('.el-message-box__message').css('font-size','12px')
        })
      },
      gpanSure(){
        
        var that=this
      $('.boxBtnb').each(function(i,elem){
       if($(elem).hasClass('pitch')){
         let userId=parseInt($(elem).parents('.modelBlock').attr('userId')) 
         let schoolId=parseInt($(elem).parents('.modelBlock').attr('schoolId')) 
    var HTTP = axios.create({
    baseURL:that.$local.temporary()
    })
    HTTP.post("/appconsole/index/addAdmin", Qs.stringify({ 
      'userId': userId,
      'schoolId': schoolId,
      'type': that.type,
      'resourceIds': ''
      }))
      .then(res => {
      var data=res.data
      if(data.code==0){
        
        that.$router.push({
          name: 'atowone',
          params: {
            stationId:6,
            name:'erbac'
            }
        })
        
      }
       console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
       }
      })  
 
      },
     intendant(){
       this.$message({
          message: '超级管理的权限不能被修改',
          type: 'warning',
          center:true
        })
     } 
   }
}
</script>