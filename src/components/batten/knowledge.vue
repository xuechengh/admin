<template>
<div>
<el-row class="el-title" >
  <el-col :span="20" style="text-align:left;text-indent: 1em;">
  <div class="grid-content bg-purple-dark ">
  标签管理(显示为橙色,未选中为灰色)
  </div>
  </el-col>
  <el-col :span="4">
  <div class="grid-content bg-purple-dark ">
  <el-button v-show="false" type="primary" >全部</el-button> 
  </div>
  </el-col>
</el-row>
  <el-row class="laberlist" style="margin-top:1px; text-indent: 0em;">     
  <el-col  :span="6" :key="index"  v-for="(item,index) in laberlist">
  <div class="grid-content bg-purple">
   <button style="border-radius:13px;" v-if="item.status==1"  class=" el-orange"  @click="laberfun(item.id,index)" >{{ item.name }}</button>
   <button style="border-radius:13px;" v-else class=""  @click="laberfun(item.id,index)" >{{ item.name }}</button>
  </div>
  </el-col>
  </el-row>
</div>
</template>
<style scoped>
@import '../../assets/css/knowledge.css'
</style>
<script>
import axios from 'axios'
 import Qs from 'qs'
 // jquery
 export default {
    data: () => ({
      laberlist:[]
    }),
  props:['gridshow','id'],
    created () {
    document.title='标签管理'
   var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
     HTTP.post("/appconsole/resource/laberList", Qs.stringify({ 'id': this.id }))
    .then(res => {
       var data=res.data 
      if(!parseInt(data.code)){
      this.laberlist = data.data.laberlist
      }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
  },
  methods:{
   laberfun:function(name,index){
     let status
    let obj = $('.laberlist').children().eq(index).find('button')
    if(obj.hasClass('el-orange')){
     obj.removeClass('el-orange')
     status=0
    }else{
      obj.addClass('el-orange')
      status=1
    }
    //  (this.$store.state.schoolId)
    //  (name)
    //  (status)
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/resource/hideLaber",Qs.stringify({
       'schoolId':this.$store.state.schoolId,
       'id': name,
       'status':status
        }))
    .then(res => {
       var data=res.data 
      if(!parseInt(data.code)){
     
      }
      //  (data)
    })
    .catch(error => {
      //  (error)
    })
   }
  },
  destroyed:function(){
 
    this.$emit('update:gridshow',true)
    
  }
}
</script>

