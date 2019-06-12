<template>
<div>
<div class="coursewareScreening" v-show="search">
<el-row class="elRow" style="z-index:5;">
  <el-col class="elCol" :span="6">
  <div class="grid-content bg-purple ">
 <el-button type="primary" icon="el-icon-search"  @click="search = !search">搜索</el-button>
  </div>
 </el-col>
  <el-col class="elCol" :span="12">
  <div class="grid-content bg-purple">
  <span style="font-size:14px;">已选({{inum}})</span>
  </div>
  </el-col> 
  <el-col class="elCol" :span="6">
  <div class="grid-content bg-purple">
  <el-button @click="courseSure(1)" type="success" >确定</el-button>
  </div>
  </el-col>
</el-row> 
</div>

<div v-show="!search" class="coursewareScreening">
<el-row class="elRow" style="z-index:5;">
 <el-col class="elCol" :span="1" >
  <div class="grid-content bg-purple">
  <span class="el-icon-arrow-left" @click="ascreenblock" ></span>
  </div>
  </el-col>

  <el-col :span="19" class="inputbox elCol">
  <div class="grid-content bg-purple">
 <el-input
   type="text"
    placeholder="搜索..."
    v-model="searchvalue"
   >  
  </el-input>
<el-button class="el-icon-error iconClose">
</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="4">
  <div class="grid-content bg-purple">
  <el-button type="primary" @click="ascreenedsearch">搜索</el-button>
  </div>
  </el-col>
</el-row> 
</div>

<div class="publisher" id="publisher" v-show="search">
<div class="publisherSort"   :key="i" v-for="(blem,i) in exceptIdList">
<el-row  class="alphatet elRow" v-if='blem!="#"' :id="blem" >
  <el-col class="elCol" :span="24"><div class="grid-content bg-purple-dark alphatet" >{{ blem }}</div></el-col>
</el-row>
<el-row  class="alphatet elRow" v-else id="sign" >
  <el-col :span="24"><div class="grid-content bg-purple-dark alphatet" >{{ blem }}</div></el-col>
</el-row>
<div class="publisherCentent" :index="index" :key="index" @click="choiceCheck(index,1)" v-if="blem==item.alphabet" v-for="(item,index) in  letter" >
<el-row class="publisherList elRow"  >
  <el-col :span="6"  class="el-img-header elCol" >
  <div class="grid-content bg-purple">
  <img class="el-img1" v-if="item.photoUrl" :src="item.photoUrl" />
  <img class="el-img1" v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png"  />
  </div>
  </el-col>
  <el-col :span="18"  class="el-img-header elCol" >
  <div class="grid-content bg-purple el-title-parens">
   <span class="el-title-pub">{{item.name}}</span>
    <div class="el-title-check" :byId="item.id"></div>
   <div class="el-title-pub" v-show="false" style="font-size:12px;">现在没有介绍，看钱大师的心情</div>
  </div>
  </el-col>
</el-row>
</div>
</div>
</div>

<div class="publisher" id="publishem" v-show="!search">
<div class="publisherCentent" :index="index" :key="index" @click="choiceCheck(index,2)"  v-for="(item,index) in  newlist" >
<el-row class="publisherList elRow"  >
  <el-col :span="6"  class="el-img-header elCol" >
  <div class="grid-content bg-purple">
  <img class="el-img1" v-if="item.photoUrl" :src="item.photoUrl" />
  <img class="el-img1" v-else src="https://wied-oss.oss-cn-hangzhou.aliyuncs.com/image/tx.png"  />
  </div>
  </el-col>
  <el-col :span="18"  class="el-img-header elCol" >
  <div class="grid-content bg-purple el-title-parens">
   <span class="el-title-pub">{{item.name}}</span>
    <div class="el-title-check" :byId="item.id"></div>
   <div class="el-title-pub" v-show="false" style="font-size:12px;">现在没有介绍，看钱大师的心情</div>
  </div>
  </el-col>
</el-row>
</div>
</div>

<div class="rightLetter" v-show="search">
<span :key="l" v-for="(lem,l) in lofty">
<router-link :to="{path: '#'+lem}">
{{lem}}
</router-link>
</span>
</div>
 
 <transition name="fade" mode="out-in">
 <div class="ascreenBtn" v-show="anewsearch">
 <el-row class="elRow">
  <el-col :span="12" class="ascreenSure elCol">
  <div class="grid-content bg-purple">
  <span style="color:#000;text-align:right;font-size:8px;">
     <el-button @click="choiceCheck()" >全选</el-button>
    </span>
  </div>
  </el-col>
  <el-col :span="12" class="ascreenSure elCol">
  <div class="grid-content bg-purple-light">
   <span style="color:#000;text-align:right;font-size:8px;">
    <el-button @click="courseSure(2)"  type="primary">确定</el-button>
    </span>
  </div>
  </el-col>
</el-row>
 </div>
</transition>

</div>
</template>
<style scoped>
@import 'assets/css/courseware.css'
</style>
<script>
 import axios from 'axios'
 import Qs from 'qs'
 // jquery
 import {strChineseFirstPY,oMultiDiff,loftyAlphabet,letterAndNumbers} from '@/assets/js/py'
 import TWEEN from 'tween.js'
 
 export default {
     data: () => ({
     search: true,
     anewsearch: false,
     list:[],
     letter:[],
     exceptIdList:[],
     lofty:[],
     searchvalue:'',
     newlist:[],
     inum:0
     }),
     beforeRouteUpdate(to,from,next){
       //  console.log(to)
           this.animate(to)
        },
     watch:{
     exceptIdList(){
       
          this.$nextTick(function(){
        $('.publisherCentent:odd').each(function(i,elem){
         $(elem).children().css('background','#eee')
         })  
          })
     
     },
     newlist(){
       this.$nextTick(function(){
        $('#publishem').find('.publisherCentent:odd').each(function(i,elem){
         $(elem).children().css('background','#eee')
         })  
      })
     }
     },
     created () {
       /*
       //  (this.makePy('系统超级管理员不服来辩')[0].substr(0, 1))
       //  (this.makePy('TE')[0].substr(0, 1))
       const character=this.makePy('eE')[0].substr(0, 1)
       if(!/[A-Z]/.test(character)){
            //  (character.toUpperCase())
       }
       */
       document.title="屏蔽发布者"
       this.lofty=loftyAlphabet
        var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
    HTTP.post("/appconsole/resource/userList", Qs.stringify({ 'namelike': '' }))
    .then(res => {
      var data=res.data
      if(!parseInt(data.code)){
      this.list=data.data.list
      var that=this
      let letterArr=[]
      let newarr=[]
      let listArray=[]
      let poundSign=false
      $.each(data.data.list,function(i,Val){
       let val = Val.name
       let character=null
     // //  (that.makePy(val)[0].substr(0, 1))
      character = that.makePy(val)[0].substr(0, 1)
       if(!/[A-Z]/.test(character)){
           character = '#'
       }
       let listh={
         'alphabet':character,
         'name': val,
         'description': Val.description,
         'photoUrl': Val.photoUrl,
         'id': Val.id
       }
       letterArr.push(character) 
       listArray.push(listh)
      })
      this.letter = listArray
      //  (listArray)
      //  (letterArr)
     for(var i=0;i<letterArr.length;i++) {
   　　var items=letterArr[i]
   　　// 判断元素是否存在于newarr中，如果不存在则插入到new_arr的最后
   　　if($.inArray(items,newarr)==-1) {
     var reg= /^[A-Za-z]+$/
         if(reg.test(items)){
      　newarr.push(items)
         }else{
          poundSign=true
         }
   　　　
   　　}
     }
     newarr = newarr.sort()
     if(poundSign){
      newarr.push('#')
     }
     //  (newarr)
     this.exceptIdList = newarr
    
      }
       //  (data)
    })
    .catch(error => {
      //  (error)
    })
  },
  methods:{
    makePy(str){
       if(typeof(str) != "string")    
        throw new Error(-1,"函数makePy需要字符串类型参数!");    
        var arrResult = new Array();   
        // 将字符串转码后转为数组  
        for(var i=0,len=str.length;i<len;i++)  
        {    
            var ch = str.charAt(i);    
            arrResult.push(this.checkCh(ch));    
        }    
        return this.mkRslt(arrResult);    
    },
   checkCh(ch){
     var uni = ch.charCodeAt(0);    
    // 如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数    
    if(uni > 40869 || uni < 19968)    
    return ch; // dealWithOthers(ch);    
    // 检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母    
    return (oMultiDiff[uni]?oMultiDiff[uni]:(strChineseFirstPY.charAt(uni-19968)));  
   },
   mkRslt(arr){
      var arrRslt = [""];    
    for(var i=0,len=arr.length;i<len;i++)  
    {    
        var str = arr[i];    
        var strlen = str.length;    
        if(strlen == 1)  
        {    
            for(var k=0;k<arrRslt.length;k++)  
            {    
                arrRslt[k] += str;    
            }    
        }  
        else  
        {    
            var tmpArr = arrRslt.slice(0);    
            arrRslt = [];    
            for(k=0;k<strlen;k++)  
            {    
                // 复制一个相同的arrRslt    
                var tmp = tmpArr.slice(0);    
                // 把当前字符str[k]添加到每个元素末尾    
                for(var j=0;j<tmp.length;j++)  
                {    
                    tmp[j] += str.charAt(k);    
                }    
                // 把复制并修改后的数组连接到arrRslt上    
                arrRslt = arrRslt.concat(tmp);    
            }    
        }    
    }    
    return arrRslt; 
   },
   animate(to){
     let bret=to.hash
     let interimExceptIdList=JSON.parse(JSON.stringify(this.exceptIdList))
     let soloBret=bret.substring(1,bret.length)
     let result=$.inArray(soloBret,interimExceptIdList)
     let sum = letterAndNumbers[soloBret]
     let ber= ''
    // //  (interimExceptIdList)
     // //  (soloBret)
     // //  (result)
    //  //  (sum)
      if(result!=-1){
    if(to.hash=='##'){
     bret='#sign'
      }
      }else{
        let isum=sum-1
        let sm=null
        ber=loftyAlphabet[isum]
     //  //  (loftyAlphabet[isum])
     //  //  ($.inArray(ber,interimExceptIdList))
       
       if(letterAndNumbers[ber]>letterAndNumbers[interimExceptIdList[0]]){
        
         sm=true
       }else{
         sm=false
       }
       while($.inArray(ber,interimExceptIdList)==-1){
         if(sm){
          isum--
          if(isum==-2){
            break
          }else{
            ber=loftyAlphabet[isum]
          } 
         }else{
           isum++
            if(isum>26){
            break
          }else{
            ber=loftyAlphabet[isum]
          } 
         }
         
      //   //  ('还在循环')

       }
     // //  ('完成')
     // //  (ber)
     if(ber){
     bret='#'+ber
     }
     
      }
      
      
      function animateFunc(time){ 
          
                    requestAnimationFrame(animateFunc)
                    TWEEN.update(time)
                }
     if($(bret).length){  
 let ascrollTop = $(window).scrollTop()
 
 let  h=$(bret).get(0).offsetTop-42
// //  (ascrollTop)
// //  (h)
     animateFunc()
     new TWEEN.Tween({
            number:ascrollTop
      }).to({
          number:h 
      },500).onUpdate(function(){ 
// console.log(this.number.toFixed(0)) 
        
         $(window).scrollTop(this.number.toFixed(0))
     }).start()

     }
 
   },
   choiceCheck:function(i,lem){
     let that=this
     let $elem
    // //  (i)
     lem==1?$elem=$('#publisher'):$elem=$('#publishem')
  $elem.find('.publisherCentent').each(function(l,elem){
    if(lem){
    if($(elem).attr('index')==i){
      let olem=$(elem).find('.el-title-check')
      olem.hasClass('el-icon-check')?olem.removeClass('el-icon-check'):olem.addClass('el-icon-check')
      if(that.search){
    //    //  ('计数了')
     //   //  ($('.publisherCentent').find('.el-icon-check').length)
     that.inum=$('#publisher').find('.el-icon-check').length
      }
    }  
     }else{
      $(elem).find('.el-title-check').addClass('el-icon-check')

     } 
   })

   },
   courseSure:function(lem){
    // //  ('已确定')
    let that=this
    let $elem
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
     lem==1?$elem=$('#publisher'):$elem=$('#publishem')
   $elem.find('.el-icon-check').each(function(l,elem){
    let id=parseInt($(elem).attr('byId'))
    HTTP.post("/appconsole/resource/hideUser", Qs.stringify({
       'schoolId': that.$store.state.schoolId,
       'id': id,
       'status': 0
       }))
    .then(res => {
      var data=res.data
      if(!parseInt(data.code)){
        that.$nextTick(function () {
          that.$router.replace({  
           path: '/asourceSetting' 
           })
        })  
      }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })


   })


   },
   ascreenedsearch(){
    
     if(this.searchvalue){
       
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
     })
    HTTP.post("/appconsole/resource/userList", Qs.stringify({ 'namelike': this.searchvalue }))
    .then(res => {
     var data=res.data
      if(!parseInt(data.code)){
         this.newlist=data.data.list
      if(this.newlist.length){
     this.anewsearch=true
     }else{
      this.anewsearch=false
     }
      }
      //  (this.newlist.length)

    })
    .catch(error => {
      //  (error)
    })

     }
   },
   ascreenblock(){
     this.search=!this.search
     this.anewsearch=false
     this.newlist=[]
     this.searchvalue=''
   }

  }
 }
</script>