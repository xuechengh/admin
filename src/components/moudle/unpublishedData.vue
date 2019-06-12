
<template>
    <div class="unpub_size_12">

       <div>
        <div class=""  >
        <el-row class="elRow">
        <el-col class="elCol"  :span="24">
        <div class="grid-content bg-purple-dark">
      <el-row class="elRow">
  <el-col class="elCol" :span="2"><div class="grid-content bg-purple"></div></el-col>    
  <el-col class="elCol" :span="20">
  <div class="grid-content bg-purple unpub_color_eee" id="unpuBat" >
  <div class="unborblur" style="float:right;"></div>
  <span  class="unborbNam">用户借阅资格和规则</span>
  <div class="unborblur" style="float:left;"></div>
  </div>
  </el-col>
  <el-col class="elCol" :span="2"><div class="grid-content bg-purple"></div></el-col>
   </el-row>
        </div>
        </el-col>
        </el-row>
        </div>
       </div> 
 <div >
 <div class="unpub_border_buttom">
 <el-row class="elRow">
  <el-col class="elCol" :span="14"><div class="grid-content bg-purple unpub_textIndent_1em unpub_textAlign_left">内部教师</div></el-col>
  <el-col class="elCol" :span="6"><div class="grid-content bg-purple-light unpub_color_eee"><span id="teacherNum"></span>{{teacherStatus}}</div></el-col>
  <el-col class="elCol" :span="4"><div class="grid-content bg-purple unpub_color_blue"><div @click="reviseFun(1)">修改</div></div></el-col>
 </el-row>
 </div>
 <div class="unpub_border_buttom">
 <el-row class="elRow">
  <el-col class="elCol" :span="14"><div class="grid-content bg-purple unpub_textIndent_1em unpub_textAlign_left">班级学生(学校内部学员)</div></el-col>
  <el-col class="elCol" :span="6"><div class="grid-content bg-purple-light unpub_color_eee">{{studentStatus}}</div></el-col>
  <el-col class="elCol" :span="4"><div class="grid-content bg-purple unpub_color_blue"><div @click="reviseFun(0)">修改</div></div></el-col>
 </el-row>
 </div>
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
       note:{
        '0':'全体不能借阅',
        '1':'全体能借阅',
        '2':'人能借阅'   
       },
       teacherStatus:'',
       studentStatus:'',
       schoolDetailList:[]
      };
    },
    created(){
   this.init()
    this.resourceRead()
    },
    methods: {
    init(){
      var that=this
    document.title="内部资料",
    $('.el-main').css({
      'background':"rgb(255,255,255)"
    })
   
    $.popstate=function(){
      $(window).on('popstate',function(){
        that.$router.push({
         name:'index',
         replace:true
         })
         document.title="管理控制台"
        
      })
     window.history.pushState('forward', null, 'unpublishedData'); 
     
    
 

    }
    $.popstate() 
    this.$nextTick(()=>{
    // alert($('#unpuBat').outerWidth())
   // alert($('.unborbNam').outerWidth())  
     
     $('.unborblur').width(($('#unpuBat').outerWidth()-$('.unborbNam').outerWidth())/2-10)


    })
    },
    resourceRead(){
     var HTTP = axios.create({
      baseURL:this.$local.temporary()
      })
    HTTP.post("/appconsole/resource/resourceRead", Qs.stringify({
     'schoolId':this.$store.state.schoolId  
    }))
    .then(res => {
      var data=res.data
      console.log(data)
       if(data.code==0){
         this.teacherStatus = this.note[data.data.schoolDetailList[1].status],
         this.studentStatus = this.note[data.data.schoolDetailList[0].status],
         this.schoolDetailList = data.data.schoolDetailList;
         
         if(data.data.schoolDetailList[1].status==2){

         $('#teacherNum').html(data.data.schoolDetailList[1].content.split(',').length)

         }
       }
    }) 
    .catch(error => {

    })

    },
    reviseFun(i){
      var that = this
     this.$router.replace({  
      name: 'unpubRevise',
      params: {
      id:this.schoolDetailList[i].id,
      status:this.schoolDetailList[i].status,
      type:i,
      content:this.schoolDetailList[i].content
      }
     })

    }
    }
  }
</script>