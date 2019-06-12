<template>
<div>
<div class="moduleManager"  >
 <div class="el-title" style="margin-top:0px;">
  <el-row :gutter="20" class="el-lab el-module">
  <el-col :span="24" class="el-l"><div class="grid-content bg-purple" style="text-indent:1em;">APP功能模块管理<span class="moduleSpan">(修改图标请到PC端操作)</span></div></el-col>
</el-row>
 </div> 
 <div class="el-content"  v-show="sheet">
<div id="modelBlem">

  <div style="position:relative;border-radius:5px;overflow:hidden;" class="modelBlock el-moudle el-242"  name="modelBlock" :key="index" :getname="item.name"  v-for="(item,index) in icoList" >
  <div class="ft-moudle el-white" v-if=" item.name != 10 && item.name != 9 && item.name != 11">
  <router-link :to="{name:'echartsContent',params:{activeType:3,schoolId:schoolId}}" v-if="item.name == 14">
  <div class="pictureAccompany">
  <img :src="item.content" />
  <div class="genre" v-show="modifyname"><span name="noteName" :byId="item.id">{{ item.note }}</span></div>
  </div>
  <div class="genre genre-writh">
  <span v-if="item.note"> {{ item.note }} </span> 
  <span v-else> {{ note[ item.name-1 ] }} </span>  
  </div>
  </router-link>
    <router-link :to="{name:'unpublishedData'}" v-else-if="item.name == 16">
  <div class="pictureAccompany">
  <img :src="item.content" />
  <div class="genre" v-show="modifyname"><span name="noteName" :byId="item.id">{{ item.note }}</span></div>
  </div>
  <div class="genre genre-writh">
  <span v-if="item.note"> {{ item.note }} </span> 
  <span v-else> {{ note[ item.name-1 ] }} </span>  
  </div>
  </router-link>
  <div v-else>
  <div class="pictureAccompany">
  <el-tooltip class="item" effect="dark" content="此功能还在开发中" placement="bottom-start">
  <img :src="item.content"/>
  </el-tooltip>
  <div class="genre" v-show="modifyname"><span name="noteName" :byId="item.id">{{ item.note }}</span></div>
  </div>
  <div class="genre genre-writh">
  <span v-if="item.note"> {{ item.note }} </span> 
  <span v-else> {{ note[ item.name-1 ] }} </span> 
  </div>
  </div>
  <el-button size="mini" v-show="modifyname"  @click="modifyTheName($event,item.id,item.note)">修改名称</el-button>
  </div>
  
  <div class="ft-moudle el-white" v-else >
  <router-link :to="{name:'coutsewarer',params:{name:item.name,schoolId:schoolId,userId:userId}}"  @click.native="wlocal">
  <div class="pictureAccompany">
  <img :src="item.content"/>
  <div class="genre" v-show="modifyname"><span name="noteName" :byId="item.id">{{ item.note }}</span></div>
  </div>
  <div class="genre genre-writh">
  <span v-if="item.note"> {{ item.note }} </span> 
  <span v-else> {{ note[ item.name-1 ] }} </span> 
  </div>
  </router-link>
  <el-button size="mini" v-show="modifyname"    @click="modifyTheName($event,item.id,item.note)">修改名称</el-button> 
  </div>

  </div>

  <el-dialog
  title="修改官网名称"
  :visible.sync="dialogVisible"
  width="270px" 
  >
  <div></div>
  <span>
  <my-input v-model="price"></my-input>
 </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" :price=" price "   id="surebtn"  @click="changeMsg($event)">确 定</el-button>
  </span>
</el-dialog>
</div>
 </div>
 </div>
</div>
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  // jquery
  import Vue from 'vue'
   import {mapGetters} from 'vuex'
  let note = [
    '官网',
		'展厅',
		'咨询',
		'报名',
		'在线课程',
		'班级',  
		'直播',
		'新闻',
		'电子书',
		'课件',
		'视频',
		'资讯',
		'家校通',
    '学习圈',
    '公共课',
    '内部资料管理'
  ]
  let moudleNote=[
    '9',
    '10',
    '11',
    '12',
    '19',
    '18',
    '17',
    '21',
    '16',
    '14',
    '15',
    '23',
    '22',
    '20',
    '27',
    '24'
  ]
    Vue.component('my-input', {
                template: '<div></span><input type="text" ref="input" :value="value" @input="doThis"/></div>',
                props: {
                    value: String
                },
                methods: {
                    doThis() {
                        this.$emit('input', this.$refs.input.value);
                    }
                }
            })
export default {
   props: ['resourceIds'],
  data () {
    return {
      dialogVisible: false,
      modifyname: false,
      sheet: false, 
      icoList: [],
      note:note,
      price: '',
      byId: '',
      appStr:[],
      schoolId:0,
      userId:0
    }
  },
  watch: {
   getResourceIds: function(li){
      let appStr=li
    this.appStr=appStr.split(',') 
   // alert(this.appStr)
   }, 
   appStr(){
     
     let that=this
      this.$nextTick(()=>{
        $('.modelBlock').each(function(i,elem){
          $(elem).hide()
            $.each(that.appStr,function(j,val){
             if(moudleNote[parseInt($(elem).attr('getname'))-1]==val){
              // alert(val)
               $(elem).show()
             }
            })  
        })
      })
   },
   icoList(){
     
     this.$nextTick(()=>{
       
       console.log($('#modelBlem').find('.modelBlock').length)
       // Start
       var that=this
       $(function(){
      
  console.log($('#modelBlem').children().length)
    $documentWidth=$(document).width()
    $maxWidth=100
    $minWidth=40
    $k=null
 
    $.modelBlock=function(){
      
    // console.log($documentWidth) 
    // console.log($w)
     let $w
    
      $("html,body").animate({scrollTop:0},10)
   
    $('.modelBlock ').each(function(i,elem){

      let $elemWidth=$(elem).outerWidth()
      let  $elemHeight=$(elem).outerHeight()
      
      let $ratio=$elemWidth/$elemHeight
      $w=$k

     
     $(elem).find('img').css({
        'width':$w-15,
        'height':$w-15,
        'padding':'15px 8px 0'
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
     }
         
      
      
    })
    }
$.finalWidth=function(){
    for(var e=$minWidth;e<=$maxWidth;$maxWidth--){
           if(($documentWidth-36)/$maxWidth>=4){
            $k=$maxWidth
          //  console.log('-------')
           // console.log($k)
            break;
           }
    } 
    $.modelBlock()  
  } 
 $.finalWidth()
 // alert($('.modelBlock').length)
      let modelen=$('.modelBlock').length-1
      $('.modelBlock').each(function(i,elem){
       if(i==0||i==1){
     //  $(elem).insertAfter($('.modelBlock').eq(modelen))
       }
      })
    //  alert(that.appStr)
      if(that.$store.state.resourceIds){
       // alert($('.modelBlock').length)
   
    let appStr=that.$store.state.resourceIds
     that.appStr=appStr.split(',') 
      that.$nextTick(()=>{
       
    //  alert($('.modelBlock').length)
        $('.modelBlock').each(function(i,elem){
         
          $(elem).hide()
            $.each(that.appStr,function(j,val){
             if(moudleNote[parseInt($(elem).attr('getname'))-1]==val){
              // alert(val)
               $(elem).show()
             }
            })  
        })
      })
  }else{
   $('.modelBlock').hide()
  }
 })
 
      // End
     })
   }
  },
  created () {
   var that=this
   var nbar=[]
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/index/iconList", Qs.stringify({
       'schoolId': this.$store.state.schoolId,
       'userId': this.$store.state.userId
       }))
    .then(res => {
      var data=res.data
      $.each(data.data.icoList,function(c,cem){
       nbar[parseInt(cem.name)-1]=cem
      })
      
      this.icoList=nbar
       console.log('--*--')
       console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
  
    this.$nextTick(()=>{
      
      $(".el-main").removeAttr('style')
      
    })
  },
  mounted(){ 
   this.$nextTick(()=>{
      
     $(function(){
         console.log($('#modelBlem').children().length)
         
     })
     
   })
},
 computed:{
   ...mapGetters([
     'getResourceIds'
   ])
 },
    props: {
            value: String
           },
    methods: {
            doThis() {
            this.$emit('input', this.$refs.input.value);
               },
            doSure(){
              console.log('成功')
            },
            message(that,db){
   
    $('.modelBlock').each(function(i,elem){
     var noteName=$(elem).find('span[name=noteName]')
     var byId=noteName.attr('byId')
     
     if(byId==that.byId){
       if(db){
     that.price=noteName.html()
       }else{
        noteName.html(that.price) 
       }
     
     }
    })
            },
         changeMsg(e) {
      this.dialogVisible = false

      this.$nextTick(() => {
     //  console.log(this.price)
     //  console.log(this.byId)
       var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
       HTTP.post("/appconsole/index/updateIco", Qs.stringify({ 'name': this.price,'id':this.byId }))
    .then(res => {
      var data=res.data
     if(data.code == 0){
       var that=this
       this.$options.methods.message(that)
       this.$message({
          message: data.message,
          type: 'success',
          center: true
        })
      
     }
      // console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
      })
     
       },
       wlocal(){
        $('#modelBlem').attr('wm',true)
       },
       modifyTheName:function (e,id,note) {
         this.dialogVisible = true
         this.byId=id
         this.$options.methods.message(this,true)
    }
      }
}
</script>


