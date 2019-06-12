<template>
<div>

<div class="unpubRem unbor_front">
<el-row class="unpubMain elRow">
  <el-col class="elCol" :span="7">
  <div class="grid-content bg-purple un_reviseDiv" @click="reviseFun(0)" inum="1" >
   <img class="unpubImg unOpac"  src="../../assets/images/checke.png">
  <img class="unpubImg" src="../../assets/images/unchecke.png">
  <span class="unpubSpan" style="font-size:13px;">全部能借阅</span>
  </div>
  </el-col>
  <el-col class="elCol" :span="7"><div class="grid-content bg-purple-light un_reviseDiv" @click="reviseFun(1)" inum="0">
  <img class="unpubImg unOpac" src="../../assets/images/checke.png">
  <img class="unpubImg" src="../../assets/images/unchecke.png">
  <span class="unpubSpan" style="font-size:13px;">全部不能借阅</span>
  </div></el-col>
  <el-col class="elCol" :span="10" v-show="selectType"><div class="grid-content bg-purple un_reviseDiv " @click="reviseFun(2)" inum="2">
   <img class="unpubImg unOpac" src="../../assets/images/checke.png">
  <img class="unpubImg" src="../../assets/images/unchecke.png">
  <span class="unpubSpan" style="font-size:13px;">自定义可借阅人员</span>
  </div></el-col>
</el-row>
</div>

<div v-show="searchBtn">
<el-row class="unpubMain elRow"  >
  <el-col class="elCol" :span="24">
  <div class="grid-content bg-purple-dark unpub_textAlign_left" >
  <span style="position:relative;">
   <el-input
   type="text"
    placeholder="搜索..."
    v-model="searchvalue"
   >  
   
  </el-input>
  <div class="iconclose el-icon-circle-close " @click="delFun()" style="position:absolute;top:0px;right:6px;color:#999;" ></div>
  </span>
<el-button  size="mini" @click="unpubBun">
搜索
</el-button> 
  </div>
  </el-col>
</el-row>
</div>

<div class="unpubContent" v-show="searchBtn" style="overflow:hidden;padding-bottom:50px;">
 <div style="position:relative;overflow:hidden;" :byId="item.userId" class="modelBlock el-moudle el-242" :key="index"   v-for="(item,index) in teacherList">
  <div class="ft-moudle el-white" >
  <div class="pictureAccompany">
  <img :src="item.photoUrl" v-if="item.photoUrl" />
  <img v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png" />
  <img :byId="item.id" class="tickImg" src="../../assets/images/tick.png">
  </div>
   <div class="ungenre" ><span name="noteName" >{{item.name}}</span></div>
  <div class="ungenre uncolorgren"><span>{{role[item.roleIds]}}</span></div>
  </div>
 </div> 
</div>

<div class="sureCtn" >
<el-row class="elRow">
<div >
  <el-col class="elCol" :span="24">
  <div class="grid-content bg-purple-dark erbacSure" @click="sureFun()" >
  确认
  </div>
  </el-col>
</div>
</el-row>
</div>

</div>
</template>
<style >
@import '../../assets/css/courseware.css'
</style>
<script>
import axios from 'axios'
import Qs from 'qs'
  export default {
    data() {
    return {
    searchvalue:'',
    teacherList:[],
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
     '18':'行政老师',
     '99':'测试'
      },
    selectType:false,
    searchBtn:false,
    disposable:0,
    contentAry:[0]
    }
    },
    created(){
     this.init()
     
     
    },
    watch:{
     teacherList(){
     
       var that=this,paramsContent=this.$route.params.content,paramsStatus=this.$route.params.status
       this.$nextTick(()=>{
           
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
     $('.tickImg').css({
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
$.modelBlockFun=function(){
  $('.modelBlock').each(function(i,elem){
   $(elem).unbind('click')
   $(elem).on('click',function(){
    var $elem=$(this),inam=0,len=that.contentAry.length
 
    $(this).find('.tickImg').hasClass('tickbn')?($(this).find('.tickImg').css({'opacity':0}).removeClass('tickbn'),$.each(that.contentAry,function(c,clem){
      if(Number($elem.attr('byId'))==clem)
      that.contentAry.splice($.inArray(clem,that.contentAry),1)
    })):($(this).find('.tickImg').css({'opacity':1}).addClass('tickbn'),$.each(that.contentAry,function(c,clem){
       if(Number($elem.attr('byId'))!=clem)
       inam++
      if(inam==len){

      that.contentAry.push(Number($elem.attr('byId')))
      }
    }))
       
  // alert(that.contentAry)
   })
  })
} 
$.modelBlockFun()
$.tickFun=function(){
  
  if(paramsStatus==2){
$.each(paramsContent.split(','),function(c,clem){
   $('.modelBlock').each(function(i,elem){
     if(clem==Number($(elem).attr('byId'))){
      that.contentAry.push(clem)
      $(elem).find('.tickImg').css({'opacity':1}).addClass('tickbn')
     }
   })  
 })

  }
 that.disposable++
}
$.tickSave=function(){
  $.each(that.contentAry,function(c,clem){
   $('.modelBlock').each(function(i,elem){
     if(clem==Number($(elem).attr('byId'))){
     
      $(elem).find('.tickImg').css({'opacity':1}).addClass('tickbn')
     }
   }) 
  })
}
if(!that.disposable){
  
$.tickFun()
}else{
$.tickSave()  
}

       })
     } 
    },
    methods: {
      init(){
        var that=this
          document.title="修改"
          this.$nextTick(()=>{
    $.popstate=function(){
      
      $(window).on('popstate',function(){
        
        that.$router.push({
        name:'unpublishedData'
       })
      })
      
    //   window.history.forward(0);
     window.history.pushState('forward', null, 'unpubRevise'); 

      }
    $.popstate() 
            $('.el-main').css({
             'background':'rgb(242,242,242)' ,
             'height':$(window).outerHeight()

          })
          $('.el-input').css({
              'width':$(window).outerWidth()-70,
              'marginLeft':10
          }).find('input').css({
            'height':25
          })
         
          if(this.$route.params.type)
          this.selectType=true
          if(this.$route.params.status==2)
          this.teacherFun(),this.searchBtn=true
          var inum
          this.$route.params.status==0?inum=1:this.$route.params.status==1?inum=0:inum=this.$route.params.status
        
          $('.un_reviseDiv').eq(inum).find('img').eq(0).removeClass('unOpac'),$('.un_reviseDiv').eq(inum).addClass('db').find('img').eq(1).addClass('unOpac')
          })
         
       
      },
     reviseFun(i){
       var obj=$('.un_reviseDiv').eq(i)     
       obj.children().eq(0).hasClass('unOpac')?(obj.children().eq(0).removeClass('unOpac'),obj.addClass('db').children().eq(1).addClass('unOpac'),$('.un_reviseDiv').each(function(j,elem){
         if(i!=j){
        $(elem).children().eq(0).addClass('unOpac'),$(elem).removeClass('db').children().eq(1).removeClass('unOpac')
         }
       })):false
       if(i==2&&$('.un_reviseDiv').eq(i).children().eq(1).hasClass('unOpac')){
       this.teacherFun(),this.searchBtn=true
       }else{
         this.searchBtn=false
       }
     },
     teacherFun(keyword){
       keyword?true:keyword=''
       $('.modelBlock').find('.tickImg').css({'opacity':0}).removeClass('tickbn')
        var HTTP = axios.create({
      baseURL:this.$local.temporary()
      })
    HTTP.post("/appconsole/teacher/list", Qs.stringify({
     'schoolId':this.$store.state.schoolId,
     'pageNo':'',
     'pageSize':'',
     'keyword':keyword  
    }))
    .then(res => {
      var data = res.data
      if(data.code==0){
        this.teacherList=data.data.teacherList

      }
      console.log(data)
    })
    .catch(error => {

    })
       //
     },
     unpubBun(){
      this.teacherFun(this.searchvalue) 
     },
     sureFun(){
       var teacherId='',ctn=true
       console.log(this.contentAry)
   
       $.each(this.contentAry,function(c,clem){
         if(clem){
        teacherId+=clem+','
         }
        
       })
       teacherId=teacherId.substring(0,teacherId.length-1)
        if(!teacherId&&Number($('.db').attr('inum')==2))
        ctn=false,this.$message({
            type: 'warning',
            message: '至少有一个教师',
            center:true
          })  
      if(ctn){
   
       var HTTP = axios.create({
      baseURL:this.$local.temporary()
      })
      
    HTTP.post("/appconsole/resource/updateResourceRead", Qs.stringify({
     'id':this.$route.params.id,
     'status':Number($('.db').attr('inum')),
     'teacherId':teacherId
    }))
    .then(res => { 
      var data=res.data
      if(data.code==0){
         this.$router.replace({  
         name: 'unpublishedData'
         })
      }
      console.log(data)
    })
    .catch(error => {
     
    })
    
     }
    
     },
   delFun(){
     this.searchvalue=''
    this.teacherFun('')  
   }     
    }
  }
</script>       