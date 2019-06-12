<template>
<div style="overflow:hidden;">
<div class="searchBtn">
<el-row :gutter="20">
  <el-col :span="24" style="padding:0;position:relative;">
  <div class="grid-content bg-purple" >
  
  <div style="padding:0 120px 0 30px;">
  <span style="position:relative;">
  <el-input v-model="searchval" placeholder="用户名或手机号..." ></el-input>
  <div class="iconclose el-icon-circle-close " @click="delFun()" style="position:absolute;top:0px;right:6px;color:#999;" ></div>
 </span>
  </div>
  <div style="position:absolute;top:0;right:15px;">
  <el-button type="primary"  @click="conservatorFun()">搜索</el-button>
   <router-link @click.native="addpeofun()" :to="{name:'pesonnel'}">
  <span  ><div class="el-icon-plus" style="width:35px;height:30px;"></div></span>
  </router-link>
  </div>
  </div>
  </el-col>
</el-row>
</div>

<div class="el-content" id="wrapper" >


   <el-row :gutter="20" class="el-cord" style="position:relative;top:40px;" v-show="!delshow"> 
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">{{ leaveTotal }}</span>人请假</div>
  </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">{{ lateTotal }}</span>人早退</div>
  </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">{{ earlyTotal }}</span>人旷课</div>
  </el-tooltip>
  </el-col>
  <el-col :span="6" class="">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <div class="grid-content bg-purple"><span class="el-red">{{ escapeTotal }}</span>人迟到</div>
  </el-tooltip>
  </el-col>
</el-row>


<div class="addErbac" id="db" style=" overflow:hidden;padding-bottom:0;" >

 <div class="modelBlock " style="background:#fff;width:100px;opacity:0;"  name="modelBlock" :key="index" v-for="(item,index) in teacherlist" >
 <router-link :to="'/Teacherdel/'+item.id+','+item.classId" @click.native="teachFub(item.className,item.classId)">
  <div class="pictureAccompany" style="height:100px;width:100px;">
  <img v-if="item.photoUrl" style="height:100%;width:100%;" :src="item.photoUrl" />
  <img v-else style="height:100%;width:100%;" src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png">
  </div>
  <div class="genre genrn-writ"  >
  <span style="font-size:11px;">{{item.name}}</span>
  </div>
 </router-link> 
  <div class="genre genrn-writ" style="overflow:hidden;">
  <span style="float:left;font-size:9px;" class="genrename" v-if="item.classId">{{item.className}}</span>
  <span style="float:left;font-size:9px;" class="genrename" v-else>{{role[item.roleIds]}}</span>
  <el-button v-if="item.roleIds!=3" style="color:red;padding-right:5px;font-size:9px;float:right; padding:6px 3px 6px 0;" v-show="delshow" @click="removeBtn(item.id,index)" type="text">删除</el-button>
  </div> 
 </div>

</div>
</div>
<div id="cb" class="cb "   v-loading="loading" >
<span class="spancon mb" style="position:absolute;top:5px;"></span>
</div>


</div>
</template>
<style scoped>
@import 'assets/css/erbac.css'
</style>
<script>
import axios from 'axios'
import Qs from 'qs'
export default {
    data() {
      return {
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
       teacherlist:[],
       beralist:[],
       nubk:null,
       windHin:0,
       winken:true,
       pageNom:1,
       searchval:'',
       totalCount:0,
        tableData: [],
       loading: false,
       delshow:true,
       personnelStr:'',
        leaveTotal: 0,
        lateTotal: 0,
        earlyTotal: 0,
        escapeTotal: 0,
        studentCount:0
      }
    },  
    watch:{
      totalCount(){
       this.$store.state.personnelType?document.title="班级学员管理("+this.totalCount+")":document.title="人事管理("+this.totalCount+")"
      },
      teacherlist(){
      this.$nextTick(()=>{ 
       var that=this 
   $(function(){
     $documentWidth=$(document).width()
    
  
 
    $.modelBlock=function(){
     
     let $w
    
     $("html,body").animate({scrollTop:0},10)
    $('.modelBlock').each(function(i,elem){
      let $elemWidth=$(elem).outerWidth()
      let  $elemHeight=$(elem).outerHeight()
      
      let $ratio=$elemWidth/$elemHeight
      $w=that.nubk

     
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
    // $.scrollBtn()
     }
         
      
      
    })
    }
    $.finalWidth=function(){
     that.finalWidth()
     $.modelBlock() 
     
    } 
    $.scrollBtn=function(){
      
     var myscroll
     var isr = false
    myscroll = new iScroll("wrapper",{
				topOffset: 0,
				onScrollMove: function(){
	
				
				},
				onScrollEnd: function(){
			  // alert(1)
        
					
				}
			})
      
     
    }
  $.finalWidth()
    $(document).bind("contextmenu",function(e){
   //     return false;
    })

          })
          $.loading=function(){
       $('.el-loading-mask').css({
          'height':30,
          'position':'relative',
          'background':'rgb(242,242,242)'
        })
        $('.el-loading-mask').find('svg').css({
          'position':'absolute',
          'top':10,
          'width':20,
          'height':20
        })
          }
          $.loading()
   //  alert($('.el-loading-mask').length)     
       }) 


      }
    },
    created(){
        
     var that=this
     
     this.$nextTick(()=>{ 
     this.$store.state.personnelType?(this.camposition(1),this.delshow=false,document.title='班级学员管理('+this.totalCount+')',this.personnelStr='班级学员管理'):(this.composition(1),document.title='人事管理('+this.totalCount+')',this.personnelStr='人事管理')
        $('#cb').width($(window).outerWidth())
        
       
        $('.el-main').height($(document).height())
      const   $documentHeight=$(document).height()
     this.windHin=$(window).innerHeight()
      $.popstate=function(){
        
     //  $(window).unbind('popstate')
 $(window).on('popstate', function () {
  
   window.removeEventListener('scroll', that.handleScroll, false)
   document.title='管理控制台'
   that.$router.push({
    name:'index'
  })
 })
   window.history.pushState('forward', null, 'pesonnel'); 
 }
  $.popstate()
this.inumFun
     })  
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll, false)
    },
    methods:{
      composition:function(pageNo,keyword){
        keyword?true:keyword=''
        var carelist=[]
        var that=this
        var HTTP = axios.create({
    baseURL:this.$local.temporary() 
    })
    HTTP.post("/appconsole/teacher/list", Qs.stringify({ 
      'schoolId': this.$store.state.schoolId ,
      'pageNo': pageNo ,
      'pageSize': 24,
      'keyword': keyword
      }))
    .then(res => {
      var data=res.data

      if(data.code==0){
        this.totalCount=data.data.totalCount
        this.beralist=data.data.teacherList
        if(pageNo==1){
         this.teacherlist=data.data.teacherList  
         
         data.data.teacherList.length?true:( this.$message({
            type: 'warning',
            message: '找不到此人，请确认输入是否正确。',
            center:true
         }))
         
        }else{
          
         if(this.beralist.length){
          this.winken=true
         carelist=JSON.parse(JSON.stringify(this.beralist)) 
         $.each(carelist,function(c,cem){
           that.teacherlist.push(cem)
         })
           $('.spancon').removeClass('el-icon-loading')
          
       //  console.log(that.teacherlist)
         }
         if(this.beralist.length!=24){
           $('.spancon').removeClass('el-icon-loading')
           $('.spancon').removeClass('mb')
          
         } 
          
        }
       
      }
       console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
      },
    camposition:function(pageNo,keyword){
    
      keyword?true:keyword=''
      var carelist=[]
     // alert(pageNo)
        var that=this,schoolClassListAry = []
     var HTTP = axios.create({
    baseURL:this.$local.temporary() 
    })
    HTTP.post("/appconsole/student/list", Qs.stringify({ 
      'schoolId': this.$store.state.schoolId ,
      'pageNo': pageNo ,
      'pageSize': 24,
      'keyword': keyword
      }))
    .then(res => {
    var data =res.data
    console.log(data)
    if(data.code==0){
      
      var studentAry=[]
      if(data.data.studentList.length){
      $.each(data.data.studentList,function(c,clem){
        if(!isNaN(clem.classId)){
        clem.aclassId=clem.classId  
        studentAry.push(clem)
        }else{
         $.each(clem.classId.split(','),function(s,slem){
           if(!s){
           var aClem = JSON.parse(JSON.stringify(clem)) 
            aClem.aclassId = slem
             studentAry.push(aClem)
           }
         
         }) 
        }
      })
      }else{
        if(pageNo==1){
      this.$message({
            type: 'warning',
            message: '找不到此人，请确认输入是否正确。',
            center:true
         })
        }
       
         
      }
      
       
     //   studentAry.sort(this.sortNumber)
        data.data.studentList  = studentAry
      $.each(data.data.schoolClassList,function(s,slem){
        var sAry ={
          'name':slem.name,
          'id':slem.id
        }
        schoolClassListAry.push(sAry)
      })
    //  console.log(JSON.stringify(schoolClassListAry))
       that.$store.commit('setSchoolClassList',JSON.stringify(schoolClassListAry))  
      $.each(data.data.studentList,function(c,clem){

         $.each(data.data.schoolClassList,function(s,slem){
            if(clem.aclassId==slem.id){
              if(!isNaN(clem.classId)){
                clem.className=slem.name
              }else{
                clem.className=slem.name+'...'
              }
               
            }
         })
      })
       
      
        this.beralist=data.data.studentList
        if(pageNo==1){
        if(!keyword){
        this.totalCount=data.data.totalCount
        }
        
         this.teacherlist=data.data.studentList  
         
        }else{
         
          if(this.beralist.length){ 
             
          this.winken=true
          
         carelist=JSON.parse(JSON.stringify(this.beralist)) 
         
        
         $.each(carelist,function(c,cem){
           that.teacherlist.push(cem)
         })
      
           $('.spancon').removeClass('el-icon-loading')
          
        console.log(that.teacherlist)
         }
         if(this.beralist.length!=24){
           $('.spancon').removeClass('el-icon-loading')
           $('.spancon').removeClass('mb')
          
         }  
        }
    }
   // console.log(data)
    })
    .catch(res =>{

    })


    },  
    finalWidth:function(){
      $documentWidth=$(document).width()
      $maxWidth=180
      $minWidth=100
      
    for(var e=$minWidth;e<=$maxWidth;$maxWidth--){
           if(($documentWidth-36)/$maxWidth>=3){
            this.nubk=$maxWidth

            break;
           }
    }
   
    },
    handleScroll () {
      var that=this
   var winH  
  var scrollTop = this.$parent.$el.scrollTop
//  alert($('#cb').offset().top)

  
  if($('#cb').length){
  winH   = $('#cb').offset().top-this.windHin
  }
  
// console.log(winH)
// console.log(this.winken)
 // console.log('---------')
 // console.log($('#cb').offset().top)
// console.log(scrollTop)
  if (this.winken) {
    this.pageNom++
    console.log('到达')
    this.winken=false
    
   if($('.spancon').hasClass('mb')){
     $('.spancon').addClass('el-icon-loading') 
   }
     
    
    
    setTimeout(function(){
   that.$store.state.personnelType?that.camposition(that.pageNom):that.composition(that.pageNom)  
    },1000)
    
   
  } else {
   
  
  }

  },
  addpeofun(){
  window.removeEventListener('scroll', this.handleScroll, false)  
  this.$router.push({
    name:'addpeople'
  })
  },
  conservatorFun(){
    
    window.removeEventListener('scroll', this.handleScroll, false) 
    this.$store.state.personnelType?this.camposition(1,this.searchval):this.composition(1,this.searchval)
    this.pageNom=1
    if(!this.searchval){
    window.addEventListener('scroll', this.handleScroll, false)  
    }
    
  },
  removeBtn:function(id,index){
   
    

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
      'id':id 
      }))
    .then(res => {
      var data=res.data

      if(data.code==0){
      var n=this.totalCount--
         n--
      this.$store.commit('setTeacherCount',n)
         $('.modelBlock ').eq(index).remove()
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
        })
        .catch(error => {

        })  

   $('.el-message-box').css({
     width:'90%',
     height:'130px'
     })
  },
  sortNumber:function(a,b){
    return Number(a.classId) - Number(b.classId)
  },
   inumFun:function(){
      this.leaveTotal = this.$store.state.leaveTotal
      this.lateTotal = this.$store.state.lateTotal
      this.earlyTotal = this.$store.state.earlyTotal
      this.escapeTotal = this.$store.state.escapeTotal
      this.studentCount = this.$store.state.classStudentCount 
  },
  teachFub:function(className,classId){
    
    className?(this.$store.commit('setClassName',className),this.$store.commit('setClassId',classId)):false
   
  },
  delFun:function(){
    this.searchval=''
    this.$store.state.personnelType?this.camposition(1,''):this.composition(1,'')
  }

    
    }
  
}   
</script>