<template>
<div>

<div class="coursewareTable">
<el-row class="el-content elRow" style="position:relative;overflow:hidden;">
    <el-col class="elCol" :span="24" >
  <div class="grid-content bg-purple"> 
   <div class="coursewareTableImg coursewareTableImg2" style="position:absolute;top:5px;left:10px;">
    <img class="el-img el-img2" v-if="thearchmessage.photoUrl" :src="thearchmessage.photoUrl" >
    <img class="el-img el-img2" v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png">
    </div>
  <div style="padding:5px 0 10px 105px;" >
  <div class="el-title el-title-t"><span >{{thearchmessage.name}}</span> &nbsp;<span style="text-indent:1em;">{{sex[thearchmessage.sex-1]}}</span></div>
    <div v-if="!thearchmessage.type" class="el-name">绑定手机 &nbsp;<span>{{thearchmessage.moblie}}</span> </div>
     <div v-else class="el-name">{{thearchmessage.sex}}</div>
  <div class="el-name" ><span v-show="paramsType"><span class="grid_title">{{role[thearchmessage.roleIds]}}</span> &nbsp;<router-link :to="{name:'teacherdel'}" v-show="brn" @click.native="dialogVisible = true" style="color:rgb(52,158,225);">修改角色</router-link></span><span>&nbsp;</span></div>
  <div class="el-name" ><span v-show="paramsType">评分: &nbsp;<span>暂无评分</span></span><span>&nbsp;</span></div>
  </div>
  </div>
  </el-col>
  </el-row>
  </div>
 
<div class="reviewIntroduction">
<div class="el-review" >
<el-row class="el-border-gray elRow">
  <el-col class="elCol" :span="24" style="font-size:12px;"><div class="grid-content bg-purple-dark" ><span v-show="paramsType">简介</span><span v-show="!paramsType">绑定手机号&nbsp;&nbsp;<span>{{thearchmessage.mobile}}</span></span><span v-show="!paramsType" @click="initPassword()" style="float:right;color:rgb(64,158,255);">初始化密码&nbsp;</span></div></el-col>
</el-row> 
<span class="el-content-ear">
<el-row class="elRow">
  <el-col class="elCol" :span="24">
  <div class="grid-content-a bg-purple-dark ear-string" v-if="thearchmessage.description">
  {{thearchmessage.description}}
  </div>
  <div class="grid-content-a bg-purple-dark ear-string" v-else>
 <span v-show="paramsType">暂无简介</span>
 <div v-show="!paramsType" class="parclass" style="font-size:12px;" :key="index" v-for="(item,index) in className"><span >所在班级&nbsp;&nbsp;<span>{{item.name}}</span><span style="float:right;color:rgb(64,158,255);" @click="withdraw(item.id,index)">退出班级&nbsp;</span></span></div>
  </div>
  </el-col>
</el-row>
</span>
</div>
</div>

<div class="reviewIntroduction" v-show="paramsType">
<el-row class="elRow" style="background:rgb(242,242,242);">
  <el-col class="elCol" :span="1"><div class="grid-content bg-purple"></div></el-col>
  <el-col class="elCol" :span="22"><div class="grid-content bg-purple"><el-button type="danger" v-show="brn" @click="teachremove()" style="width:95%;height:40px;">删除</el-button></div></el-col>
  <el-col class="elCol" :span="1"><div class="grid-content bg-purple"></div></el-col>
</el-row>
</div>

 

    <el-dialog title="" :visible.sync="dialogVisible" width="90%">
     <el-select v-model="value" placeholder="请选择" style="width:100%;" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleFun()">确 定</el-button>
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
export default {
    data (){
     return {
      dialogVisible:false,
      brn:false,
      paramsType:true,
      className:'',
      classId:0,
      form: {
          name: '',
          number:''
      },
         options: [{
          value: '10',
          label: '校长'
        }, {
          value: '11',
          label: '教学主管'
        }, {
          value: '12',
          label: '招生主管'
        }, {
          value: '13',
          label: '专业老师'
        }, {
          value: '14',
          label: '行政主管'
        },{
          value: '15',
          label: '后勤主管'
        },{
          value: '16',
          label: '后勤老师'
        },{
          value: '17',
          label: '文化课老师'
        },{
          value: '18',
          label: '行政老师'
        }],
        value: '',  
     thearchmessage:[],
     role:{
     '3' : '超级管理员',
     '10':'校长',
     '11':'教学主管',
     '12':'招生老师',
     '13':'专业老师',
     '14':'行政主管',
     '15':'后勤主管',
     '16':'后勤老师',
     '17':'文化课老师',
     '18':'行政老师'
      },
      sex:[
        '男',
        '女'
      ],
    platformResourceId:0
     }
    },
    created(){
      var that=this,paramsId=this.$route.params.platformResourceId,setClassAry=[]
       // alert(that.$store.state.schoolClassList)
     if(that.$store.state.schoolClassList){
      $.each(paramsId.split(','),function(s,slem){
        $.each(JSON.parse(that.$store.state.schoolClassList),function(t,tlem){
          if(slem==tlem.id){
          setClassAry.push(tlem)
          }
        })
         
      })
     }
      
      this.className = setClassAry
      console.log(setClassAry)
       console.log(this.classId)
       console.log(this.$store.state.schoolClassList)
  //  console.log(this.$route)
   paramsId=paramsId.split(',')
    this.platformResourceId=paramsId[0]
    
   isNaN(paramsId[1])?(this.platFun(),document.title='教师详情'):(this.pletFun(),document.title='学员详情')
    
    this.$nextTick(()=>{
      $('html, body').animate({scrollTop:0}, 'slow')
      $('.el-dialog').css({
        'height':190,
        'border-radius':'10px'
      })
      $('.el-icon-close').hide()
     //  $(window).css({scrollTop:0})
      $.popstate=function(){
        var then=that
        function abn(){
          that.$router.push({name:'pesonnel'})
        }
        $(window).unbind('popstate')
   $(window).on('popstate', function () {
     
     abn()
 //  then.$router.push({name:'pesonnel'})
 //  isNaN(paramsId[1])?that.$router.push({name:'pesonnel'}):that.$router.push({name:'pesonnel',params:{type:1}}) 
 
  })
 window.history.pushState('forward', null, 'mn'); 
  }
  $.popstate()
    })
    },   
    methods:{
     teachremove(){
        this.$confirm('是否删除该人员?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
         var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/teacher/deleteTeacher", Qs.stringify({ 
      'id':this.platformResourceId
      }))
    .then(res => {
      var data=res.data

      if(data.code==0){

       this.$message({
            type: 'success',
            message: data.message,
            center:true
         })
    this.$router.push({
    name:'pesonnel'
    })
       
      }
       console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
        })
        .catch(error => {
          console.log(error)
        })
        $('.el-message-box').css({
          'width':200
        })
     },
     dialogVisibleFun:function(){
       var ids=this.value
       this.dialogVisible=false

     //  alert(this.value)
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/teacher/updateRoleIds", Qs.stringify({ 
      'id': this.platformResourceId,
      'ids': ids
      }))
    .then(res => {
    var data=res.data
    if(data.code==0){
  
   $('.grid_title').html(this.role[ids]) 
    this.$message({
            type: 'success',
            message: data.message,
            center:true 
      })
    }
     console.log(data)
    })
    .catch(error => {
        console.log(error)
    })

     },
     platFun:function(){
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/teacher/info", Qs.stringify({ 
      'id': this.platformResourceId
      }))
    .then(res => {
     var data=res.data
     if(data.code==0){
      this.thearchmessage=data.data
      if(data.data.roleIds!=3){
       this.brn=true
      }
     }
     console.log(data)
    })
    .catch(error => {
        console.log(error)
    }) 
     },
     pletFun:function(){
       var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/student/info", Qs.stringify({ 
      'id': this.platformResourceId
      }))
    .then(res => {
     var data = res.data
     console.log(data)
     if(data.code==0){
     data.data.type=1
     this.thearchmessage=data.data
     this.brn=true
     this.paramsType=false
     }
    })
    .catch(error => {

    })


     },
     initPassword:function(){
      this.$confirm('是否初始化该学生的密码', '提示', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/student/resetRassword", Qs.stringify({ 
      'id': this.platformResourceId
      }))
    .then(res => {
     var data=res.data
     if(data.code==0){
       this.$message({
            type: 'success',
            message: "初始密码123456",
            center:true
          });
      console.log(data)
     }
    })
    .catch(error =>{

    }) 
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消初始化密码',
            center:true
          });          
        }); 
    $('.el-message-box').css({
      'width':200
    })
    

     },
     withdraw:function(classId,index){
       var that = this
     
     this.$confirm('是否让该学生退出'+that.$store.state.className, '提示', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //  console.log('id:'+this.platformResourceId+'---'+'classId:'+this.classId)    
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/student/quitClass", Qs.stringify({ 
      'id': this.platformResourceId,
      'classId': classId
      }))
    .then(res => {
     var data=res.data
     console.log(data)
       this.$message({
            type: 'success',
            message: that.thearchmessage.name+'已退出'+that.$store.state.className,
            center:true
          });
     if(data.code==0){
     $('.parclass').eq(index).remove()
     if($('.parclass').length==0){
      setTimeout(function(){
          that.$router.push({ 
           name:'pesonnel',
           params:{
            type:1
           }
          }) 
        },600) 
     }
         

     }
    })
    .catch(error =>{

    }) 
    
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出班级',
            center:true
          });          
        }); 
    $('.el-message-box').css({
      'width':200
    })
     } 

      }
    
}
</script>