<template> 
<div>
<simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper"  >
  <slot> 
<div class="modulecontent" :key="index" v-for="(item,index) in icoList">
<el-row class="el-content">
  <el-col :span="24" style="position:relative;">
  <div class="grid-content bg-purple">
  <div class="coursewareTableImg" style="position:absolute;top:0;left:10px;padding-top:8px;">
    <img class="el-img3" :src="item.content" >
   </div>
   <div style="padding:0 0 5px 80px;position:relative;">
  <div class="el-title el-title1 el-font-size el-color-51"  >
  <span>{{note[item.name]}}</span>
  <span style="margin-right:5px;position:absolute;top:0px;right:0;"><el-button style="height:20px;line-height:0px;padding:15px 12px;position:relative;" class="el-font-size1" type="primary" @click="upload(item.id,index)"><span class="customname"  style="font-size:10px;" >更换图标</span></el-button></span>
  </div>
  <div class="el-name " style="height:30px;" >
  <span class="el-name1"></span>
  </div>
  <div class="el-name el-font-size el-color-144 " style="font-size:12px;">
  <span v-if="item.name!=0">自定义名称:</span>&nbsp;&nbsp;<span class="notename" v-if="item.note!='undefined'">{{item.note}}</span><span class="notename" v-else-if="item.name!=0">无</span>
  
  <span style="margin-right:5px;position:absolute;bottom:6px;right:0;"><el-button v-if="item.name!=0" style="height:20px;line-height:0px;padding:15px 12px;position:relative;" class="el-font-size1" @click="open(item.name,item.id,item.note,index)"><span class="customnamea" v-if="item.note" style="font-size:10px;">修改名称</span><span class="customnamea" style="font-size:10px;" v-else>定义名称</span> </el-button></span>
  </div>
  </div>
  </div>
  </el-col> 
</el-row>
</div>

</slot>
</simple-cropper>
</div>
</template>
<style scoped>
@import 'assets/css/courseware.css'
</style>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import SimpleCropper from '@/components/cropper/index' 
  export default {
      data(){
      return {
        icoList: [] ,
        imgList: [],
        note:{
        '0':'更多',  
        '1':'官网',
        '2':'展厅',
        '3':'咨询',
        '4':'报名',
        '5':'在线课程',
        '6':'班级',
        '7':'直播',
        '8':'新闻',
        '9':'电子书',
        '10':'课件',
        '11':'视频',
        '12':'资讯',
        '13':'家校通',
        '14':'学习圈',
        '15':'公共课',
        '16':'内部资料'
        },
        inputValue: '111' ,
        icoId:'',
        customname:'',
         uploadParam: { 
          fileType: 'recruit', 
          // 其他上传参数
           uploadURL: this.$dataURL + 'uploadAction/qcloudImg',
          // 上传地址 
           scale: 4 
          // 相对手机屏幕放大的倍数: 4倍 
      },
      userImg: this.$dataURL + 'test.png' 
      }
      },
      watch:{
        imgList(){
        //  console.log(this.imgList[this.imgList.length-1].file)
         //   alert(this.imgList.length)
         
          if(this.imgList.length){
        
           this.uploadPicfile(this.imgList[this.imgList.length-1].file)
          }
          
        }
      },
    created(){
        var that=this
       var nbar=[]
       document.title='模块自定义管理'
       this.$store.commit('setProtionSize',1 / 1)
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
        if(cem.name!=0){
        nbar[parseInt(cem.name)-1]=cem
        }else{
         nbar[data.data.icoList.length-1]=cem  
        }
       
      })
      this.icoList=nbar
      console.log(this.icoList)
       console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
    },
    methods:{
        open:function(val,id,note,index){
            const h = this.$createElement
            
            this.$msgbox({
          title: '自定义 '+this.note[val]+' 名称',
          message: h('p', null, [
            h('input', null, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300)
              }, 400)
            } else {
              done()
            }
          }
        }).then(action => {
         
         var value=$('.el-message-box__message').find('input').val()
        // alert(value.length)
         console.log(value)
         console.log(id)
         if(value.length<=5){
          if(value.length!=0){
     var HTTP = axios.create({
      baseURL:this.$local.temporary()
      })
       HTTP.post("/appconsole/index/updateIco", Qs.stringify({ 'name': value,'id':id }))
    .then(res => {
      var data=res.data
     if(data.code == 0){
       
        if(value){
         // alert('修改:'+index)
         $('.notename').eq(index).html(value)   
         $('.customnamea').eq(index).html('修改名称')
        }else{
         // alert('定义:'+index)
          $('.notename').eq(index).html('无')   
         $('.customnamea').eq(index).html('定义名称')
        }
        
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
          }else{
            this.$message({
          message: '自定义名称不能为空',
          type: 'error',
          center: true
        }) 
          }
        
            
       }else{
        
       this.$message({
          message: '限制5个字以内',
          type: 'error',
          center: true
        })
       }  
        })
        this.$nextTick(()=>{
     $('.el-message-box').css({
       'width':'90%',
        'height':'150px'
     })
            
        
        $('.el-icon-close').hide()
        if($('.notename').eq(index).html()!='无'){
        //  alert($('.el-message-box__message').length)
         $('.el-message-box__message').find('input').addClass('el-input__inner').val($('.notename').eq(index).html()) 
        }else{
        
          $('.el-message-box__message').find('input').addClass('el-input__inner').val('') 
        }
          })
      
        
      },
      upload:function(id,index) { 
       this.icoId=id
       this.$refs['cropper'].upload()
       this.imgList=this.$refs['cropper'].imgList
       this.$nextTick(()=>{
         this.customname=$('.modulecontent').eq(index).find('.notename').html() 
       })
       
       
      
      
     },
     uploadHandle (data) {
     if (data.state === 'SUCCESS') {
       this.userImg = this.form.headImgUrl = data.fileId 
     } 
     },
     uploadPicfile:function(fileResult){
     //  alert(1)
     console.log(fileResult)
               var that=this
                  var addressCenter =''
		            var IMG = new Image();
					IMG.src = this.getObjectURL(fileResult);
					IMG.onload = function() {
						var w = this.naturalWidth,
							h = this.naturalHeight,
							resizeW = 0,
							resizeH = 0;
						// maxSize 是压缩的设置，设置图片的最大宽度和最大高度，等比缩放，level是报错的质量，数值越小质量越低
						var maxSize = {
							width: 128,
							height: 128,
							level: 1
						};
						if(w > 128 || h > 128) {
							var multiple = Math.max(w / maxSize.width, h / maxSize.height);
							resizeW = w / multiple;
							resizeH = h / multiple;
						} else {
							resizeW = w;
							resizeH = h
						}
						var canvas = document.createElement('canvas'),
						ctx = canvas.getContext('2d');
           // alert(window.navigator.userAgent.indexOf('iPhone'))
				   	canvas.width = resizeW;
							canvas.height = resizeH;
							ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
						var base64 = canvas.toDataURL('image/png', maxSize.level);
					//	 console.log(base64.split(',')[1])
					that.addBlob(window.atob(base64.split(',')[1]), addressCenter);
					}
     },
      addBlob:function(base64, addressCenter){
          var buffer = new ArrayBuffer(base64.length);
			var ubuffer = new Uint8Array(buffer);
			for(var i = 0; i < base64.length; i++) {
				ubuffer[i] = base64.charCodeAt(i)
			}
			var blob;
			try {
				blob = new Blob([buffer], { type: 'image/jpg' });
			} catch(e) {
				window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
				if(e.name === 'TypeError' && window.BlobBuilder) {
					var blobBuilder = new BlobBuilder();
					blobBuilder.append(buffer);
					blob = blobBuilder.getBlob('image/jpg');
				}
			}
             
			this.addBanner(blob, addressCenter)
         },
     addBanner:function(file,url){
       
     const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
    })
    
     let that=this
     let param = new window.FormData()
     param.append('id',this.icoId)
     param.append('picFiles',file,"blob.png")
      param.append('customname',this.customname)
      
    if(this.customname=='undefined'){
     this.customname=''
    }
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    }
    console.log(file)
    console.log(this.icoId) 
      console.log(this.customname)
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
    
   HTTP.post("/appconsole/index/updateIcon",param,config)
    .then(res => {
      var data=res.data
      if(data.code==0){
       
      
       console.log(this.icoList)
       $.each(this.icoList,function(c,clem){
         if(clem.id==that.icoId){
          clem.content=data.data.imgUrl
         }
       })
       this.$message({
          message: data.message,
          type: 'success',
          center: true
        })
      loading.close()  
      }
      console.log(data)
    })
    .catch(error => {
     console.log(error)
    }) 
    
    },
      getObjectURL:function(file){
    var url = null;
			if(window.createObjectURL != undefined) {
                 // basic
				url = window.createObjectURL(file);
			} else if(window.URL != undefined) {
                 // mozilla(firefox)
				url = window.URL.createObjectURL(file);
			} else if(window.webkitURL != undefined) { 
                // webkit or chrome
				url = window.webkitURL.createObjectURL(file);
			}
			return url;
    }   
        },
     components: { 
          SimpleCropper 
    }    
    }
  
</script>  