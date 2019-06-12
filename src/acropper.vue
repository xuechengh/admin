<template>
   <div class="maskon">

  <div class="manner"  > 
<el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect"  :default-active="this.$store.state.acropperType"  >
  <el-menu-item index="1" @click="choicenfun()">精选样式</el-menu-item>
  <el-menu-item index="2" @click="communication()">信息流样式</el-menu-item>
</el-menu>
 <div class="mannerbtn" style="display:none;"><el-button type="primary">保存</el-button></div>
  </div>

   <div class="selectban">
   <el-row class="selectbanrow">
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
   <div class="selectbanl">Banner</div>
   <div class="selectbanr"><el-checkbox  v-model="checka" @change="checkinlist" name="type"></el-checkbox></div>
  </div>
  </el-col>
 </el-row> 
   </div>

   <div class="selectmenu">

   <el-row class="selectmenurow">
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
    <div class="selectbanl">菜单</div>
   <div class="selectbanr" ><el-checkbox v-model="checkb" @change="checkinlist" name="type"></el-checkbox></div>
  </div>
  </el-col>
  </el-row>
  <!--touch-action:none;-->
  <div class="carteiconRan" id="carteiconRan" >
    
    <draggable element="div" v-model="icolist"  @update="icodatadrag()" :options="options">
  <div class="carte carteicon  cartesort" style=" margin:15px 0 ; " :sortcode="index" :key="index" :url="item.url" :name="item.name" :status="item.status" v-for="(item,index) in icolist">
  <el-row>
   <el-col :span="24">
  <div class="grid-content bg-purple-dark">
  <div class="selectImg" >
  <img :src="item.url" :name="item.name" >
  <div class="selectspan">{{ note[item.name-1] }}</div>
  <div class="iconclose el-icon-circle-close"  @click="circlose(index,item.name,item.id)"></div>
  </div>
   </div>
  </el-col>
  </el-row>
  </div>
   </draggable>
  <div class="carte carteicona cartesort" style="margin:15px 0px 15px 0;width:20px;" v-show="addbtn">
  <el-row>
   <el-col :span="24" >
  <div class="grid-content bg-purple-dark" >
  <div class="selectImg"  @click="open4()" >
  <img class="addImg"  src="../src/assets/images/addbanner.png">
  </div>
   </div>
  </el-col>
  </el-row>
  </div>

    </div>

  </div>
  

  <div class="modulesarm" :a="schoolDetailList.length" :name="item.name" :byId="item.id" :number="item.contentType.num" :num="item.contentType.num-item.content.length" :key="index" v-for="(item,index) in schoolDetailList" >
   <el-row class="selectbanrow">
  <el-col :span="24">
  <div class="grid-content bg-purple-dark" style="padding:0px 0px 0px; font-size:12px;overflow:hidden;">
  <span class="selleft siz16"  ><span>{{item.note}}</span>精选</span>
  <span class="selleftman" >{{sort[item.contentType.type-1]}}</span>
  <span class="selleftman" v-show="movebtn" v-if="item.content.length<=item.contentType.num">数量(<span>{{item.content.length}}</span>/<span>{{item.contentType.num}}</span>)</span>
  <span class="selleftman" v-show="movebtn" v-else>数量(<span>{{item.contentType.num}}</span>/<span>{{item.contentType.num}}</span>)</span>
  <span class="rem" @click="choiceclose(item.id)">删除</span>
  <span class="intercalate"  @click="intercalate(item.name,item.note,item.contentType.num,item.contentType.type)">设置</span>
  <span class="intercalate amovebtn" @click="setmove(item.name,2,index)" >下移</span>
  <span class="intercalate amovebtn" @click="setmove(item.name,1,index)">上移</span>

  </div>
  </el-col>

  <div class="substance" :type="item.contentType.type">
    
    <div class="subraggable" style="border:1px solid #fff;">
    <div class="tabulashade"></div> 
    <draggable element="div" v-model="item.content"  @update="datadragEnd()" :options="options">
  <div class="tabulatin" @click="switchcard(inum,item.name,item.contentType.type)" style="padding:0; border:1px solid #fff;margin-bottom:20px;overflow:hidden;" :key="'a_'+inum" v-for="(btem,inum) in item.content">
  
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
  <div class="cardstrip">
  
  <img class="tabulaImg" :src="btem.photo" >
  <div class="switchcard" v-if="item.contentType.type-1"></div>
  <div class="switchspan" v-if="item.contentType.type-1" >点击卡片切换</div>
  <div class="textal" >
  <div class="emulate"><span class="modtype" v-show="tariff" >类型</span><span>{{btem.title}}</span></div>
  <div class="emulate"><span>{{btem.name}}</span></div>
  <div v-show="tariff"  class="emulate"><span><span>机构</span>&nbsp;|&nbsp;<span>教师</span></span></div>
  <div  class="emulate col204 sales"><span><span>销量</span>&nbsp;<span>0</span></span><span class="rmb">￥0</span></div>
  </div>
  </div>
  </div>
  </el-col>
  </div>
  </draggable>
  </div>
  
  <div class="addmanual" :a="index" v-show="item.contentType.type-1" :key="inumt+index*20" v-for="(ctem,inumt) in numlist[index]">
  <router-link :to="{name:'acropper'}" @click.native="modu(item.name)">
  <img class="addcord" src="../src/assets/images/addcord.png">
  </router-link>
  </div>


  </div>

  </el-row>
  </div>
 

   <div class="selectmodule" v-show="concentration">
   <el-row class="selectbanrow">
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
   <span class="selleft" id="selInformation" v-show="information">信息流</span>
   <span class="selleftman sellinforman" v-show="information" style="font:9px;">选择信息流,APP主页中将以论坛信息流的形式展现.</span>
   <span v-show="choice" @click="choicefun()">添加精选模块(<span class="quantum">0</span>/6)</span>
  </div>
  </el-col>
 </el-row> 
   </div>
 
  <el-dialog
  title="设置"
  :visible.sync="dialogVisible"
  width="90%"
  >
  <div style="overflow:hidden;" class="dialogw" v-show="addicon">
   <div class="carte cartetist"   :name="item.name" :key="index" v-for="(item,index) in icotist">
  <el-row>
   <el-col :span="24">
  <div class="grid-content bg-purple-dark">
  <div class="selectImg pitchonImg">
  <img :src="item.url">
   <img class="checkeImg untick" src="../src/assets/images/tick.png">
  <div class="selectspan">{{note[item.name-1]}}</div>
  </div>
   </div>
  </el-col>
  </el-row>
  </div>
  </div>

  <div class="carte cartetist" v-show="cullice"  :key="index" v-for="(item,index) in bullfun">
  <el-row>
   <el-col :span="24">
  <div class="grid-content bg-purple-dark">
  <div class="selectImg pitchonImg pitchanImg" :name="index">
  <img :src="item">
   <img class="checkeImg untick" src="../src/assets/images/tick.png">
  <div class="selectspan">{{mote[index]}}</div>
  </div>
   </div>
  </el-col>
  </el-row>
  </div>
  
   <div class="setfit" v-show="addmoudle">
  <el-row>
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
  <div class="customcontent">
  <div><span class="customname">自定义精选推荐名称</span></div>
  <el-input v-model="input" placeholder="请输入内容"></el-input>
  <div class="cusdiv"><span class="customname">精选推荐数量</span></div>
  <div class="setfitbtn">
   <button class="setfitbutton sefetbut el-blue">6</button>
   <button class="setfitbutton sefetbut">5</button>
   <button class="setfitbutton sefetbut">4</button>
  </div>
  <div class="cusdiv"><span class="customname">排序方式</span></div>
  <div class="setfitbtn">
   <span><button class="setfitbutton sefetbtn el-blue" >按最新的排序</button></span>
   <span><button class="setfitbutton sefetbtn">手动排序</button></span>
  </div>
  </div>
  </div>
  </el-col>
  </el-row>
   </div>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click=" dialogsure() ">确 定</el-button> 
  </span>
</el-dialog>

   </div>
</template>
<style scoped>
@import 'assets/css/croppermin.css' 
</style>
<script>
import axios from 'axios'
import Qs from 'qs'
import draggable from 'vuedraggable'
import Vue from "vue"
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
    '内部资料'
 ]
 let mote = {
   '1':'在线课程',
   '2':'班级',
   '3':'直播',
   '4':'电子书',
   '5':'课件',
   '6':'视频',
   '7':'新闻动态'
 }
 let sort = [
   '最新排序',
   '手动排序'
 ]
 let cullfun = {
   '1':'http://wied-oss.oss-cn-hangzhou.aliyuncs.com/app/icon/default/5.png',
   '2':'http://wied-oss.oss-cn-hangzhou.aliyuncs.com/app/icon/default/6.png',
   '3':'http://wied-oss.oss-cn-hangzhou.aliyuncs.com/app/icon/default/7.png',
   '4':'http://wied-oss.oss-cn-hangzhou.aliyuncs.com/app/icon/default/9.png',
   '5':'http://wied-oss.oss-cn-hangzhou.aliyuncs.com/app/icon/default/10.png',
   '6':'http://wied-oss.oss-cn-hangzhou.aliyuncs.com/app/icon/default/11.png',
   '7':'http://wied-oss.oss-cn-hangzhou.aliyuncs.com/app/icon/default/8.png'
  }
export default {
  components: { 
  draggable,
  },
  data(){
    return{
       movebtn: true,
       dialogVisible: false,
       choice:true,
       cullice:false,
       information:false,
       addicon:false,
       addmoudle:false,
       tariff:false,
       concentration:true,
       input:'',
       icolist:[],
       icotist:[],
       note:note,
       mote:mote,
       sort:sort,
       cullfun:cullfun,
       bullfun:'',
       ticklist:[],
       addbtn:false,
       schoolDetailList:[],
       schoolDetailString:'',
       numlist:[],
       pattern:1,
       checkb:false,
       checka:false,
       status:[],
       selectmodule:[],
       intercalatedagle:0,
       setStatus:[],
       carteiconRanHin:0,
       bbn:[],
       options:{animation: 200,delay:300}
    }
  },
  created(){
 
    window.addEventListener('contextmenu', function(e){
	e.preventDefault();
   })
   // this.options={animation: 200}
   /* 
    let documentWidth=$(document).outerWidth()
    let ipadWidth=768
    let fontsize=14
    let that=this
    if(documentWidth<ipadWidth){
     let ratio=documentWidth/ipadWidth
     alert( $('.sellinforman').attr(''))
     $('.sellinforman').css({
       'color':'red'
     })
    }
    */
    this.$nextTick(()=>{
     if($(document).outerWidth()<360){
      this.movebtn=false
     $('#selInformation').hide()
     
    } 
    })
    
    var that=this
 $.popstate=function(){
  $(window).unbind('popstate')
 $(window).on('popstate', function () {
   document.title='管理控制台'
   that.$store.commit('setAcropperTop',0)
  that.$router.push({
    name:'index'
  })

 }) 
 }
$.popstate() 
   document.title='主页布局管理'
  
  //  console.log('在这'+this.$store.state.acropperType)
    $('.el-main').css({
      'background':'rgb(242,242,242)'
    })
  
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/showBBLImgs", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId
       }))
    .then(res => {
      var data=res.data
      if(data.code==0){
     // this.icolist=data.data.icoList
      $.each(data.data.icoList,function(r,rlem){
       if(rlem.name!=0){
         that.icolist.push(rlem)
       }
      })
      this.status=data.data.status
    // console.log(data.icoList)
     }
     // console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
   // 精选

   if(this.$store.state.acropperType==1){ 
    this.choiceness()
   }else{
     this.information=true
     this.choice=false
   }
   
    

    this.$nextTick(()=>{
      $('.el-main').height($(window).outerHeight())
      $('.el-dialog__body').css({
        'overflow':'hidden'
      })
      $('.el-dialog__header').css({
        'margin':'0 auto'
      })
      $('.el-dialog__footer').css({
        'position':'absolute',
        'bottom':0,
        'right':0
      })

    
      
    })
  },
  watch:{
 icotist(){
  // alert(this.icotist.length)
  if(this.icotist.length){
    this.addbtn=true
  }else{
    this.addbtn=false
  }
 },   
 icolist(){
   
   var that=this
    this.$nextTick(()=>{
      that.carteicon()
    let $documentWidth = $('.selectmenu').outerWidth()
    let $maxWidth=70
    let $minWidth=40
    let $k=null
    $.modelBlock=function(){
      
    $('.cartesort').each(function(i,elem){
     let $elemWidth=$(elem).outerWidth()
     let  $elemHeight=$(elem).outerHeight()
     let $ratio=$elemWidth/$elemHeight
     let  $w=$k

     console.log($w)
   
     
    let $h=$w/$ratio
    $(elem).css({
      'width':$w,
      'height':$w+30
    })
    $(elem).find('.selectImg').css({
        'width':'100%'
    })
    $(elem).find('img').css({
      'width':$w,
      'height':$w
    })
    $('.carteicona').css({
      'width':$w,
      'height':$w+30
    })
    $('.carteicona').find('img').css({
      'width':'100%',
      'height':$w+30
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
    

    })
    }
    $.finalWidth=function(){
    for(var e=$minWidth;e<=$maxWidth;$maxWidth--){
           if(($documentWidth-36)/$maxWidth>=4){
            $k=$maxWidth        
            break;
           }
    } 
    $.modelBlock()  
  } 
   $.finalWidth()

   $.carteiconRanHin=function(){
    
   this.carteiconRanHin=$('.carteiconRan').height()
  console.log( this.carteiconRanHin)
   }
 //  $.carteiconRanHin()
 var then=this
    
   $.carteicon=function(){
     var than=this
     var mstop = false;
	   var $miemout = null;
    
      $('body').unbind('touchstart')
    $('body').on('touchstart', '.carteicon', function(e) {	
    //  $('.carteiconRan').height(than.carteiconRanHin)
    var $clone = $(this).clone();
		var that = this;
	  var touch = e.originalEvent.targetTouches[0]
	  var disy = touch.pageY;
    var disx = touch.pageX;
    var positx=$(this).position().left
    var posity=$(this).position().top
    
 
      
    $clone.addClass('draging').css({
			left: $(this).position().left,
			top: $(this).position().top,
			"opacity": "0"
		}).removeClass('carteicon')
    var $timeout =setTimeout(function(){
      $('.carteiconRan').append($clone);
			$(that).css({ "opacity": "1" });
			$clone.css({ "opacity": ".3" })
			mstop = true
    },800)
    $('.carteiconRan').on('touchmove',function(e){
     // e.preventDefault ? e.preventDefault() : (e.returnValue = false)
      var touch1 = e.originalEvent.targetTouches[0]
      var nisx=touch1.pageX
      var nisy=touch1.pageY
      
     // console.log(positx)
      $clone.css({
				left:nisx+positx-disx,
        top:nisy+posity-disy
			})
      

    })
    $('body').on('touchend',function(e){
       $('.carteiconRan').unbind('mousemove')
  	 	 $('body').unbind('touchend')
      var interimArray = [];
  	 	var groupArray=[];
  	 	var seatAttay=[];  
      clearTimeout($timeout);
      if(mstop){
       var minIndex = $(that).index();
       
				var minValue = 1000;
        
				$('#carteiconRan').find('.carteicon').each(function() {
        // console.log(0)
					var smalldistance = Math.sqrt(Math.pow($clone.position().left - $(this).position().left, 2) + Math.pow($clone.position().top - $(this).position().top, 2)) //利用勾股定理获取每一个盒子离克隆出来的盒子的距离
					if(smalldistance < minValue) {
						minValue = smalldistance;
						minIndex = $(this).index();
          //  console.log(minIndex)
					}
				})
       // console.log(minIndex)
       if(minIndex == $(that).index()) {
			
					$clone.animate($(that).position(), 400, function() {					
						$(that).css({ "opacity": "1" });
						$(this).remove();
		
					})		
				}else{
          var $minbox = $('#carteiconRan').find('.carteicon').eq(minIndex);
					var $firstIndex=$(that).index();
					var $lastIndex=$minbox.index();
					if($firstIndex<$lastIndex){

					 for(var i=$firstIndex+1;i<=$lastIndex;i++){
					 	if($('#carteiconRan').find('.carteicon').is(':visible')){
					 	groupArray.push(i)	
					 	}
					 	
					 }
					
					}else{
					 for(var i=$firstIndex-1;i>=$lastIndex;i--){
					 	if($('#carteiconRan').find('.carteicon').eq(i).is(':visible')){
					 	groupArray.push(i)	
					 	}
					 }	
					}
          $.each(groupArray, function(i,index) {
				 var	$inbtn=$firstIndex<$lastIndex?index-1:index+1
					while($('#carteiconRan').find('.carteicon').eq($inbtn).is(':hidden')&&$inbtn!=$firstIndex){
						$firstIndex<$lastIndex?$inbtn--:$inbtn++
					}
					
				var	$position=$('#carteiconRan').find('.carteicon').eq($inbtn).position()
					seatAttay.push($position)  
				
					})
          	
          $clone.animate($minbox.position(), 400, function() {
				  	$minbox.html('')
						$minbox.html($clone.html()).css({ "opacity": "1" })     
						$clone.remove();
				   $.mothaner()
					})
          	$.each(seatAttay, function(i,position) {
					  
					  	 
					  var	 $imun=parseInt(groupArray[i])
					  	 ////($imun)
						var $Arraybox=$('#carteiconRan').find('.carteicon').eq($imun)
						 $imun=$firstIndex<$lastIndex?$imun-1:$imun+1
						 while($('#carteiconRan').find('.carteicon').eq($imun).is(':hidden')&&$imun!=$firstIndex){
						$firstIndex<$lastIndex?$imun--:$imun++
					    }
						
						var $Beforebox=$('#carteiconRan').find('.carteicon').eq($imun)
						var $clone2=$Arraybox.clone()
						
			     $clone2.addClass('draging').css({
						left: $Arraybox.position().left,
						top:  $Arraybox.position().top
					})
					$('#carteiconRan').append($clone2);
					$Beforebox.html('');
					$clone2.animate(position, 400, function() {
					var	$add=$firstIndex<$lastIndex?-1:1
						
					var	 $icon=parseInt($(this).attr('sortcode'))+$add
          console.log($icon)
						 while($('#carteiconRan').find('.carteicon').eq($icon).is(':hidden')&&$icon!=$firstIndex){
						$firstIndex<$lastIndex?$icon--:$icon++
					    }
             
					var	 $lingShi=$('#carteiconRan').find('.carteicon').eq($icon)
						$lingShi.html($(this).html()).css({ "opacity": "1" })
					
						$(this).remove();

					});
					////
					});
         // console.log(seatAttay)
          $.mothaner=function(){
          setTimeout(function(){
            let icolist=JSON.parse(JSON.stringify(then.icolist))
         
            // then.saveIco()
            $('.carteicon').each(function(i,elem){
            let name=$(elem).find('img').attr('name')
            let sortcode= i+1
             console.log(sortcode)
            console.log(typeof sortcode)
            
            $.each(icolist,function(c,clem){
            if(clem.name==name){
             clem.sortcode=sortcode
            }
            })
            })
            then.saveIco(icolist,true)
          },10)
          }
          
        }
      } 
    })

    }) 
   }
  
 //  $.carteicon()

    })
     
 },
 ticklist(){
   var that=this
   var brt=false
   var status=0,newIconlist=[]
  console.log(this.ticklist)
  $.each(that.icolist,function(k,klem){
   if(klem.status=="1"){
    newIconlist.push(klem)
   }
 })
   $.each(this.ticklist,function(t,tlem){
    $.each(that.icolist,function(k,klem){
      if(tlem==klem.name){
        klem.status="1"
       brt=true
      newIconlist.push(klem)
      }
    })
   })
 
   $.each(newIconlist,function(n,nlem){
     nlem.sortcode=n+1
   })
   this.icolist=newIconlist
 
   if(brt){
  that.carteicon()
  $('.carteicon').each(function(i,elem){
     if($(elem).is(':visible')){
      status=1
     }else{
       status=0
     }
     let name= $(elem).attr('name')
     $.each(that.icolist,function(c,cale){
     if(name==cale){
      that.icolist.status=status
     }
     }) 
  })
  console.log(JSON.stringify(this.icolist))
  
  this.saveIco(this.icolist)
    
    
   }
//   console.log(JSON.stringify(this.icolist))
 },
 schoolDetailList(){
   this.$nextTick(()=>{
     this.$forceUpdate()
  //  alert(this.schoolDetailList.length)
    console.log(this.schoolDetailList)
   let ipadWidth=768 
   let ipadHeight=1024
   let ipadSize=14 
   let ipadlineHeight=38
   let documentWidth=$(document).outerWidth()
   let documentHeight=$(document).outerHeight()
   let sw=220
   let bh=60
   let that=this
   let munlist=[]
   let ratio=documentWidth/ipadWidth
    $('.quantum').html($('.modulesarm:visible').length)
    if(this.schoolDetailList.length>=6){
    this.concentration=false
    }
    
  // alert(ipadSize*ratio)
    if(documentWidth<ipadWidth){
    $('.tabulaImg').css({
      width:sw*ratio,
      height:sw*ratio
    })
    $('.switchcard').css({
      width:sw*ratio,
      height:bh*ratio
    })
     $('.switchspan').css({
      width:sw*ratio,
      height:bh*ratio
    })
 $('.cardstrip').height(sw*ratio)
 $('.emulate').css({
   fontSize:ipadSize*ratio,
   marginLeft:sw*ratio,
   lineHeight: ipadlineHeight*ratio+'px'
 })


    }
    
   let w = $('.textal').width()-122 
   $('.sales').each(function(i,elem){
    $(elem).width($('.emulate').width())
   })
   
   that.numlist=[]
   console.log(this.schoolDetailList)
   
   $('.modulesarm').each(function(i,elem){
    let num=parseInt($(elem).attr('num'))
    let nu=[]
     // console.log(num)
     if(num){
      while(num>0){
      // console.log(num)
       nu.push(num)
       num--
      }
      
     }
    that.numlist.push(nu)
    
     
   })
   console.log(that.numlist)
   // this.$forceUpdate()
   // 上移下移是否顶格
 
 this.modulesarmove()

   // 添加精选未被选中的
 //  console.log('未选中')
 //  console.log(this.cullfun)
 // alert(this.cullice)
  
let cullfun=JSON.parse(JSON.stringify(this.cullfun))
$('.modulesarm:visible').each(function(i,elem){
    let name=$(elem).attr('name')
    delete cullfun[name]
})
  this.bullfun=cullfun
  
   

  // 数量限制
  
  $('.modulesarm').each(function(i,elem){
     $(elem).find('.tabulatin').show()
   if($(elem).attr('num')<0){
   let num=parseInt($(elem).attr('num'))
   let length=$(elem).find('.tabulatin').length

   for(var a=num;a<0;a++){
     $(elem).find('.tabulatin').eq(length+a).hide()
   }
   }

  })
 // options
 this.tabulatinstart()
 
 
   })
   if(this.$store.state.acropperTop){
    $('.el-main').animate({scrollTop:this.$store.state.acropperTop},1000)
   }
   

 },
 status(){
 //  console.log(this.status)
   if(this.status.banner==1){
    this.checka=true
   }

   if(this.status.ico==1){
    this.checkb=true
   }
 },
 numlist(){
   this.$nextTick(()=>{
   let ipadWidth=768  
   let documentWidth=$(document).outerWidth()
   let ratio=documentWidth/ipadWidth
   let sw=220
   if(documentWidth<ipadWidth){
     $('.addmanual').height(sw*ratio)
   }
  
   }) 
 },
 selectmodule(){

   // console.log(this.selectmodule)
   let that=this
   let schoolDetailString=JSON.parse(this.schoolDetailString)
   
   $.each(schoolDetailString,function(s,slem){
     $.each(that.selectmodule,function(k,klem){
      if(slem.name==klem){
       slem.status=1
      }
     })
   })
 //  alert('a1')
 //  alert(this.addicon)
   if(this.addicon){
   //  alert(3)
    this.choiceList(schoolDetailString,3) 
   }else{
   //  alert(4)
     this.choiceList(schoolDetailString,4) 
   }
   
  
  },
  setStatus(){
  // console.log(this.setStatus)
  var that=this
  var schoolDetailList=JSON.parse(this.schoolDetailString)
  $.each(schoolDetailList,function(s,slem){
     if(slem.name==that.intercalatedagle){
     slem.note=that.setStatus[0] 
     slem.contentType.num=that.setStatus[1]
     slem.contentType.type=that.setStatus[2]
     
     }          
  })
 
   this.choiceList(schoolDetailList,that.setStatus[2],that.setStatus[1])
  }
  },
  methods:{
   
     open4() {
      
         $('.el-dialog__title').html('设置')
         this.dialogVisible=true
         this.addicon=true
         this.addmoudle=false
         this.cullice=false
         this.intercalatedagle=0
         this.$nextTick(()=>{
        //  alert($('.dialogw').outerHeight()) 
          $('.el-dialog').height($('.dialogw').outerHeight()+200) 
        //  alert($('.pitchonImg').length)
      $('.pitchonImg').each(function(i,elem){
       $(elem).unbind('click')
       $(elem).on('click',function(){
         if($(this).find('.checkeImg').hasClass('untick')){
       $(this).find('.checkeImg').removeClass('untick')
         }else{
       $(this).find('.checkeImg').addClass('untick')   
         }
        
       })
      })
         })
      },
       handleSelect(key, keyPath) {
        if(key==2){
         this.information=true
         this.choice=false
        }else{
          this.information=false
         this.choice=true
        }
      },
      intercalate:function(name,note,num,type){
         $('.el-dialog__title').html('设置')
         this.$store.commit('setAcropperTop',$('.el-main').scrollTop())
         this.dialogVisible=true
         this.addicon=false
         this.addmoudle=true
         this.cullice=false
         this.intercalatedagle=name
         this.input=note
         this.$nextTick(()=>{
           $('.el-dialog').height(440) 
           if(type==1){
             $('.sefetbtn').eq(0).addClass('el-blue')
             $('.sefetbtn').eq(1).removeClass('el-blue')
           }else{
             $('.sefetbtn').eq(1).addClass('el-blue')
             $('.sefetbtn').eq(0).removeClass('el-blue')
           }
     $('.sefetbtn').each(function(i,elem){
      
     $(elem).unbind()
     $(elem).on('click',function(){
      // alert($(this).siblings().length)
       $(this).addClass('el-blue')
       if(i==0){
      $('.sefetbtn').eq(1).removeClass('el-blue')
       }else{
      $('.sefetbtn').eq(0).removeClass('el-blue')
       }
      
     })
    })
    $('.sefetbut').each(function(i,elem){
       if($(elem).html()==num){
         $(elem).addClass('el-blue')
         $(elem).siblings().removeClass('el-blue')
       }
       $(elem).unbind()
       $(elem).on('click',function(){
       $(this).addClass('el-blue')
       $(this).siblings().removeClass('el-blue')
       })

    })
     
         })
      },
      dialogsure(){
        var that=this
        var num,fashion
  
     this.dialogVisible = false
  // alert('b'+this.intercalatedagle)
    if(this.intercalatedagle){
  $('.sefetbut').each(function(i,elem){
       if($(elem).hasClass('el-blue')){
       num=parseInt($(elem).html())
       }
     })
     $('.sefetbtn').each(function(i,elem){
      if($(elem).hasClass('el-blue')){
       fashion=i+1
      }

     })
     $.each(JSON.parse(that.schoolDetailString),function(s,slem){
      if(that.intercalatedagle==slem.name){
       if(slem.note!=that.input||slem.contentType.num!=num||slem.contentType.type!=fashion){
        if(slem.contentType.type!=fashion){
       console.log('上')
        that.setStatus=[that.input,num,fashion,true]
        }else{
         console.log('下')
        that.setStatus=[that.input,num,fashion]
        }
        
       }
      }
     }) 
     
    }else{
       that.ticklist=[]
       that.selectmodule=[]
       $('.cartetist').each(function(i,elem){
      if(!$(elem).find('.checkeImg').hasClass('untick')){
       that.ticklist.push($(elem).attr('name'))
      }
     })
    $('.pitchanImg').each(function(i,elem){
      if(!$(elem).find('.checkeImg').hasClass('untick')){
       that.selectmodule.push($(elem).attr('name'))

      }
     
    })
    }
     
    
  
      },
      carteicon(){
        var that=this
        that.icotist=[]
        this.$nextTick(()=>{

          $('.carteicon').each(function(i,elem){
      let status= parseInt($(elem).attr('status'))
      let url=$(elem).attr('url')
      let name=$(elem).attr('name')
      let codename={
        'url':url,
        'name':name
      }
      if(status==0){
     
      that.icotist.push(codename)
       $(elem).hide()
      // console.log(that.icotist)
      }else{
        $(elem).show()
      }
      })
        })
      
      },
      circlose:function(index,name,id){
        var that=this
      
        this.$confirm('是否删除该菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
         $.each(that.icolist,function(c,clem){
           if(clem.name==name){
            clem.status="0"
            
            that.carteicon()
           }
         })
         var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/displayico", Qs.stringify({ 
      'id':id
       }))
    .then(res => {
      var data=res.data
      if(data.code==0){
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
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          center:true
          })          
        })
         $('.el-message-box').css({
         'width':'90%',
         'height':'130px'
       }) 

      },
      choiceness(){
        var HTTP = axios.create({ 
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/choicelist", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId
       }))
    .then(res => {
      var sDetail=[]
      var data=res.data
      if(data.code==0){
      
      this.schoolDetailList=data.data.schoolDetailList
      this.schoolDetailString=JSON.stringify(data.data.schoolDetailList)
      $.each(this.schoolDetailList,function(s,slem){
       if(slem.status!=0){
       sDetail.push(slem)

       }
      })
      }
    //  console.log(data)
      this.schoolDetailList=sDetail
     // console.log(data.data.schoolDetailList)
    //  console.log(sDetail)
      
    })
    .catch(error => {
      console.log(error)
    })
      },
     choicenfun(){
       this.$store.commit('setAcropperTop',$('.el-main').scrollTop())
      this.choiceness()
      this.saveHome(1)
     

      
     },
     communication(){
       this.$store.commit('setAcropperTop',$('.el-main').scrollTop())
       this.schoolDetailList=[]
       this.saveHome(2)
       
     },
     choicefun(){
      this.dialogVisible=true 
      this.addicon=false
      this.addmoudle=false
      this.cullice=true
      this.intercalatedagle=0
      this.$nextTick(()=>{
        $('.el-dialog__title').html('添加精选模块')
     // alert($('.el-dialog__body').height())
      $('.el-dialog').height($('.el-dialog__body').height()+130) 
     $('.pitchanImg').each(function(p,plem){
     $(plem).unbind()
     $(plem).on('click',function(){
     //  alert($('.pitchanImg').length-$('.pitchanImg').find('.untick').length)
       
         
       if($(this).find('.checkeImg').hasClass('untick')){
         if($('.pitchanImg').find('.untick').length>1){
      $(this).find('.checkeImg').removeClass('untick')
       }
       }else{
         $(this).find('.checkeImg').addClass('untick')
       }
       
     })
     })
      })
     
     },
     saveHome(content){
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/saveHomePageType", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId,
      'content':content
       }))
       .then(res => {
      var data=res.data
      if(data.code==0){
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
     checkinlist(){
      
       if(this.checka){
      this.status.banner=1
       }else{
      this.status.banner=0
       }
       if(this.checkb){
       this.status.ico=1
       }else{
       this.status.ico=0
       }
       console.log(JSON.stringify( this.status))
   var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/saveHomeStatus", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId,
      'content':JSON.stringify( this.status)
       }))
    .then(res => {
      var data=res.data
      if(data.code==0){
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
     modu(name){
      //  alert(name)
      // console.log(JSON.parse(this.schoolDetailString))
      this.setAcropperTop()
      this.$router.push({
        name:'modulecustoman',
        params:{
          name:name,
          choiceList:this.schoolDetailString,
          val:this.input
        }
      })
      
     },
    choiceclose:function(id){
      var that = this 
      var bullfun=JSON.parse(JSON.stringify(this.cullfun))
   
      this.$confirm('是否删除该菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
         console.log(id)
        
         var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
    
      HTTP.post("/appconsole/index/displayChoice", Qs.stringify({ 
      'id':id
       }))
    .then(res => {
      var data=res.data
      if(data.code==0){
          $('.modulesarm').each(function(m,rlam){
        if($(rlam).attr('byId')==id){
          
         $(rlam).remove()
         if($('.modulesarm').length<6){
         that.concentration=true
         $('.quantum').html($('.modulesarm').length)
       
         $('.modulesarm').each(function(n,rlan){
        //   console.log(rlan)
         $.each(bullfun,function(p,plem){
          if($(rlan).attr('name')==p){
            console.log(p)
           delete bullfun[p]
          }
         })
         
         })
        that.bullfun=bullfun
         }
        }
        })
        let schoolDetailList=JSON.parse(JSON.stringify(this.schoolDetailList))
        let schoolDetailString=JSON.parse(this.schoolDetailString)
      /*  
     schoolDetailList= $.grep(schoolDetailList,function(n,i){
       return n.id != id
        })
     */
      this.$store.commit('setAcropperTop',$('.el-main').scrollTop())
      this.$router.push({
          name: 'atowone',
          params: {
            stationId:6,
            name:'acropper'
            }
        })
       $.each(schoolDetailString,function(s,slem){
        if(slem.id==id){
         slem.status=0
        }
       })
    //   alert(schoolDetailList.length)

   //   this.bbn=JSON.parse(JSON.stringify(schoolDetailList))
      
      this.schoolDetailString=JSON.stringify(schoolDetailString)
      this.modulesarmove()
      // 强制渲染start
    //  this.$forceUpdate()
      // 强制渲染end
        console.log('删除后')
        console.log(schoolDetailList)
        console.log(schoolDetailString)
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
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          center:true
          })          
        })
       $('.el-message-box').css({
         'width':'90%',
         'height':'130px'
       }) 
    },
    choiceList:function(schoolDetailString,type,num){
     var that=this
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
    if(this.setStatus.length==4){
     if(type==1){
       
      HTTP.post("/schooldetail/appChoicelist", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId,
      'name':this.intercalatedagle,
      'type':type,
      'keyWord':''
       }))
      .then(res => {
      var data=res.data
     if(data.code==0){
       var schoolDetailList=JSON.parse(JSON.stringify(this.schoolDetailList)) 
     $.each(schoolDetailList,function(s,slem){
     if(slem.name==that.intercalatedagle){
      slem.content=[]
      slem.note=that.setStatus[0]
      slem.contentType.num=that.setStatus[1]
      slem.contentType.type=that.setStatus[2] 
      $.each(data.data.list,function(b,blem){
       slem.content.push(blem)
      })
     }
     })
     
      this.saveChon(schoolDetailList)
     }
  
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
    
     }else{
       let character
       if(num==4){
        character='a'
       }else if(num==5){
        character='b'
       }else{
        character='c'
       }
       this.modu(character+this.intercalatedagle)
     }
    }else{

    if(type!=3){
    //  alert(type)
   if(type==4){
  // alert(0)
   this.saveChon(schoolDetailString)  
   }else{
 //  alert(this.intercalatedagle)
  //   console.log(schoolDetailString)
     let schoolDetailList=JSON.parse(JSON.stringify(that.schoolDetailList))
   //  console.log(num)
   //  console.log(that.input)
     
    $.each(schoolDetailList,function(s,slem){
      if(slem.name==that.intercalatedagle){
      slem.contentType.num=num
      slem.note=that.input
      }
    })
     console.log(schoolDetailList)
     console.log(schoolDetailString)
    that.schoolDetailList = schoolDetailList
    
   this.schoolDetailString=JSON.stringify(schoolDetailString)  
 //  this.$forceUpdate 
    this.saveChon(schoolDetailString,true) 
   }
  
   
    }
 
    }

     
  


    },
    saveChon:function(schoolDetailString,move){
   // alert(this.setStatus.length)
        var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })  
    HTTP.post("/appconsole/index/saveChoiceList", Qs.stringify({ 
      'choiceList':JSON.stringify(schoolDetailString) 
       }))
      .then(res => {
      var data=res.data
       if(data.code==0){
        
          this.$store.commit('setAcropperTop',0)
          this.$message({
          message: data.message,
          type: 'success',
          center:true
        }) 
         this.tabulatinstart()
        if(!move){
        this.setAcropperTop()
       this.$router.push({
          name: 'atowone',
          params: {
            stationId:6,
            name:'acropper'
            }
        })
        }
        
        
        
    
       }
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
    },
    saveIco:function(icolist,a){
     var  loading
     a=false
      if(a){
      loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
      HTTP.post("/appconsole/index/saveIco", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId,
      'icoList':JSON.stringify(icolist)
       }))
    .then(res => {
      var data=res.data
      if(data.code==0){
        
        this.$message({
            type: 'success',
            message: data.message,
          center:true
          })
          if(a){
         loading.close()   
       this.$router.push({
          name: 'atowone',
          params: {
            stationId:6,
            name:'acropper'
            }
        }) 
          }
          
      }
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
    },
    switchcard:function(index,name,type){
   if(type==2){
    this.modu(name+','+index)
   }
   
    
    },
    setmove:function(name,type,inum){
     var schoolDetailList=JSON.parse(JSON.stringify(this.schoolDetailList)) 
     var schoolDetailString=JSON.parse(this.schoolDetailString)
     var that=this
     var m=true
     var sortCode=[]
     // elcolor
      $.each(schoolDetailList,function(s,slem){
        sortCode.push(slem.sortCode)
  
     })
    if(type==1){
     
       upGo(schoolDetailList,inum) 
      
   
    }else{
      
      downGo(schoolDetailList,inum)     
      
  
    }
     
     function upGo(fieldData,index){

    if(index!=0){

        fieldData[index] = fieldData.splice(index-1, 1, fieldData[index])[0];

    }else{
       m=false
       that.$message({
          showClose: true,
          message: '无法再上移',
          type: 'error',
          center:true
        })
       

    }

  }
  function downGo(fieldData,index) {

    if(index!=fieldData.length-1){

        fieldData[index] = fieldData.splice(index+1, 1, fieldData[index])[0];

    }else{
      m=false
      
       that.$message({
          showClose: true,
          message: '无法再下移',
          type: 'error',
          center:true
        })
    }

}
if(m){
console.log(sortCode)
$.each(sortCode,function(s,slem){
schoolDetailList[s].sortCode=slem
})

$.each(schoolDetailList,function(b,blem){
schoolDetailString.forEach(list=>{
if(list.name==blem.name){

list.sortCode=blem.sortCode


}
})
})
   this.schoolDetailList=schoolDetailList
    this.schoolDetailString=JSON.stringify(schoolDetailString)
  this.saveChon(schoolDetailList,true)
 
}
    
  
//  console.log(schoolDetailString)   
     
    
     
    // console.log(schoolDetailString)
   //  console.log(schoolDetailList)
     
  
  

    },
    datadragEnd:function(){
      // 拖拽 saveChon
     let schoolDetailList=JSON.parse(JSON.stringify(this.schoolDetailList)) 
     let schoolDetailString=JSON.parse(this.schoolDetailString)
      
      $.each(schoolDetailList,function(s,slem){
       $.each(schoolDetailString,function(b,blem){
        if(slem.name==blem.name){
          blem.content=slem.content
        }
       })
      })
      
       this.schoolDetailString=JSON.stringify(schoolDetailString)
        this.saveChon(schoolDetailString,true)
    },
    modulesarmove(){
      $('.modulesarm:visible').each(function(i,elem){ 
   
   if(i==0){
  $(elem).find('.amovebtn').eq(1).addClass('elcolor')
   }else if(i==$('.modulesarm:visible').length-1){
  $(elem).find('.amovebtn').eq(0).addClass('elcolor')
   }


   })
    },
    setAcropperTop(){
     this.$store.commit('setAcropperTop',$('.el-main').scrollTop())
    },
    icodatadrag(){
       let icolist=JSON.parse(JSON.stringify(this.icolist))
       this.$store.commit('setAcropperTop',$('.el-main').scrollTop())
            // then.saveIco()
            $('.carteicon').each(function(i,elem){
            let name=$(elem).find('img').attr('name')
            let sortcode= i+1
             console.log(sortcode)
            console.log(typeof sortcode)
            
            $.each(icolist,function(c,clem){
            if(clem.name==name){
             clem.sortcode=sortcode
            }
            })
            })
            
            console.log(icolist)
           this.saveIco(icolist,true)
          
    },
   tabulatinstart(){
    
  // alert(1)
 $('.substance').each(function(i,elem){
 let type=$(elem).attr('type')
 console.log(type)
 if(type==2){
 $(elem).find('.tabulashade').hide()
 }else{
   $(elem).find('.tabulashade').show()
 }
 })


   }

    }
    
  }


</script>
