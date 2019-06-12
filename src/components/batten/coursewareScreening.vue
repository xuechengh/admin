<template>
<div>
<div v-show="search" class="coursewareScreening">
<el-row class="elRow" style="z-index:5;">
  <el-col class="elCol" :span="4">
  <div class="grid-content bg-purple ">
  <router-link to="/coutseware/cour"  >
<el-button @click="screen" class="el-screening" >筛选</el-button> 
  </router-link>
  </div>
  </el-col>
  <el-col class="elCol" :span="6">
  <div class="grid-content bg-purple">
   <el-button @click="search=!search" type="primary" icon="el-icon-search" >搜索</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="6">
  <div class="grid-content bg-purple">
  <el-button @click="asourceSetting"  type="success">来源设置</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="8">
  <div class="grid-content bg-purple">
  <router-link :to="{name:'atowGridPages'}">
  <el-button type="warning">筛选菜单管理</el-button>
  </router-link>
  </div>
  </el-col>
</el-row> 
</div>

<div v-show="!search" class="newcoursewareScreening" style="position:fixed;top:0;">
<el-row class="elRow" style="z-index:5;">
 <el-col class="elCol" :span="1" >
  <div class="grid-content bg-purple">
  <span class="el-icon-arrow-left" @click="search = !search" ></span>
  </div>
  </el-col>
  <el-col class="elCol" :span="0">
  <div class="grid-content bg-purple " >
   <div >
  <el-select v-model="value" v-show="false" placeholder="请选择" class="el-select__tags-text " id="eSelect" >
    <el-option  
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
</div>
  </div>
  </el-col>
   <el-col class="elCol" :span="0" >
  <div class="grid-content bg-purple">
  </div>
  </el-col>
  <el-col  :span="19" class="inputbox elCol">
  <div class="grid-content bg-purple">
   
 <el-input
   type="text"
    placeholder="搜索..."
    v-model="searchvalue"
   >
    
  </el-input>
<el-button class="el-icon-error  iconClose" @click="searchvalue=''">
</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="4">
  <div class="grid-content bg-purple">
  <el-button type="primary" @click="searchfun()">搜索</el-button>
  </div>
  </el-col>
</el-row> 
</div>

<div v-show="show" @click="screen" class="v-modal el-margin-top-41" tabindex="0" style="z-index:2;"></div>
<div v-show="show" class="transition-box-father">
      <transition name="el-fade-in-linear">
        <div  class="transition-box">
   <el-row class="elRow" >
  <el-col  :span="6" class="bncoln elCol" >
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">来源</span>
  </div>
  </el-col>
     </el-row>
        <el-row class="el-borderBottom elRow">
  <el-col :span="12" class="bncoln elCol">
  <div class="grid-content bg-purple">
   <el-tooltip class="item" effect="dark" content=" 此功能还在开发当中" placement="top-start">
    <button @click="theAgency"  class="knowledgeso " >本机构发布</button>
    </el-tooltip>
  </div>
  </el-col>
  <el-col :span="12" class="bncoln elCol">
  <div class="grid-content bg-purple">
   <button @click="otherAgency" class="knowledgeso knowledgebtn">其他用户发布</button>
  </div>
  </el-col>
     </el-row>
     <el-row class="elRow">
      <el-col :span="6" class="bncoln elCol" >
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">状态</span>
  </div>
  </el-col>
  </el-row>
     <el-row v-show="!release" class="el-borderBottom displayHide elRow">
  <el-col :span="9" class="bncoln elCol">
  <div class="grid-content bg-purple">
    <button @click="displayshow" class="knowledgeso knowledgebtn" >已显示</button>
  </div>
  </el-col>
  <el-col :span="8" class="bncoln elCol">
  <div class="grid-content bg-purple">
   <button @click="hideshow" class="knowledgeso" >已隐藏</button>
  </div>
  </el-col>
     </el-row>

   <div class="state"  v-show="release">
      <el-row  class="elRow">
  <el-col :span="6" class="bncoln" >
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">状态</span>
  </div>
  </el-col>
     </el-row>
        <el-row class="elRow">
  <el-col :span="8" class="bncoln elCol">
  <div class="grid-content bg-purple">
    <el-button type="primary">全部</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="8" >
  <div class="grid-content bg-purple">
   <el-button>已上架</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="8">
  <div class="grid-content bg-purple">
   <el-button>已下架</el-button>
  </div>
  </el-col>
   <el-col class="elCol" :span="8">
  <div class="grid-content bg-purple">
   <el-button>审核中</el-button>
  </div>
  </el-col>
   <el-col class="elCol" :span="8">
  <div class="grid-content bg-purple">
   <el-button>未通过</el-button>
  </div>
  </el-col>
     </el-row>
 </div>

 <div class="mathematics"  v-show="!knowledJuage">
      <el-row class="elRow">
  <el-col :span="6" class="bncoln elCol">
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">学科</span>
  </div>
  </el-col>
     </el-row >
        <el-row class="laberTypeList elRow"> 
  <el-col :span="8" class="bncoln elCol">
  <div class="grid-content bg-purple">
    <button  class="knowledgeso knowledgebtn" @click="mathematics(false)">全部</button>
  </div>
  </el-col>
  <el-col class="elCol" :span="6" :key="index" :status="item.status" v-for="(item,index) in list" id="bncoln">
  <div class="grid-content bg-purple ">
   <button class="knowledgeso" @click="mathematics(item.id,index)">{{ item.name }}</button>
  </div>
  </el-col>
  
     </el-row>
 </div>

  <div class="label"  v-show="!knowledJuage">
    <el-row class="elRow">
  <el-col :span="6" class="bncoln elCol" >
  <div class="grid-content bg-purple" >
    <span style="color:#000;text-align:right;font-size:8px;">标签</span>
  </div>
  </el-col>
     </el-row>
        <el-row class="laberlist elRow">
  
  <el-col class="elCol" :span="8" :key="index" :status="item.status" v-for="(item,index) in laberlist" id="bncoln">
  <div class="grid-content bg-purple">
   <el-button  type="info" class="el-plain" style="border-radius:15px;"  @click="laberfun(item.name,index)" plain>{{ item.name }}</el-button>
  </div>
  </el-col>
  
     </el-row>
  </div>  

    <div class="el-transition-bottom">
    <el-row class="elRow">
  <el-col class="elCol" :span="12" >
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">
     <el-button @click="mathematics(false,true)" type="info">重置</el-button>
    </span>
  </div>
  </el-col>
   <el-col class="elCol" :span="12" >
  <div class="grid-content bg-purple">
    <span style="color:#000;text-align:right;font-size:8px;">
    <el-button @click="coursewareSure" type="primary" style="background:rgb(230,162,60) ;border:1px solid rgb(230,162,60);">确定</el-button>
    </span>
  </div>
  </el-col>
   </el-row>
    </div>
        </div>
      </transition>
     
    </div>
</div>
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
 // jquery
let data=[
  {
    id:1,
    tip:'theAgency',
    angencyName:'本机构'
  },
  {
    id:2,
    tip:'otherAgency',
    angencyName:'其他机构'
  }
]

 export default {
   props: ['cschoolId','cName'],
    data: () => ({
      show: false,
      release: false,
      search: true,
      knowledJuage: false,
      options: [{
          value: '选项1',
          label: '本机构发布'
        }, {
          value: '选项2',
          label: '其他用户发布' 
        }],
        value: '选项2',
        list:[],
        laberlist:[],
        labertype: '',
        laber: [],
        interimLaber: [], 
        searchvalue:'',
        hide: 0,
        interimHide:0,
        name:{
        '9':3,
        '10':4,
        '11':2
        },
        type: ''
    }),
    watch:{ 
      list(){
       
        this.$nextTick(function(){
          //  ($('.laberTypeList').children().length)
          $('.laberTypeList').children().each(function(i,elem){
            if(i){
            if($(elem).attr('status')==0){
             $(elem).hide()
            }
            }     
          })
        })
      },
      laberlist(){
        this.$nextTick(function(){
         $('.laberlist').children().each(function(i,elem){
         if($(elem).attr('status')==0){
           $(elem).hide()
         }  
         })
        })
        
      }
    },
  created () {
     //  ('调1次')
    // //  ('--cschoolId--')
    // //  (this.cschoolId)
    // //  ('--cName--')
    // //  (this.cName)
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/resource/laberType", Qs.stringify({
      'schoolId': this.$store.state.schoolId
      }))
    .then(res => {
      var data=res.data
      this.list=data.data.list
       //  (data.data.list)
    })
    .catch(error => {
      //  (error)
    })
  },
  methods:{
    screen(){  
      this.show=!this.show
      this.release=false
       $('.theAgency').addClass('is-plain')
       $('.otherAgency').removeClass('is-plain')
       this.hide=JSON.parse(JSON.stringify(this.interimHide))
       if(!this.interimHide){
        
      this.knowledJuage=false
      $('.displayHide').find('button').eq(0).removeClass('is-plain')
      $('.displayHide').find('button').eq(1).addClass('is-plain')
       }else{
         this.knowledJuage=true
      $('.displayHide').find('button').eq(1).removeClass('is-plain')
      $('.displayHide').find('button').eq(0).addClass('is-plain')
       }
     
   


    },
    theAgency(){
    //  this.release=true
    //  this.knowledJuage=true
     // $('.otherAgency').addClass('is-plain')
     // $('.theAgency').removeClass('is-plain')
    },
    otherAgency(){
      this.release=false
      this.knowledJuage=false
      $('.otherAgency').removeClass('knowledgebtn')
      $('.theAgency').addClass('knowledgebtn')
    },
    displayshow(){
      this.knowledJuage=false
      this.hide=0
     $('.displayHide').find('button').eq(1).removeClass('knowledgebtn') 
     $('.displayHide').find('button').eq(0).addClass('knowledgebtn') 
    },
    hideshow(){
      this.knowledJuage=true
      this.hide=1
     $('.displayHide').find('button').eq(0).removeClass('knowledgebtn') 
     $('.displayHide').find('button').eq(1).addClass('knowledgebtn') 
    },
    mathematics:function(id,index){
      let that=this
      let obj = $('.laberTypeList').children().eq(index+1).find('button')
       $.removeKnowledgebtn=function(){
            that.laberlist = []
            that.laber = []
            that.interimLaber=[]
       }
      if(!id){
      $.removeKnowledgebtn()
        $('.laberTypeList').children().each(function(i,elem){
          if(i!=0){
            $(elem).find('button').removeClass('knowledgebtn')
          }else{
            $(elem).find('button').addClass('knowledgebtn')
          }
         })
      if(index){
       this.displayshow()
       this.otherAgency()
      }   
       this.labertype=''
      }else{
       if(obj.hasClass('knowledgebtn')){
       obj.removeClass('knowledgebtn')
       $.removeKnowledgebtn()
       }else{
         
         $('.laberTypeList').children().each(function(i,elem){
          if(i!=(index+1)){
            $(elem).find('button').removeClass('knowledgebtn')
            $.removeKnowledgebtn()
          }
         })
         this.labertype = id 
         obj.addClass('knowledgebtn')
           var HTTP = axios.create({
       baseURL:this.$local.temporary()
         })
          HTTP.post("/appconsole/resource/laberList", Qs.stringify({ 'id': id }))
    .then(res => {
      var data=res.data
      this.laberlist=data.data.laberlist
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
       }
     
    }
    },
    coursewareSure(){
      this.show=!this.show
      this.interimHide=JSON.parse(JSON.stringify(this.hide)) 
      this.laber=JSON.parse(JSON.stringify(this.interimLaber))
   //   //  ('---人生开心就好---')
      console.log(this.labertype)
      console.log(this.laber)
      console.log(this.hide)
      console.log(this.release)
      console.log(this.$store.state.schoolId)
      console.log(this.release)
      //  ('---到此结束了---')
      this.$emit('getLabertype',this.labertype)
      this.$emit('getLaber',this.laber)
      this.$emit('getHide',this.hide)
      this.$emit('getSchoolId',this.$store.state.schoolId)
      this.$emit('getRelease',this.release)
     // //  (this.interimHide)
    },
    laberfun:function(name,index){
    let obj = $('.laberlist').children().eq(index).find('button')
    let pol= true
    obj.hasClass('el-onblue')?obj.removeClass('el-onblue'):obj.addClass('el-onblue')
  
     let arr=this.interimLaber
  $.each(this.interimLaber,function(i,val){
     
      if(val==name){
        
    arr.splice($.inArray(name,arr),1)
   // //  (arr)
       pol=false
      }
    })
     this.interimLaber=arr 
     if(pol){
     this.interimLaber.push(name)
     }
    
    
   //  (this.interimLaber)
    },
    searchfun: function(){
  
    this.$emit('getSearchvalue',this.searchvalue)
    },
    asourceSetting: function(){ 
     // console.log('----快来看---')
     // console.log(this.$route.params.name)
     // console.log(this.name[this.$route.params.name])
    //  console.log(this.$store.state.schoolId)
     // console.log(this.$store.state.type)
    this.$router.push({
           name: 'asource',
           params:{
             type: this.$store.state.type, 
             schoolId: this.$store.state.schoolId 
           } 
      })  
    }
    
  }
  } 

</script>
<style scoped>
@import '../../assets/css/courseware.css'
</style>
