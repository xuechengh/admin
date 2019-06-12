<template>
  <div id="app" style="overflow:hidden;" >
  <div id="appSystem" style="background:rgb(242,242,242);height:100%;width:100%;position:fixed;">
  </div> 
  <el-container class="el-242">
  <el-header>

  </el-header>
 
  <el-main  >
  <div style="overflow:hidden;">
<router-view name="batten" v-show="amt"></router-view>  
<router-view :bmt="bmt" ></router-view>
<router-view name="learnFlat" v-show="fmt"></router-view>
<router-view name="trainee" v-show="cmt"></router-view>
<router-view name="systemManagement"  :dmt="dmt" :emt="emt"></router-view>
<router-view name="appManagement"  :resourceIds="resourceIds"></router-view> 
</div>
  </el-main>
</el-container>  
  </div>
</template>
<script> 
 import axios from 'axios'
  import Qs from 'qs'
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data () { 
    return {
      isRouterAlive:true,
      appStr:[],
      amt:false,
      bmt:false,
      cmt:false,
      dmt:false,
      emt:false,
      fmt:false,
      schoolId:this.$route.query.schoolId,
      userId:this.$route.query.userId,
      setData:23,
      teacherCount:0,
      resourceIds:''
    }
  },
   beforeCreate(){
  
     
     this.$router.push({path:'/',query:{'schoolId':194,'userId':14230}})
       if(this.$route.query.schoolId){
       this.$store.commit('setSchoolId',this.$route.query.schoolId)
       this.$store.commit('setUserId',this.$route.query.userId) 
       }
      
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    
    HTTP.post("/appconsole/index/appinfo", Qs.stringify({
      'schoolId':this.$route.query.schoolId,
      'userId': this.$route.query.userId
      }))
    .then(res => { 
      var data=res.data
      console.log(data)
     // console.log('成功了')
       if(data.code==0){
       // this.setData=JSON.stringify(data)
        
        let appStr=data.data.resourceIds
         this.resourceIds=appStr
         this.appStr=appStr.split(',')
         this.$store.commit('setTeacherCount',data.data.teacherCount)
         this.$store.commit('setStudentCount',data.data.studentCount)
         this.$store.commit('setDailyActive',data.data.dailyActive)
         this.$store.commit('setMonthActive',data.data.monthActive)
         this.$store.commit('setLeaveTotal',data.data.leaveTotal)
         this.$store.commit('setLateTotal',data.data.lateTotal)
         this.$store.commit('setEarlyTotal',data.data.earlyTotal)
         this.$store.commit('setEscapeTotal',data.data.escapeTotal)
         this.$store.commit('setClassStudentCount',data.data.classStudentCount)
         this.$store.commit('setResourceIds',data.data.resourceIds)
         
       }
    })
    .catch(error => {
      console.log('发生错误')
      console.log(error)
    })
    
   },
  watch:{
    appStr(){
   //   console.log(this.appStr)
      var that=this
      $.each(this.appStr,function(i,str){
        if(parseInt(str)==2){
         that.amt=true
        }else if(parseInt(str)==4){
         that.bmt=true
        }else if(parseInt(str)==5){
         that.cmt=true
        }else if(parseInt(str)==6){
         that.dmt=true
        }else if(parseInt(str)==7){
         that.emt=true
        }else if(parseInt(str)==26){
         that.fmt=true
        }
      })
     // console.log(!this.appStr.length+':'+!this.amt+':'+!this.bmt+':'+!this.cmt)
      if(this.appStr.length&&!this.amt&&!this.bmt&&!this.cmt&&!this.dmt&&!this.emt){
        
          this.$message({
          showClose: true,
          message: '非常抱歉,您已经被移除管理员权限.',
          type: 'error',
          center:true
        })
      }
  
    }
  },
  created(){
         
     
      window.removeEventListener('scroll', this.handleScroll, false) 
         
    document.title='管理控制台'
    
    this.$nextTick(()=>{
   
     
    window.history.forward(0);
     // alert($('.el-main').height())
    })
  
    
   
  //  console.log('为什们')
   //  this.$route.query.schoolId
    //  this.$route.query.userId
    //  this.$schoolId.temporary()
    //  this.$userId.temporary() 
      
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  },
  updated(){
    
    if(this.$route.meta.backgroundColor){
  $('#appSystem').show()
   $(window).unbind('popstate')
    
   
    

  //  this.$router.replace({})
    }else{
      $('#appSystem').hide()
    }
  }
  
   
  

}
</script>


