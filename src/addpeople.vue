<template>
<div>

<div class="searchBtn">
<el-row :gutter="20">
  <el-col :span="24" style="padding:0;position:relative;">
  <div class="grid-content bg-purple" >
  <div style="position:absolute;top:0;left:20px;">
  <span>添加{{branum}}</span>
  </div>
  <div style="padding:0 80px 0 100px;">
  <span style="position:relative;">
  <el-input type="number" v-model="mobile"  placeholder="输入手机号..." ></el-input>
  <div class="iconclose el-icon-circle-close " @click="delFun()" style="position:absolute;top:0px;right:6px;color:#999;" ></div>
  </span>
  </div>
   <div style="position:absolute;right:20px;top:0;">
   <el-button type="primary" @click="inspectFun()">检索</el-button>
   </div>
  </div>
  </el-col>
</el-row>
</div>
<div class="el-chief">

<div class="el-head-title"  v-show="eltnama">
 <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark" style="background:rgb(242,242,242);"><span class="el-dranger-color">此账号是学校的{{ralNam}}。</span></div></el-col>
</el-row>
 </div>

<div class="addwave" v-show="adjunction">

 <div class="el-head-title"  v-show="!eltname">
 <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark" style="background:rgb(242,242,242);"><span class="el-dranger-color">该账号已是{{teanm}}</span></div></el-col>
</el-row>
 </div>
  <div class="el-head-title"  v-show="eltname">
 <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark" style="background:rgb(242,242,242);"><span class="el-dranger-color">系统内有此账号，请设置{{rolNam}}。</span></div></el-col>
</el-row>
 </div>
  

<div class="coursewareTable existing_personnel ">
<el-row class="el-content" style="position:relative; background:#fff;overflow:hidden;">
    <el-col :span="24" >
  <div class="grid-content bg-purplev el-personal" >
  <div class="picture" style="width:75px;height:102px;position:absolute;top:0px;left:10px;">
  <div class="coursewareTableImg" v-if="information">
    <img class="el-img" v-if="information.photoUrl" :src="information.photoUrl">
    <img class="el-img" v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png">
    </div>
    <div class="coursewareTableImg" v-else>
    <img class="el-img">
    </div>
  </div>
  <div class="nonpicture"  style="padding:8px 0 20px 95px;" >
  <div class="el-title el-title-t"><span v-if="information">{{information.name}}</span><span v-else>name</span> &nbsp;<span style="text-indent:1em;"></span></div>
  <div class="el-name"><span v-if="information" class="grid_title">{{sex[information.sex]}}</span><span v-else class="grid_title">sex</span></div>
  <div class="el-name">暂无介绍</div>
  </div>
  </div>
  </el-col>
  </el-row>
  </div>
   
   <div class="putmark" style=" overflow:hidden;">
   <el-row>
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
   <el-row>
  <el-col :span="24" class="el-title" style="line-height:40px;font-size:14px;">
  <div class="grid-content bg-purple">
  <span>
  <span v-show="eltname">设置</span>{{rolNam}}
  </span>
  <span v-show="!eltname">:</span>&nbsp;
  <span v-if="information" v-show="elttitle">
  <span>&nbsp;</span><span v-if="information.roleIds!=0">{{role[information.roleIds]}}</span><span v-show="!eltname" v-else><span v-show="!schoolType">学生</span><span v-show="schoolType">{{information.className}}</span></span>
  </span> 

  </div>
  </el-col>
  <el-col :span="24" class="el-name " v-show="eltname" >
  <div class="grid-content bg-purple"  style="text-indent:0;">
   <button v-show="!schoolType" class="peoButn setRoleBtn" :key="index" v-for="(item,index) in role">{{item}}</button>
  <button v-show="schoolType" class="peoButn setRoleBtn" :key="index+50" :classId="item.id" v-for="(item,index) in schoolType">{{item.name}}</button>
 
  </div>
  </el-col>
  </el-row>
  </div>
  </el-col>
</el-row>
   </div>

 <div class="reviewIntroduction"  >
<el-row style="background:rgb(242,242,242);">
  <el-col :span="1" ><div style="background:rgb(242,242,242);" class="grid-content bg-purple"></div></el-col>
  <el-col :span="22" style="height:40px;background:rgb(242,242,242);">
  <div class="grid-content bg-purple" style="height:40px;position:relative;background:rgb(242,242,242);">
  <el-button type="primary"  v-show="!schoolType" style="width:96%;height:40px;position:absolute;top:0;left:2%;" @click="surefun(information.roleIds,information.id,information.userId)">{{surebtn}}</el-button>
  <el-button type="primary"  v-show="schoolType" style="width:96%;height:40px;position:absolute;top:0;left:0%;" @click="surefun('',information.userId,information.userId,information.className)">{{surebtn}}</el-button>
  </div>
  </el-col>
  <el-col :span="1"><div class="grid-content bg-purple" style="background:rgb(242,242,242);"></div></el-col>
</el-row>
</div>

</div>
<!--创建账号-->
<div class="buildwave" v-show="register">

 <div class="el-head-title"  >
 <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark" style="background:rgb(242,242,242);"><span class="el-dranger-color">系统中无此账号,请注册账号,并设置{{rolNam}}。</span></div></el-col>
</el-row>
 </div>

<div class="el-substance">
<el-row>
  <el-col :span="24" class="el-peo-input" ><div class="grid-content bg-purple-dark" ><el-input v-model="rolename" placeholder="输入姓名..."></el-input></div></el-col>
  <el-col :span="24" class="el-peo-input"><div class="grid-content bg-purple-dark"><el-input v-model="rolepassage" placeholder="输入密码..."></el-input></div></el-col>
  <el-col :span="24" class="el-peo-input"><div class="grid-content bg-purple-dark"><el-input v-model="surepassage" placeholder="确认密码..."></el-input></div></el-col>
  <el-col :span="24" class="el-peo-input" style="text-align:left;">
  <div class="grid-content bg-purple-dark">
    <div class="choice_radio"><div class="cram"><img src="../src/assets/images/unchecke.png"  class="el-n-img sexna"><img src="../src/assets/images/checke.png"  class="el-n-img sexnb pramse"></div><div class="cram" style="font-size:14px;float:right;">男</div></div>
    <div class="choice_radio"><div class="cram"><img src="../src/assets/images/unchecke.png"  class="el-n-img sexna"><img src="../src/assets/images/checke.png"  class="el-n-img sexnb pramse"></div><div class="cram" style="font-size:14px;float:right;">女</div></div>
  </div>
  </el-col>
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
   <el-row>
  <el-col :span="24" class="el-title" style="height:20px;"><div class="grid-content bg-purple">设置{{rolNam}}</div></el-col>
  <el-col :span="24" class="el-name"  style="">
  <div class="grid-content bg-purple" style="padding:10px;text-indent:0;">
  <button v-show="!schoolType" class="peoButn setRoleBtn"  :key="index" v-for="(item,index) in role">{{item}}</button>
  <button v-show="schoolType" class="peoButn setRoleBtn"   :key="index+50" :classId="item.id" v-for="(item,index) in schoolType">{{item.name}}</button>
  </div>
  </el-col>
  </el-row>
  </div>
  </el-col>
</el-row>
</div>
 
 <div class="reviewIntroduction" >
<el-row style="background:rgb(242,242,242);">
  <el-col :span="6" ><div style="background:rgb(242,242,242);" class="grid-content bg-purple"></div></el-col>
  <el-col :span="12" style="height:40px;background:rgb(242,242,242);">
  <div class="grid-content bg-purple" style="height:40px;position:relative;background:rgb(242,242,242);">
  <el-button type="primary" style="width:96%;height:40px;position:absolute;top:0;left:2%;" @click="createAccount()">新建账号</el-button>
  </div>
  </el-col>
  <el-col :span="6"><div class="grid-content bg-purple" style="background:rgb(242,242,242);"></div></el-col>
</el-row>
</div>

</div>
<!--内容的尾巴-->
</div>


</div>
</template>
<style scoped>
@import 'assets/css/erbac.css'
</style>
<script>
import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
export default {
    data(){
        return{
           sexa:false,
           sexb:false,
           mobile:'' ,
           phono:'',
           register:false,
           adjunction:false,
           radionum:'',
           eltname:false,
           eltnama:false,
           elttitle:true,
           role:{     
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
           schoolType:false,
           sex:{
            '1':'男',
            '2':'女' 
           },
           rolename:'',
           rolepassage:'',
           surepassage:'',
           rolesex:'',
           getrole:'',
           information:'',
           surebtn:'确认',
           rolNam:'角色',
           ralNam:'',
           branum:'人员',
           teanm:'内部人员',
           phone:''
        }
    },
    watch:{
        radionum(){
         //   console.log(111)
         //   console.log($('input[type=radio]').length)
            $('input[type=radio]').each(function(i,elem){
                 console.log($(elem).val())
            })
        },
        mobile(){
          
        
        if(this.mobile.length<12){
         this.successthod() 
        }else{
          this.$message({
               showClose: true,
               message: '手机号超过11位',
               type: 'error',
               center:true
               }) 
       
        } 
                
        }
    },
    created(){
      var that=this
    //  alert(this.$store.state.personnelType)
     this.$store.state.personnelType?(document.title='添加学生',this.branum='学生'):(document.title='添加人员',this.branum='人员')
      this.$nextTick(()=>{
        $('html, body').animate({scrollTop:0}, 'slow')
        $('.el-main').height($(document).height())
       if( $(window).outerWidth()>700){
         $('.el-personal').css('left',-48)
       }
       this.addpeopleBtn()
     $.popstate=function(){
      var then=that
        function abn(){
          that.$router.push({name:'pesonnel'})
        } 
        function cbn(){
          that.$router.push({name:'index'})
        } 
     $(window).unbind('popstate')
     $(window).on('popstate', function () {
   
    that.$store.state.skip?abn():cbn()
       
     })
      window.history.pushState('forward', null, 'mn'); 
     }
  $.popstate()

      })
    },
    methods:{
        inspectFun(){
        
        var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (!myreg.test(this.mobile)) {
               
               this.$message({
               showClose: true,
               message: '手机号不正确',
               type: 'error',
               center:true
               })
            } else {
              
            

      this.successthod()  
       
    this.$store.state.personnelType?(this.studentFun(),this.schoolType=JSON.parse(this.$store.state.schoolClassList)):(this.teacherFun(),this.schoolType=false)
   console.log(this.schoolType)
        }
        },
    createAccount(){
    var blu=false
    var getSex
    var that=this
      if(this.rolename){
       if(this.rolepassage==this.surepassage){
         if(this.rolepassage){
          if($('.choice_radio').eq(0).find('.sexnb').hasClass('pramse')&&$('.choice_radio').eq(1).find('.sexnb').hasClass('pramse')){
         
          this.$message({
               showClose: true,
               message: '需要选择性别',
               type: 'error',
               center:true
               }) 
          }else{
        $('.setRoleBtn').each(function(i,elem){
            if($(elem).hasClass('el-blue')){
          blu=true
          that.getrole=$(elem).html()
        //  alert($(elem).html())
            }
         })
         if(blu){
            const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
         })
           $('.choice_radio').each(function(i,elem){ 
             if(i==0){
               if($('.choice_radio').eq(0).find('.sexna').hasClass('pramse')){
                 getSex=1
               }
            
             }else{
            if($('.choice_radio').eq(1).find('.sexna').hasClass('pramse')){
               getSex=2
            }
              
             }
           })
           $.each(this.role,function(r,rlem){
           //  alert(rlem)
            if(rlem==that.getrole){
           that.getrole=r
            }
           })
           
           console.log('--------------')
           console.log(this.rolename)
           console.log(this.rolepassage)
           console.log(getSex)
           console.log(this.getrole)
           console.log(this.phono)
           console.log(this.$store.state.schoolId)
           console.log(Number($('.el-blue').attr('classId')))
         this.$store.state.personnelType?this.addStudentFun(getSex,loading):this.addTeacherFun(getSex,loading)
      
         }else{
           this.$message({
          showClose: true,
          message: '未选择角色',
          type: 'error',
          center:true
          })   
         }
          }
         }else{
            this.$message({
          showClose: true,
          message: '密码为空',
          type: 'error',
          center:true
          }) 
          
         }
       }else{
        
           this.$message({
          showClose: true,
          message: '密码不一致',
          type: 'error',
          center:true
          })  
       }
      }else{
        
         this.$message({
          showClose: true,
          message: '姓名为空',
          type: 'error',
          center:true
          })  
      }
    },
    surefun:function(roleIds,id,userId,className){
     
      var bln=false
      var that=this
     
   if(roleIds||className){
   /*   
 roleIds?that.$router.push({
    name:'pesonnel'
   }):that.$router.push({
    name:'pesonnel',
    type:1
   })
   */
   this.successthod()   
      }else{
       
       $('.setRoleBtn').each(function(s,slem){
        if($(slem).hasClass('el-blue')){
          that.getrole=$(slem).html()
          bln=true
        }
       })
       if(bln){
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
         $.each(that.role,function(r,relm){
         if(relm==that.getrole){
         that.getrole=r
         }
         })
         console.log(this.information)
         console.log(id)
         console.log(this.$store.state.schoolId)
         console.log(that.getrole)
        
          this.$store.state.personnelType?this.addStudentMun(id,loading):this.addTeacherMun(id,userId,loading)
 
      
       }else{
          this.$message({
          showClose: true,
          message: '未选择角色',
          type: 'error',
          center:true
        })
         
       }
      
      // console.log(that.getrole)
      // console.log(id)
      }
      
    },
    successthod(){
      
    this.adjunction=false
    this.register=false
    this.rolename=''
    this.rolepassage=''
    this.surepassage=''
    this.eltnama=false
    $('.peoButn').each(function(p,plem){
      $(plem).removeClass('el-blue')
    })
   
    
    },
    teacherFun:function(){
       var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/teacher/search", Qs.stringify({ 
      'mobile': this.mobile,
      'schoolId': this.$store.state.schoolId
      }))
    .then(res => {
     var data=res.data
     console.log(res)
    if(data.code==0){
     this.successData(data,0),this.rolNam="角色",this.teanm="内部人员"
    }
   //  console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
    },
  studentFun:function(){
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/student/search", Qs.stringify({ 
      'mobile': this.mobile,
      'schoolId': this.$store.state.schoolId
      }))
    .then(res => {
     var data = res.data
     console.log(data)

     if(data.code==0){
     
    if(data.data){
     if(data.data.classId.length) 
   $.each(this.schoolType,function(s,slem){
     if(data.data.classId[0]==slem.id){
        data.data.user.className=slem.name
      
     }
   }) 
    } 

   if(!data.data||!data.data.user.roleIds){
    
   this.successData(data,1),this.addpeopleBtn(),this.rolNam="班级",false,this.teanm="班级学生",this.eltnama=false
   }else{
     
     this.eltnama=true,this.ralNam=this.role[data.data.user.roleIds]
   }
   
    }
    })
    .catch(error => {

    })
    //
  },
  successData:function(data,bn){
  
    if(!data.data){
    
    this.register=true
    this.phono=this.mobile
   // console.log(this.radionum)
     }else{
     
      this.adjunction=true 
    bn?this.information=data.data.user:this.information=data.data
    if(bn){
   
if(data.data.user.className){
        
       this.ant()
      }else{
    
     this.bnt()

     }
    }else{
    
      if(data.data.roleIds){
      this.ant()
      }else{
        this.bnt()
      }
    }
      

     }
  },
  ant:function(){
       this.surebtn="确认"
       this.eltname=false
       this.eltitle=true
  },
  bnt:function(){
       this.surebtn="确认添加"
       this.eltname=true
       this.eltitle=false
  },
  addpeopleBtn:function(){
     this.$nextTick(()=>{
     
              $('.choice_radio').each(function(i,elem){
          
         $(elem).unbind('click')
         $(elem).on('click',function(){
          if(i){
           
          $('.choice_radio').eq(i).find('.sexna').addClass('pramse')
          $('.choice_radio').eq(i).find('.sexnb').removeClass('pramse')
          $('.choice_radio').eq(i-1).find('.sexna').removeClass('pramse')
          $('.choice_radio').eq(i-1).find('.sexnb').addClass('pramse')
          }else{
             $('.choice_radio').eq(i).find('.sexna').addClass('pramse')
          $('.choice_radio').eq(i).find('.sexnb').removeClass('pramse')
          $('.choice_radio').eq(i+1).find('.sexna').removeClass('pramse')
          $('.choice_radio').eq(i+1).find('.sexnb').addClass('pramse')
          }
         })
         })
      
        $('.setRoleBtn').each(function(i,elem){
         $(elem).unbind('click')
         $(elem).on('click',function(){
            $(elem).addClass('el-blue')
             $(elem).siblings().each(function(s,slem){
             $(slem).removeClass('el-blue')
             })
         })
        })
        $('.setRoleMtn').each(function(i,elem){
         $(elem).unbind('click')
         $(elem).on('click',function(){
            $(elem).addClass('el-blue')
             $(elem).siblings().each(function(s,slem){
             $(slem).removeClass('el-blue')
             })
         })
        })
          })
  },
  addTeacherFun:function(getSex,loading){
    
         var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
    HTTP.post("/appconsole/teacher/addUser", Qs.stringify({ 
      'name': this.rolename,
      'password': this.$md5(this.rolepassage),
      'sex':getSex,
      'roleIds':this.getrole,
      'mobile':this.phono,
      'schoolId':this.$store.state.schoolId
      }))
     .then(res => {
      var data=res.data
      console.log(data)
      
      if(data.code==0){
       
        this.successthod()
       this.$message({
            type: 'success',
            message: data.message,
            center:true
         })
         setTimeout(() => {
          loading.close()
         /* 
          this.$router.push({
        name:'pesonnel'
        })  
       */ 
        }, 800)
       
      }
      
       })
      .catch(error => {
      console.log(error)
      }) 
  },
  addStudentFun:function(getSex,loading){
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
    HTTP.post("/appconsole/student/addUser", Qs.stringify({ 
      'name': this.rolename,
      'password': this.$md5(this.rolepassage),
      'sex':getSex,
      'classId':Number($('.el-blue').attr('classId')),
      'mobile':this.phono,
      'schoolId':this.$store.state.schoolId
      }))
     .then(res => {
      var data=res.data
      if(data.code==0){
       this.successthod()
       this.$message({
            type: 'success',
            message: data.message,
            center:true
         })
         setTimeout(() => {
          loading.close()
         /* 
          this.$router.push({
          name:'pesonnel',
          type:1
          })  
          */
        }, 800)
      }
     })
     .catch(error => {

     })
   //
  },
  addTeacherMun:function(id,userId,loading){
    var that=this
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
    HTTP.post("/appconsole/teacher/addTeacher", Qs.stringify({ 
      'id': id,
      'schoolId': this.$store.state.schoolId,
      'roleIds':that.getrole,
      'userId':userId
      }))
     .then(res => {
       var data=res.data
       if(data.code==0){
         this.$message({
            type: 'success',
            message: data.message,
            center:true
         })
         that.successthod()
         setTimeout(() => {
          loading.close()
          /*
           that.$router.push({
           name:'pesonnel'
          })
         */
        }, 800)
       }
     }) 
      .catch(error => {
      console.log(error)
      }) 
  },
  addStudentMun:function(id,loading){
    var that=this
  //  alert(Number($('.el-blue').attr('classId')))
  console.log(id)
  console.log($('.el-blue').attr('classId'))
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
    HTTP.post("/appconsole/student/joinClass", Qs.stringify({ 
    id:id,
    classId:Number($('.el-blue').attr('classId'))
    }))
     .then(res => {
       var data = res.data
       if(data.code==0){
        this.$message({
            type: 'success',
            message: '添加成功',
            center:true
         })
         that.successthod()
         setTimeout(() => {
          loading.close()
          /*
           that.$router.push({
           name:'pesonnel'
          })
          */
        }, 800)
       }
       console.log(data)
     })
     .catch(error => {

     })

  },
  delFun:function(){
     this.mobile=''
  }    
    }
}
</script>