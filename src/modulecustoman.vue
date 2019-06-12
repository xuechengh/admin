<template>
<div>

<div class="searchBtn" >
<el-row :gutter="20">
  <el-col :span="24" style="position:relative;width:100%;padding:5px 10px;">
  <div class="grid-content bg-purple" style="text-align:left;">
  <div style="position:absolute;top:5px;left:0;width:70px;" v-show="dress">
  <el-button @click="screen" class="el-screening" >筛选</el-button>
  </div>
  <div class="searptnwin" style="padding:0 80px 0 10px;">
<el-input v-model="searchval" placeholder="请输入资料标题或发布人搜索..." ></el-input>
 </div>
 <div style="position:absolute;top:5px;right:0;width:70px;">
 <el-button type="primary" @click="searchfun" style="padding:10px 20px;">搜索</el-button>
 </div>
  </div>
  </el-col>
</el-row>
</div>
<!-- 学科*标签-->
<div v-show="show" @click="screen" class="v-modal el-margin-top-41" tabindex="0" style="z-index:2;"></div>
<div v-show="show" class="transition-box-father" >
      <transition name="el-fade-in-linear">
        <div  class="transition-box">

 <div class="mathematics"  >
      <el-row >
  <el-col :span="6" class="bncoln">
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">学科</span>
  </div>
  </el-col>
     </el-row >
        <el-row class="laberTypeList"> 
  <el-col :span="8">
  <div class="grid-content bg-purple">
    <button  class="knowledgeso knowledgebtn">全部</button>
  </div>
  </el-col>
  <el-col :span="6" :key="index"  v-for="(item,index) in labeltypelist">
  <div class="grid-content bg-purple ">
   <button class="knowledgeso"  :laberList="item.id" @click="knowledgefun(item.id)">{{item.name}}</button>
  </div>
  </el-col>
  
     </el-row>
 </div>

  <div class="label"  >
    <el-row >
  <el-col :span="6" class="bncoln" >
  <div class="grid-content bg-purple" >
    <span style="color:#000;text-align:right;font-size:8px;">标签</span>
  </div>
  </el-col>
     </el-row>
        <el-row class="laberlist">
  
  <el-col :span="8" :key="index" v-for="(item,index) in laberlist">
  <div class="grid-content bg-purple">
   <button  type="info" class="el-plain knowledgesa" :laber="item.id" style="border-radius:15px;padding:5px 10px;"  plain>{{item.name}}</button>
  </div>
  </el-col>
   
     </el-row>
  </div>  

    <div class="el-transition-bottom">
    <el-row >
  <el-col :span="12" >
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">
     <el-button  type="info" @click="reset()">重置</el-button>
    </span>
  </div>
  </el-col>
   <el-col :span="12" >
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">
    <el-button  type="primary" @click="screenbtn" style="background:rgb(230,162,60) ;border:1px solid rgb(230,162,60);">确定</el-button>
    </span>
  </div>
  </el-col>
   </el-row>
    </div>
        </div>
      </transition>
     
    </div>

    <div class="automatical"  >
     
  <div class="tabulatin" style="margin-bottom:10px;overflow:hidden;" :byId="item.id" :key="index" v-for="(item,index) in alist" >
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
  <div class="critel" style="border-bottom:1px solid rgb(242,242,242);">          
  <div class="radius" >
  <div class="radiusbtn" :Src="item.photo" :title="item.title" :name="item.name" >
  <img class="radiusImg redImg"  src="../src/assets/images/unchecke.png">
  <img class="radiusImg redImg"  src="../src/assets/images/checke.png">
  </div>
  </div>
  <img class="tabulaImg" :src="item.photo">   
 <div class="textal"  style="position:relative;">
  <div class="emulata" ><span>{{item.title}}</span></div>
  <div class="emulata"><span>{{item.name}}</span></div>
  <div  class="emulata col204 sales" ><span><span>销量</span>&nbsp;<span v-if="item.sales">{{item.sales}}</span><span v-else>0</span></span><span class="rmb">￥<span v-if="item.price">{{item.price}}</span><span v-else>0</span></span></div>
  </div>

  </div>
  </div>
  </el-col>
  </div>

    </div>
 
   <div id="cb" class="cb "    v-loading="loading" >
    <span class="spancon mb" style="position:absolute;top:5px;"></span>
    </div>
<router-link :to="{name:'modulecustoman'}" style="color:#fff;" @click.native="modulecusure()">
    <div class="modulecusure">   
     确定
    </div>
 </router-link>
</div>
</template>
<style scoped>
@import 'assets/css/modulecustoman.css'
</style>
<script>
import axios from 'axios'
import Qs from 'qs'
let note={
  '4':3,
  '5':4,
  '6':2
}
let reversenote={
  '3':4,
  '4':5,
  '2':6
}
let getnum={
  'a':4,
  'b':5,
  'c':6
}
export default{
    data(){
     return{
     show:false,
     dress:false,
     alist:[],
     searchval:'',
     labeltypelist:[],
     laberlist:[],
     note:note,
     reversenote:reversenote,
     byId:'',
     choiceList:'',
     getnum:getnum,
     customName:'',
     loading:false,
     winken:true,
     pageNo:1,
     laberType:'',
     labername:'',
     keyWord:'',
     setwidth:0
     }
    },
  watch:{
    alist(){
     
      this.$nextTick(()=>{
   let w=$('.emulata').width()
   let ipadWidth=768 
   let ipadHeight=1024
   let ipadSize=14 
   let radiuswidth=60
   let ipadlineHeight=38
   let documentWidth=$(document).outerWidth()
   let documentHeight=$(document).outerHeight()
   let sw=220
   let bw=300
   let radiusleft=72
   let ratio=documentWidth/ipadWidth
   let getname=this.$route.params.name
   let that=this
   if(documentWidth<ipadWidth){
   $('.tabulaImg').css({
     height:sw*ratio,
     width:sw*ratio,
     left:radiusleft*ratio
   })
   $('.tabulatin').height(sw*ratio+20)
   $('.critel').height(sw*ratio)
   $('.textal').height(sw*ratio)
   $('.radius').css({
     width:radiuswidth*ratio,
     height:radiuswidth*ratio
   })
   $('.radiusImg').css({
     width:radiuswidth*ratio,
     height:radiuswidth*ratio
   })
  $('.emulata').css({
   fontSize:ipadSize*ratio,
   marginLeft:bw*ratio,
   lineHeight: ipadlineHeight*ratio+'px'
 })

   }
  console.log($('.emulata').outerWidth())
  if($('.emulata').outerWidth()){
$('.sales').width($('.emulata').outerWidth())
this.setwidth=$('.emulata').outerWidth()
  }else{
    $('.sales').width(this.setwidth)
  }
  
       $.addcheck=function($alam,i){
    $alam.addClass('check').find('.redImg').eq(1).css({
            'opacity':'1'
          })
          $('.tabulatin').each(function(j,alem){
         if(i!=j){
          $(alem).removeClass('check').find('.redImg').eq(1).css({
            'opacity':'0'
          })
         }
         })
        }
      
      $('.tabulatin').each(function(i,elem){
      //  console.log(i)
        $(elem).find('.redImg').eq(1).css({
          'opacity':0
        })
        $(elem).unbind('click')
   
        $(elem).on('click',function(){
       
         
        if(!/^[0-9]*$/.test(getname)){
          if(/[, ,]/g.test(getname)){
           
          $.addcheck($(this),i)
        
         }else{
          if(!$(this).hasClass('check')){
          $(this).addClass('check').find('.redImg').eq(1).css({
            'opacity':'1'
          })
        }else{
          
       $(this).removeClass('check').find('.redImg').eq(1).css({
            'opacity':'0'
          })
        }


         }
       
       }else{ 
         
        $.addcheck($(this),i)
       }
       
        })

      })

    this.samehide()
       console.log(JSON.parse(this.choiceList))
       console.log(this.$route.params.name)
     })
    
    },
    labeltypelist(){
      this.$nextTick(()=>{
        var that=this
       // alert($('.knowledgeso').length)
        $('.knowledgeso').each(function(i,elem){
         $(elem).unbind('click')
         $(elem).on('click',function(){
           $(this).addClass('knowledgebtn')
           if(i==0){
          that.laberlist=[]
           }
           $('.knowledgeso').each(function(j,alem){
            if(i!=j){
             $(alem).removeClass('knowledgebtn')
            }
           })
         })
        })  
      })
      
    },
   laberlist(){
     this.$nextTick(()=>{
       $('.knowledgesa').each(function(i,elem){
         $(elem).unbind()
         $(elem).on('click',function(){
           if($(this).hasClass('knowledgebtn')){
           $(this).removeClass('knowledgebtn')
           }else{
            $(this).addClass('knowledgebtn') 
           }
           
        
         }) 
       })
     })
   } 
  },
  created(){
     var that=this
      this.$store.commit('setAcroppertype','1')
     this.customName=this.$route.params.val
     document.title='模块自定义管理'
     this.choiceList=this.$route.params.choiceList
     
      $("html,body").animate({scrollTop:0},10)
      this.byId=this.$route.params.name


     this.$nextTick(()=>{
       
      $('.el-main').css({
          'background':'#fff'
      })
       let getname=this.$route.params.name
      
       if(!/^[0-9]*$/.test(getname)){
         if(/[, ,]/g.test(getname)){
          getname=getname.split(',')[0]
        
         }else{
          getname=getname.substr(1) 
         }
        
        
       }
      if(getname==4||getname==5||getname==6){
      this.laberType=0
     this.labername=''
     this.keyWord='' 
     this.pageNo=1
      this.getResourceList()
     $('.searptnwin').css({
       'padding':'0 80px 0 80px'
     })
     this.dress=true
      }else{
        this.appChoicelist('')
      }
   
     })
 },
 mounted(){
      window.addEventListener('scroll', this.handleScroll, false)
    },
 methods:{
     screen(){
        this.show=!this.show
        if(this.show){
   
      
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/typeList", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId
       }))
      .then(res => {
      var data=res.data
       if(data.code==0){
       this.labeltypelist=data.data.list
       }
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
        }
     },
     appChoicelist:function(keyWord){
       let getname=this.$route.params.name
       
       if(!/^[0-9]*$/.test(getname)){
        if(/[, ,]/g.test(getname)){
          getname=getname.split(',')[0]
        
         }else{
          getname=getname.substr(1) 
         }
       }
       console.log(keyWord)
       console.log(getname)
       
        var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/schooldetail/appChoicelist", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId,
      'name':getname,
      'type':2,
      'keyWord':keyWord
       }))
      .then(res => {
      var data=res.data
     if(data.code==0){
       window.removeEventListener('scroll', this.handleScroll, false)  
       this.alist=data.data.list
     }
    // console.log(keyWord)
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
     },
    searchfun(){
      let getname=this.$route.params.name
       
       if(!/^[0-9]*$/.test(getname)){
        if(/[, ,]/g.test(getname)){
          getname=getname.split(',')[0]
        
         }else{
          getname=getname.substr(1) 
         }
       }
      if(getname==4||getname==5||getname==6){
      this.laberType=0
     this.labername=''
     this.keyWord=this.searchval 
     this.pageNo=1
     this.getResourceList()
      }else{
       this.appChoicelist(this.searchval) 
      }
     
    
    },
    knowledgefun(laberType){
   var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/laberList", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId,
      'laberType':laberType
       }))
      .then(res => {
      var data=res.data
     if(data.code==0){
     this.laberlist=data.data.laberlist
     }
    
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
    },
    screenbtn(){
      var laberType=''
      var labername=[]
    this.show=false
    this.$nextTick(()=>{
    
   //   console.log(this.choiceList)
      $('.knowledgeso').each(function(i,elem){
       if($(elem).hasClass('knowledgebtn')){
         laberType=parseInt($(elem).attr('laberList')) 
       }
      })
      $('.knowledgesa').each(function(i,elem){
       if($(elem).hasClass('knowledgebtn')){
        labername.push($(elem).html())
        
       }
      })
      if(!laberType){
       laberType=0
      }
     this.laberType=laberType
     this.labername=labername.join(',')
     this.keyWord=''
     this.pageNo=1
     this.getResourceList()
    })
    

    },
    getResourceList:function(){
      
        let getname=this.$route.params.name
       
       if(!/^[0-9]*$/.test(getname)){
        if(/[, ,]/g.test(getname)){
          getname=getname.split(',')[0]
        
         }else{
          getname=getname.substr(1) 
         }
       }
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    
  
    HTTP.post("/appconsole/index/getResourceList", Qs.stringify({ 
      'type':this.note[getname],
      'schoolId':this.$store.state.schoolId,
      'laberType':this.laberType,
      'laber':this.labername,
      'pageSize':12,
      'pageNo':this.pageNo,
      'keyWord':this.keyWord
       }))
      .then(res => {
      var data=res.data
     if(data.code==0){
       let that=this
       if(!data.data.platformResourceList.length){
       $('.spancon').removeClass('el-icon-loading')
       }
       if(this.pageNo==1){
        that.alist=data.data.platformResourceList
        data.data.platformResourceList.length?true:( this.$message({
            type: 'error',
            message: '找不到相关联的资料',
            center:true
         }))
       }else{
         $.each(data.data.platformResourceList,function(p,plem){
         that.alist.push(plem)
        })
       }
        
     }
    
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
    },
   reset(){
    this.laberlist=[]
    $('.knowledgeso').each(function(i,elem){
     if(i==0){
      $(elem).addClass('knowledgebtn')
     }else{
       $(elem).removeClass('knowledgebtn')
     }
    })
   },
   modulecusure(){
    // alert(this.byId)
    // 确定
     let choiceList=JSON.parse(this.choiceList)
    
     let byId=parseInt($('.check').attr('byId')) 
   //  alert(byId)
     let alistson={}
     let that=this
     let operate=true
     $.each(this.alist,function(a,alem){
      if(alem.id==byId){
      alistson=alem
      }
     })
       let getname=that.byId
       let getnamg=0
       let character=''
       console.log(alistson.title)
       console.log('-------')
     $.each(choiceList,function(c,clem){ 
       
       if(alistson.type==2||alistson.type==3||alistson.type==4){
       // console.log('跳这里')
       that.loading=true
        if(!/^[0-9]*$/.test(getname)){
          if(/[, ,]/g.test(getname)){
          getnamg=getname.split(',')[0]
        
         }else{
           
           character=getname.substr(0,1)   
        getnamg=getname.substr(1)
         }
        
        if(clem.name==getnamg){
          let ibum=0
           if(/[, ,]/g.test(getname)){
             // 点击切换 
         //    console.log('跳这里1')
           ibum=getname.split(',')[1]
           }else{
             clem.content=[]
          clem.contentType.type=2
          clem.contentType.num=that.getnum[character]
          clem.note=that.customName
        // alert($('.check').length)
         //  console.log('跳这里2')
           }
 
         
          $('.check').each(function(i,blem){
           
          let klem=parseInt($(blem).attr('byId'))
          $.each(that.alist,function(a,alem){
           
          if(alem.id==klem){
          if(/[, ,]/g.test(getname)){
          //   console.log('跳这里3')
          clem.content.splice(ibum,1,alem)
          }else{
         //    console.log('跳这里4')
          clem.content.push(alem)
          
        //  console.log(clem.content)
          }
          operate=true
            }
          })
         }) 
        }
        }else{
          
       if(clem.name== that.reversenote[alistson.type]){
   
     //  console.log('跳这里5')
       operate=true
        clem.content.push(alistson)
       // console.log(alistson)
       // console.log(clem.content)
       } 
        }   
        
       }else{
         that.loading=false
         // alert(clem.name)
        // console.log(getname)
        // console.log(!/^[0-9]*$/.test(getname))
       // console.log(0)
          //  alert(getname)
         if(!/^[0-9]*$/.test(getname)){
         //  alert(0)
        if(/[, ,]/g.test(getname)){
          getnamg=getname.split(',')[0]
        
         }else{
           character=getname.substr(0,1)   
          getnamg=getname.substr(1)
         }
        if(clem.name==getnamg){
           if($('.check').length){
         //  console.log('点击切换')
           let ibum=0
           if(/[, ,]/g.test(getname)){
             // 点击切换
           ibum=getname.split(',')[1]
           }else{
          //    console.log('跳这里6')
             clem.content=[]
          clem.contentType.type=2
          clem.contentType.num=that.getnum[character]
          clem.note=that.customName
        // alert($('.check').length)
          
           }
           $('.check').each(function(i,blem){
           
          let klem=parseInt($(blem).attr('byId'))
          $.each(that.alist,function(a,alem){
           
          if(alem.id==klem){
          if(/[, ,]/g.test(getname)){
          //   console.log('跳这里7')
          clem.content.splice(ibum,1,alem)
          }else{
           //  console.log('跳这里8')
          clem.content.push(alem)
          
        //  console.log(clem.content)
          }
          operate=true
            }
          })
         }) 
        
         }else{
           
           that.$message({
          showClose: true,
          message: '未选,操作失败',
          type: 'error',
          center:true
          }) 
           operate=false
         }
        }
       }else{
       //  alert(1)
      if(clem.name== getname){
       if($('.check').length){
           
      clem.content.push(alistson)
      operate=true
       }else{
         operate=false
   
         that.$message({
          showClose: true,
          message: '未选,操作失败',
          type: 'error',
          center:true
        })
       }
      
     // console.log(clem.content)
       } 
       }
     
       }
     })
     //  /^[0-9]*$/
    //  console.log(this.alist)
     
   //   console.log(choiceList[0].content[2].title)
     
    
      
       var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/saveChoiceList", Qs.stringify({ 
      'choiceList':JSON.stringify(choiceList) 
       }))
      .then(res => {
      var data=res.data
       if(data.code==0){
          if(operate){
          this.$message({
          message: data.message,
          type: 'success',
          center:true
        })
          }
          
      this.$router.push({
      name:'acropper'
      })
       }
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
    
  
   },
   samehide(){
   let that=this
   let getname=this.$route.params.name  
  
      if(/^[0-9]*$/.test(getname)||/[, ,]/g.test(getname)){
        
      $('.tabulatin').each(function(i,elem){
      $.each(JSON.parse(that.choiceList),function(c,clem){
      //  console.log('进去了')
      //  console.log( JSON.parse(that.choiceList)  )
       let byId=$(elem).attr('byId')
       if(that.$route.params.name.split(',')[0]==clem.name||that.$route.params.name==clem.name){
        $.each(clem.content,function(t,tlem){
         if(byId==tlem.id){
         $(elem).hide()
         }
        })
       }
      })
      })
      }
     
      this.winken=true
      $('.spancon').removeClass('el-icon-loading')
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
    that.getResourceList()
    },1000)
    
   
  }
   } 
 }
}
</script>