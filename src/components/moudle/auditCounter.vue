<template>
<div>

  <el-row class="laberlist" style="margin-top:1px; text-indent: 0em;">

  <el-col :span="6" :key="index"  v-for="(item,index) in list" >
  <div class="grid-content bg-purple">
   <button style="border-radius:13px;" :blockId="item.blockId"  @click="blockName(index,item.blockId)" class=" el-list el-orange" >{{ item.blockName }}</button>
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
 data() {
      return {
       filterList:[],
       list:[],
       counterShowArray:[],
       pitchOn:[],
       normalCheck:0
      }
 },
 watch:{
   filterList(){
      var that=this
     console.log(this.filterList)
     this.$nextTick(()=>{
      $.each(this.list,function(l,lem){  
      $.each(that.filterList,function(f,flem){
       if(lem.blockId==flem.businessId){
        $('.el-list').eq(l).removeClass('el-orange')
        that.counterShowArray.push(flem.businessId)
       }
      })
     }) 
     })
     console.log(that.counterShowArray)
   },
   checkAll(){
     var that=this
     //  ('点全部')
   //  //  (this.checkAll)
      if(this.checkAll==1){
       this.$nextTick(()=>{
         let k
         that.pitchOn=[]
         $.each(this.list,function(l,lem){
           k=false
            $('.el-plain').eq(l).addClass('el-orange')
            $.each(that.counterShowArray,function(c,clem){
              if(lem.blockId==clem){
                k=true
            // that.pitchOn.push(lem.blockId)
              }
            })
            if(k){
             that.pitchOn.push(lem.blockId)
            }
         })
         //  (that.counterShowArray)
         //  (that.pitchOn)
         that.$emit('counterShowArray',that.counterShowArray)
         that.$emit('pitchOn',that.pitchOn)
       })
      }
   }
 },
 created(){
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/forum/blockList", Qs.stringify({
       'schoolId': this.$store.state.schoolId
       }))
    .then(res => {  
        var data=res.data
      var that=this
       console.log(data)
      if(!parseInt(data.code)){
       
       this.filterList=data.data.filterList
       this.list=data.data.list

      }
    })
   .catch(error => {

    })
},
methods:{
   blockName:function(g,id){
       var that=this
       var clam=true
    $('.el-list').each(function(i,elem){
      if(i==g){
      $(elem).hasClass('el-orange')?($(elem).removeClass('el-orange'),that.$emit('normalCheck',that.normalCheck)):$(elem).addClass('el-orange')
      
      $.each(that.pitchOn,function(c,clem){
       if(clem==id){
     that.pitchOn=$.grep(that.pitchOn,function(a){
       return a!=id
      })
      clam=false
       }
      })
      if(clam){
      that.pitchOn.push(id) 
      }
      
      //  (that.counterShowArray)
      //  (that.pitchOn)
      that.$emit('counterShowArray',that.counterShowArray)
      that.$emit('pitchOn',that.pitchOn)
      } 
    })
   } 
}
}
</script>