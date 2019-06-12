<template>
<div>
<router-view name="batten" :cschoolId="cschoolId" :cName="cName" @getSchoolId="getSchoolId" @getRelease="getRelease" @getHide="getHide" @getLabertype="getVal" @getLaber="getLaber" @getSearchvalue="getSearchvalue"></router-view> 
<router-view name="trainee" :bschoolId="bschoolId" :release="release" :hide="hide" :labertype="labertype" :laber="laber" :nameLike="nameLike"></router-view>   
</div>
</template>  
<script> 
import '@/assets/js/courseware.js' 
// jquery       
export default {
    data:() => ({
      labertype: '',
      laber: '',
      nameLike: '', 
      release: '',
      hide: 0,
      bschoolId:0,
    cschoolId:0,
    cName:'',
    name:{
        '9':3,
        '10':4,
        '11':2
        }
    }),
    created(){
      var that=this
       $(window).unbind('popstate')
        $('#app').removeAttr('style')
     this.$nextTick(()=>{ 
      $.popstate=function(){
        $(window).unbind('popstate')
 $(window).on('popstate', function () {
 // alert(1)
  $('#app').css({
    'width':'100%',
    'height':'100%',
    'background':'rgb(242,242,242)',
    'position':'fixed'
  })
  that.$router.push({
    name:'index'
  })
  
 }) 
 }
 // $.popstate() 
    })
    },
    methods:{
      getVal(val){
    this.labertype=val
      },
      getLaber(val){
        this.laber=val
      },
      getSearchvalue(val){
      this.nameLike=val
      },
      getHide(val){
       this.hide=val
      },
      getRelease(val){
       this.release=val
      },
      getSchoolId(val){
       this.bschoolId=val
      }  
    }
}
</script>