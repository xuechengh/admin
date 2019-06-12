<template>
<div>
<el-row class="elRow">
  <el-col :span="11" class="elCol">
  <div class="grid-content bg-purple">
  <el-button class="auditBtn" @click="warninga(0)" type="warning" style="font-size:12px;">学生发帖需审核才显示</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="13">
  <div class="grid-content bg-purple-light">
  <el-button class="auditBtn" @click="warninga(1)" style="font-size:12px;">不审核，所有人直接发帖展示</el-button>
  </div>
  </el-col>
</el-row>
<div class="reviewIntroduction">
<div class="el-review" >
<el-row class="el-title-gray elRow">
  <el-col :span="24" class="elCol"><div class="grid-content bg-purple-dark">优点</div></el-col>
</el-row> 
<span class="el-content-ear">
<el-row class="elRow">
  <el-col :span="24" class="elCol">
  <div class="grid-content bg-purple-dark ear-string">
  {{ advantage }}
  </div>
  </el-col>
</el-row>
</span>
</div>

<div class="el-review" >
<el-row class="el-title-gray elRow">
  <el-col class="elCol" :span="24"><div class="grid-content bg-purple-dark">弊端</div></el-col>
</el-row> 
<span class="el-content-ear">
<el-row class="elRow">
  <el-col :span="24" class="elCol">
  <div class="grid-content bg-purple-dark ear-string">
  {{ abuse }}
  </div>
  </el-col>
</el-row>
</span>
</div>

<div class="el-review" >
<el-row class="el-title-gray elRow">
  <el-col :span="24" class="elCol"><div class="grid-content bg-purple-dark">可能的风险</div></el-col>
</el-row> 
<span class="el-content-ear">
<el-row class="elRow">
  <el-col :span="24" class="elCol">
  <div class="grid-content bg-purple-dark ear-string">
  {{ danger }}
  </div>
  </el-col>
</el-row>
</span>
</div>

<div class="el-review" >
<el-row class="el-title-gray elRow">
  <el-col :span="24" class="elCol"><div class="grid-content bg-purple-dark">建议</div></el-col>
</el-row> 
<span class="el-content-ear">
<el-row class="elRow">
  <el-col :span="24" class="elCol">
  <div class="grid-content bg-purple-dark ear-string">
  {{ suggest }}
  </div>
  </el-col>
</el-row>
</span>
</div>

</div>

</div>
</template>
<script>
 import axios from 'axios'
 import Qs from 'qs'
 // jquery
export default {
data() {
      return {
     bar:[
      {
    advantage:'通过发帖的前置审核，可以完全杜绝负面、色情、违法以及竞争对手广告帖子内容的帖子在学习圈中。',
    abuse:'牺牲发帖效率，所有帖子发送成后需要学习圈管理员审核后才展示在学习圈内。',
    danger:`由于需要学习圈管理员审核后帖子才展示在学习圈，可能会降低学生发帖的活力，并可能会因为学习圈管理员审核
不及时导致发帖的学生长时间长时间看不到自己发的帖子
而失去发帖的动力。`,
     suggest:`培训机构的app建议对学生发帖进行审核，并配备足够的学
习圈管理员，及时审核学生的发帖，以消弱发帖审核机制
造成的效率影响。`
      },
      {
      advantage:`效率高，所有帖子发送成后就展示在学习圈内，所有注册用户都可立即看到帖子内容。`,
      abuse:`虽然学习圈管理员可以删除帖子，但仍然有可能会出现负面、色情、违法以及竞争对手广告帖子内容的帖子在学习圈中。`,
      danger:`由于是发出后再删帖，可能会有负面、色情、违法内容的帖子出现在学习圈中，并可能会因为学习圈管理员删帖不及时导致负面、色情、违法的帖子扩散出去。`,
      suggest:`平台类的app建议对发帖不做审核，并配备足够的学习圈管理员，高频率的检查、管理学习圈的帖子和回复内容。`    
      }   
     ],
     advantage: '',
     abuse: '',
     danger: '',
     suggest: '',
     status: 0
      }
      },
   watch:{
     status(){
         var that=this
     $('.auditBtn').each(function(i,elem){
        if(that.status==i){
            
        $(elem).addClass('el-button--warning')
        }else{
           
        $(elem).removeClass('el-button--warning')    
        }
    })   
     } 
    },
 created(){
 var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    HTTP.post("/appconsole/forum/auditingInfo", Qs.stringify({
       'schoolId': this.$store.state.schoolId
       }))
    .then(res => {
      var data=res.data
      var that=this
      //  (data)
      if(!parseInt(data.code)){
     //  //  ('成功')
      this.status=data.data.status
      }
    })
    .catch(error => {

    })
    this.$nextTick(()=>{
    let bar=JSON.parse(JSON.stringify(this.bar))
    this.advantage=bar[0].advantage
    this.abuse=bar[0].abuse
    this.danger=bar[0].danger
    this.suggest=bar[0].suggest
    })
},
methods:{
   warninga:function(g){
    let bar=JSON.parse(JSON.stringify(this.bar))
    this.advantage=bar[g].advantage
    this.abuse=bar[g].abuse
    this.danger=bar[g].danger
    this.suggest=bar[g].suggest  
    this.status=g
    //  (g)
     this.$emit('status',this.status)
   } 
}
}
</script>
<style scoped>
@import '../../assets/css/courseware.css'
</style>