<template>
<div>
<div>
  <div v-show="hindeOut"> 
    <el-row :gutter="20" class="el-pans">
  <el-col :span="5" class="el-pan el-r"><div class="grid-content bg-purple">{{ version }}</div></el-col>
  <el-col :span="10" class="el-pan"><div class="grid-content bg-purple">{{ time }}</div></el-col>
  <el-col :span="5" class="el-pan el-r el-a"><div class="grid-content bg-purple el-oranger">{{ setmeal}}</div></el-col>
  <el-col :span="4" class="el-pan el-l el-a"><div class="grid-content bg-purple el-yellow">{{ renew }}</div></el-col>
</el-row>
</div>
<div>
<el-row :gutter="20" class="el-tum">
  <el-col :span="8"><div class="grid-content bg-purple "><router-link class="el-purple"  :to="{name:'echartsContent',params:{activeType:2}}">{{ studentCount }}</router-link></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple "><router-link class="el-green" :to="{name:'echartsContent',params:{activeType:0,schoolId:schoolId}}">{{ dailyActive }}</router-link></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple "><router-link class="el-oranger" :to="{name:'echartsContent',params:{activeType:1,schoolId:schoolId}}">{{ monthActive }}</router-link></div></el-col>
</el-row>
 
  <el-row :gutter="20" class="el-lab" style="line-height:15px;"> 
  <el-col :span="8"><div class="grid-content bg-purple">注册用户</div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">日活跃度</div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">月活跃度</div></el-col>
</el-row>
</div>
</div>

</div>  
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import {mapGetters} from 'vuex'
  export default{
 name: 'master',
  data () {
    return {
      msg: '管理控制台',
      back: '上一步',
      version: '大企业版',
      time: '2019年5月1日到期',
      setmeal: '更换套餐',
      renew: '续费',
      studentCount: 0,
      dailyActive: 0,
      monthActive: 0,
      hindeOut:false,
      schoolId:0
    }
  },
 mounted(){
    console.log(this.$store.state.schoolId)
    console.log(this.$store.state.studentCount)
      this.studentCount= this.$store.state.studentCount
      this.dailyActive = this.$store.state.dailyActive
      this.monthActive = this.$store.state.monthActive
 
 },
 computed:{
   ...mapGetters([
     'getStudentCount',
     'getDailyActive',
     'getMonthActive'
   ])
 },
 watch:{
   getStudentCount: function(li){
      this.studentCount=li
   },
   getDailyActive: function(li){
      this.dailyActive=li
   },
   getMonthActive: function(li){
     this.monthActive=li
   }
 }
  }
  </script>