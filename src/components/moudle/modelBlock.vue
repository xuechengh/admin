<template>
<div id="modelBlem">

  <div class="modelBlock el-moudle el-242" name="modelBlock" :key="index"  v-for="(item,index) in icoList" >
  <div class="ft-moudle el-white" v-if=" item.name != 10 ">
  <div class="pictureAccompany">
  <img :src="item.content"/>
  <div class="genre"><span name="noteName" :byId="item.id">{{ item.note }}</span></div>
  </div>
  <div class="genre genre-writh">
  <span > {{ note[ item.name-1 ] }} </span>
  </div>
  <el-button size="mini"   @click="modifyTheName($event,item.id,item.note)">修改名称</el-button>
  </div>
  
  <div class="ft-moudle el-white" v-else >
  <router-link to="/coutseware"  @click.native="wlocal">
  <div class="pictureAccompany">
  <img :src="item.content"/>
  <div class="genre"><span name="noteName" :byId="item.id">{{ item.note }}</span></div>
  </div>
  <div class="genre genre-writh"><span >{{ note[ item.name-1 ] }}</span></div>
  </router-link>
  <el-button size="mini"    @click="modifyTheName($event,item.id,item.note)">修改名称</el-button>

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
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import Vue from 'vue'
  import '@/assets/js/elContainer.js'
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
    '论坛'
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
  inject:['reload'],
  name: 'App',
  data () {
    return {
      dialogVisible: false,
      icoList: [],
      note:note,
      price: '',
      byId: ''
    }
  },
  watch: {
    $route(to){
    //  (to)
    }
  },
  created () {
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/index/iconList", Qs.stringify({
       'schoolId': this.$route.query.schoolId,
       'userId': this.$route.query.userId
       }))
    .then(res => {
      var data=res.data
      this.icoList=data.data.icoList
     //  //  (res)
    })
    .catch(error => {
      //  (error)
    })
  },
  mounted(){
   this.$nextTick(()=>{
 
     $(function(){
         //  ($('#modelBlem').children().length)
     })
     
   })
},
    props: {
            value: String
           },
    methods: {
            doThis() {
            this.$emit('input', this.$refs.input.value);
               },
            doSure(){
              //  ('成功')
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
      // //  (this.price)
      // //  (this.byId)
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
        this.reload()
  
      
        // start
        this.$nextTick(()=>{
        $(function(){
  //  ($('#modelBlem').children().length)
        $documentWidth=$(document).width()
    $maxWidth=100
    $minWidth=70
    $k=null
 
    $.modelBlock=function(){
     //  ($documentWidth) 
     //  ($w)
    $('.modelBlock ').each(function(i,elem){
       //  ('拉拉')
      $elemWidth=$(elem).outerWidth()
      $elemHeight=$(elem).outerHeight()
      
      $ratio=$elemWidth/$elemHeight
      $w=$k

     
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
    $h=$w/$ratio
    $(elem).css({
        'width':$w
    })
    $w=$(elem).outerWidth()
    
      $num=parseInt($documentWidth/$w)
      $surplus=$documentWidth-$num*$w
      if($surplus>=0){
        $m=$surplus/($num+1)
      }
     
    
     $(elem).css({
        'margin-left':'8px'
      })
      
     
         
      
      
    })
}
$.finalWidth=function(){
    for(var e=$minWidth;e<=$maxWidth;$maxWidth--){
           if(($documentWidth-36)/$maxWidth>=4){
            $k=$maxWidth
          //  //  ('-------')
           // //  ($k)
            break;
           }
    } 
    $.modelBlock() 
  } 
 $.finalWidth()
 })
        })
       // end 
     }
      // //  (data)
    })
    .catch(error => {
      //  (error)
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
