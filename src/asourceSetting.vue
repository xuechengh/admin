<template>
<div>
<div class="newcoursewareScreening">
<el-row class="elRow" style="z-index:5;">
 
  
  <el-col class="elCol" :span="12">
  <div class="grid-content bg-purple">
  <el-button @click="publishContentFun(0)" class="publishBtn" type="primary" style="font-size:12px;">显示所有发布者内容</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="12">
  <div class="grid-content bg-purple">
  
  <el-button @click="publishContentFun(1)" class="publishBtn" style="font-size:12px;">只显示本机构发布内容</el-button>

  </div>
  </el-col>
 
</el-row> 
</div>
<div v-show="publishContent">
<el-row class="elRow">
  <el-col class="elCol" :span="8">
  <div class="grid-content bg-purple">
  <el-button  class="el-screening" style="color:#333;font-size:14px;">已屏蔽发布者</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="8"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col class="elCol" :span="8">
  <div class="grid-content bg-purple">
  <el-button @click="screenedPublisher" type="primary" >屏蔽发布者</el-button>
  </div>
  </el-col>
</el-row>
</div>
<div v-show="publishContent">
<el-row class="elRow">
  <el-col class="releaseShield elCol" :span="8" :key="index" v-for="(item,index) in shieldList">
  <div class="grid-content bg-purple">

  <img class="el-img"  v-if="item.photoUrl" :src="item.photoUrl"/>
  <img class="el-img" v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png"  /> 
  <div class="el-img-span">{{item.name}}</div>
  <div class="el-screen">
  <div>
   <ul class="el-screen-ul" style="margin-top:-15px;">
   <li ><router-link to="/asourceSetting" @click.native="contact(item.id,index)" tag="span">解除屏蔽</router-link></li>
   <li class="el-screen-black"></li>
  
   </ul>
  </div>
  </div>
  </div>
  </el-col>

</el-row>
</div>

<el-dialog
  :visible.sync="dialogVisible"
  width="90%"
  :before-close="handleClose">
  <span>确定解除屏蔽该用户吗?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="asourceSure">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>
<style scoped> 
@import 'assets/css/courseware.css'
</style>
<script>
import axios from 'axios'
import Qs from 'qs'
// jquery

  export default {
   data: () => ({
     shieldList:[],
      dialogVisible: false,
      publishContent: true,
      byId: '',
      inum: ''
     }),   
   created(){
     
     document.title='来源设置'
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
     HTTP.post("/appconsole/resource/shieldList", Qs.stringify({ 
       'schoolId': this.$store.state.schoolId
       }))
    .then(res => {
      var data=res.data
     if(!parseInt(data.code)){
      this.shieldList=data.data.list
     }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })  
 // //  ('---lalalla--')
 // //  (typeof this.$route.params.type)
 // //  (this.$route.params.type)
    HTTP.post("/appconsole/resource/configureList", Qs.stringify({ 
       'schoolId': this.$store.state.schoolId,
       'type': this.$route.params.type
       }))
    .then(res => {
      var data=res.data
      var that=this
     if(!parseInt(data.code)){
      $('.publishBtn').each(function(i,elem){
       if(parseInt(data.data.status) == i){
         $(elem).addClass('el-button--primary')
         if(i){
         that.publishContent=false
         }
       }else{
         $(elem).removeClass('el-button--primary')
       }
      
       
      })
     }
      //  (data)
    })
    .catch(error => {
      //  (error)
    }) 
   },
   methods:{
     screenedPublisher(){
        this.$router.replace({
           path: '/ascreenedPublisher'
          })
     },
     contact:function(id,index){
       /*
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            center:true
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center:true
          });          
        });
      */
     this.dialogVisible=true
     this.byId=id
     this.inum=index
     },
    handleClose(done) {
     this.dialogVisible=false
    },
    asourceSure:function(){
       this.dialogVisible=false
   var HTTP = axios.create({
      baseURL:this.$local.temporary()
     })
       HTTP.post("/appconsole/resource/hideUser", Qs.stringify({
       'schoolId': this.$store.state.schoolId,
       'id': this.byId,
       'status': 1
       }))
    .then(res => {
      var data=res.data
      if(!parseInt(data.code)){
         this.$router.push({
          name: 'atowone',
          params: {stationId:3}
        })
    
      }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
    },
    publishContentFun: function(status){
      if(status){
     this.publishContent=false

      }else{
     this.publishContent=true
      }
      $('.publishBtn').each(function(i,elem){
      if(status==i){
       $(elem).addClass('el-button--primary')
      }else{
       $(elem).removeClass('el-button--primary')
      }
     })
      //  (this.$route.params.type)
         var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
     HTTP.post("/appconsole/resource/hideConfigure", Qs.stringify({ 
       'schoolId': this.$store.state.schoolId,
       'type': this.$route.params.type,
       'status': status
       }))
    .then(res => {
      var data=res.data
     if(!parseInt(data.code)){
      
     }
      //  (data)
    })
    .catch(error => {
      //  (error)
    }) 
    }
   }

  }
</script>  