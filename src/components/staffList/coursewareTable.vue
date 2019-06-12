<template>
<div class="coursewareTotal">
<div class="coursewareTable" v-show="show" :key="index" v-for="(item,index) in thisBodyList">
<el-row class="el-content elRow">
  <el-col :span="6" class="a elCol">
  <div class="grid-content bg-purple">
   <div class="coursewareTableImg">
    <img class="el-img" :src=" item.coverUrl ">
    <div class="el-img-label" ></div> 
    <div class="el-img-status">
    <span v-if="item.status==-1">已下架</span>
    <span v-else-if="item.status==1">已上架</span>
    <span v-else-if="item.status==0">审核中</span>
    <span v-else>未通过</span>
    </div>
    </div>
  </div>  
  </el-col>
  <el-col class="elCol" :span="18">
  <div class="grid-content bg-purple">
  <div class="el-title">{{ item.name }}</div>
  <div class="el-name">{{ item.sysUserName }}</div>
  <div class="el-size">{{ item.size }}P | <span v-if=" item.fileSize>(1024*1024) ">{{ parseInt(item.fileSize/(1024*1024)) }}M</span><span v-else-if=" item.fileSize>1024 ">{{ parseInt(item.fileSize/1024) }}K</span><span v-else>{{ item.fileSize }}B</span> </div>
  </div>
  </el-col>
</el-row>
<el-row class="el-footera elRow"> 
  <el-col class="elCol" :span="24">
  <div class="grid-content bg-purple">
   <el-button ><router-link to="/details">详情</router-link></el-button>
   <el-button @click="success(item.id,-1)" type="warning" v-if="item.status==0">撤销</el-button>
   <el-button @click="success(item.id,-1)" type="danger" v-else-if="item.status==1">下架</el-button>
   <el-button @click="success(item.id,0)" type="success" v-else>上架</el-button>
  </div>
  </el-col>
</el-row>
</div>

<div class="coursewareTable" v-show="!show"  :key="index" v-for="(item,index) in platformResourceList">
<el-row class="el-content elRow">
  <el-col class="elCol" :span="24" style="position:relative;">
  <div class="grid-content bg-purple">
  <div class="coursewareTableImg" style="position:absolute;top:0;left:5px;">
    <img class="el-img" :src=" item.coverUrl ">
   </div>
   <div style="padding:0 0 0 80px;">
  <div class="el-title">{{ item.name }}</div>
  <div class="el-name">{{ item.sysUserName }}</div>
  <div class="el-size"><span v-if="item.size">{{ item.size }}P |</span> <span v-if=" item.fileSize>(1024*1024) ">{{ parseInt(item.fileSize/(1024*1024)) }}M</span><span v-else-if=" item.fileSize>1024 ">{{ parseInt(item.fileSize/1024) }}K</span><span v-else>{{ item.fileSize }}B</span> </div>
  </div>
  </div>
  </el-col>
</el-row>
<el-row class="el-footera elRow" >
  <el-col class="elCol" :span="24">
  <div class="grid-content bg-purple">
   <el-button ><router-link :to="'/details/'+item.id">详情</router-link></el-button> 
   <el-button type="success" v-show="false">采购</el-button>
   <el-button type="danger" @click="interDisciplinary(item.id,1)"  v-if="hide==0">隐藏</el-button>
   <el-button type="warning" @click="interDisciplinary(item.id,0)" v-else>显示</el-button>
  </div>
  </el-col> 
</el-row>
</div>


<el-row class="el-footera elRow" v-if=" pageTotal ">
  <el-col class="elCol" :span="24">
  <div class="grid-content bg-purple">
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="prev, pager, next"
      :total=" pageTotal " 
  >
    </el-pagination>
  </div>
  </el-col>
  </el-row>

</div>
</template>
<style scoped>
@import '../../assets/css/courseware.css'
</style>
<script>
import axios from 'axios'
import Qs from 'qs'
// jquery
 
  export default {
    props: ['labertype','laber','nameLike','hide','release','bschoolId'],
    data: () => ({
       total:'0',
        currentPage: 1,
        show: false,
      platformResourceList: [],
      thisBodyList: [],
      name:{
        '9':3,
        '10':4,
        '11':2
      },
      type: '',
      pageTotal: '',
      inum: 0
    }),
    watch: {
      laber(newlaber){
     this.newlaber(newlaber)
    
      },
      nameLike(val){
      this.newlaber('',val)
      },
      release(){
     if(this.release){
      this.releaseFun()
     }
     

      }
    },
    created(){

      this.schoolId=this.$store.state.schoolId
      let name=JSON.parse(JSON.stringify(this.name)) 
  
      this.type=name[this.$route.params.name] 
      if(this.type){
       this.$store.commit('setType',this.type)
       this.type==2?document.title='视频管理':this.type==3?document.title='电子书管理':this.type==4?document.title='课件管理':false
      }
      this.$nextTick(function(){ 
         $('.el-main').css('background','#fff') 
      })
      //  ('---uploadOrganization---')
      //  (this.$route.params.uploadOrganization)
      if(this.$route.params.uploadOrganization){
      this.releaseFun()
      }else{
      this.newlaber()  
      }     
    },
    methods: {
      newlaber(newlaber,nameLike){
          let laberString=''
          if(newlaber){
     $.each(newlaber,function(i,val){
      laberString+=val+','
     })
    laberString = laberString.substr(0, laberString.length - 1)
          }
      if(this.hide){
      this.laberString=''
      this.labertype=''
      laberString=''
      this.currentPage=1
      }
    //  console.log('laberString:'+laberString)
    //  console.log('labertype:'+this.labertype)
    //  console.log('currentPage:'+this.currentPage)
    //  console.log('hide:'+this.hide)
    //  console.log('schoolId:'+ this.$store.state.schoolId)
    //  console.log('type:'+this.$store.state.type)
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
     HTTP.post("/appconsole/resource/publicList", Qs.stringify({  
       'type':this.$store.state.type,
       'schoolId': this.$store.state.schoolId,
       'labertype': this.labertype,
       'pageSize': 5,
       'hide': this.hide,
       'pageNo': this.currentPage,
       'laber': laberString,
       'nameLike': nameLike
       }))
    .then(res => {
      var data=res.data
      var that=this
      console.log(data)
     // this.list=data.data.list
     if(!parseInt(data.code)){
       this.inum=0
      this.platformResourceList=data.data.platformResourceList
      this.pageTotal=data.data.pageTotal*10
      const loading=that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        }) 
        if(data.data.platformResourceList.length){ 
      $.each(data.data.platformResourceList,function(u,ulem){

       
        //  console.log('t跳错了')
          
          var img = new Image() 
            img.src=ulem.coverUrl   
    img.onload = function() { 
       /*
       if($(window).width()>=700){
         $('.coursewareTable').each(function(i,elem){
           $(elem).show()
           $(elem).find('.a').removeClass('el-col-6')
           $(elem).find('.a').addClass('el-col-3')
         })
       } 
      */
      that.imageloader(loading,data.data.platformResourceList.length)

      }
        
      })
      }else{
        //  console.log('跳这里')
         
           loading.close()
        }  
     }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
      },
      releaseFun(){
     //  //  ('本机构1')
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
     HTTP.post("/appconsole/resource/privaterList", Qs.stringify({  
       'type':this.type,
       'schoolId': this.bschoolId,
       'status': '',
       'pageSize': 5,
       'pageNo': this.currentPage,
       'nameLike': ''
       }))
    .then(res => {
     var data=res.data
      var that=this
     if(!parseInt(data.code)){
     this.show=true
     this.pageTotal=data.data.pageTotal*10
     this.thisBodyList=data.data.platformResourceList
     }
     //  ('这是本机构')
     //  (data)
    })
    .catch(error => {
      //  (error)
    })
      },
      handleSizeChange(val) {
       //  (val)
      },
      handleCurrentChange(val) {
    
       this.currentPage=val
       if(!this.release){
        this.newlaber()
       }else{
        this.releaseFun()
       }
      
      },
      interDisciplinary:function(id,status){
      //  (id)
      //  (status)
       var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
       HTTP.post("/appconsole/resource/hideResource", Qs.stringify({
          'schoolId': this.$store.state.schoolId,
          'id':id,
          'status':status 
          })) 
    .then(res => {
       var data=res.data 
       
      if(!parseInt(data.code)){
        this.$router.push({
          name: 'atowone',
          params: {
            stationId:1,
            name:this.$route.params.name
            }
        })
      
      }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
    },
    imageloader(loading,len){
      this.inum++
      if(this.inum==len){
       //  ('图片加载成功')
      loading.close()
      }
    },
    success:function(id,status){
     this.lowerFrame(id,status)
    },
    lowerFrame:function(id,status){
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
     HTTP.post("/appconsole/resource/updatePrivater", Qs.stringify({'id':id,'status':status}))
    .then(res => {
       var data=res.data 
       //  (data)   
      if(!parseInt(data.code)){
         this.$router.push({
          name: 'atowone',
          params: {
            stationId:5,
            uploadOrganization:true,
            name:this.$route.params.name
            }
        })
      }
    })
     .catch(error => {
      //  (error)
    })
    }
    }
  }
</script>

