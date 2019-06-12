<template>
<div class="granddad"  >

  <!--banner-->

    <!--模板-->
  <div class="genitor" style="padding:0 0 45px 0;opacity:0;"> 
  <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper"  >
  <slot>
  <div class="bannertim">
  <div class="bannertitle">最多添加5个banner图片,宽高为1125×480(像素)<span v-show="appsan">jpg和png格式,长按Banner卡片可以排列顺序</span></div>
  <div class="bannertitle" v-show="!appsan">jpg和png格式,长按Banner卡片可以排列顺序</div>
  </div>

  <div id="agencyMsg"  class="agencyMsg" >
  <draggable element="div" v-model="bannerlist" @start="choose" :clone="clone"  @end="choosa" @update="icodatadrag()" :options="options" >
  <div class="bannermanage"  :data="JSON.stringify(item)" :index="index" :sortCode="item.sortCode" :content="item.content" :key="index" v-for="(item,index) in bannerlist">
  <el-row class="el-borderRadio" style="border-radius:5px;overflow:hidden;">
  <el-col :span="24">
  <div class="grid-content bg-purple-dark" style="border-radius:5px;">
  <img class="bannerImg" :src="item.photoUrl">
  </div>
  </el-col>
  <el-col :span="24" class="bannerbtn" >
  <div class="grid-content bg-purple-dark">
  <span class="cmn " v-if="item.content">
  <img class="cmnImg " src="../src/assets/images/hyperlinnk.png">
  </span>
   <span class="cmn cmnsn" v-else>
  <img class="cmnImg " src="../src/assets/images/hyperlinnk.png">
  </span>
  <span class="bmn" >
  <el-button @click="upload(item.id)" >更换图片</el-button>
  <el-button v-if="item.content" @click="addlink(item.id,index)">修改链接</el-button>
  <el-button v-else @click="addlink(item.id,index)">添加链接</el-button>
  <el-button type="danger" @click="danger(item.id,index)">删除</el-button>
  </span>
  </div>
  </el-col>
  </el-row>
  </div>
   </draggable>

   </div>

  <!--添加按钮-->
  <div class="addbannerbtn" v-show="judge" >
   <router-link :to="{name:'effectivecrop'}" @click.native="upload(0)" >
  添加Banner
  </router-link>
  </div>

  </slot>
  </simple-cropper>
  <div class="ebottom" style="height:3px;">
  </div>
  </div>
  <!--End-->
</div>
</template>
<style scoped>
@import 'assets/css/appbanner.css'
</style>
<script>
import axios from 'axios'
import Qs from 'qs'
import SimpleCropper from '@/components/cropper/index' 
import draggable from 'vuedraggable'
import TWEEN from 'tween.js'
 export default {
    name: "cameras-and-albums",
      data(){
        return{
          imgList: [],
          imgformal:[],
          datas: new FormData(),
          files:0,
          size:0,
          bannerlist:[],
          uploadParam: { 
          fileType: 'recruit', 
          // 其他上传参数
           uploadURL: this.$dataURL + 'uploadAction/qcloudImg',
          // 上传地址 
           scale: 4 
          // 相对手机屏幕放大的倍数: 4倍 
   }, 
   userImg: this.$dataURL + 'test.png' ,
   bannerId:0,
   judge:false,
   appsan:false,
   options:{animation: 200,delay:300,scroll:true,scrollSensitivity:100}
        }
      },
      watch:{
        imgList(){
        //  console.log(this.imgList)
          if(this.imgList.length){
           // console.log(this.imgList[0].file)
           // console.log(this.imgList[this.imgList.length-1].file)
            this.uploadPicfile(this.imgList[this.imgList.length-1].file)
          }
          
        },
        bannerlist(){
          this.$nextTick(()=>{
             var than=this
           

            if($('.bannermanage').length<5){
             this.judge=true
            }else{
              this.judge=false
            }
            this.ratio()
            
         
          })
        
        },
        imgformal(){
           this.$nextTick(()=>{
          this.ratio()
          })
        }
        
      },
      created(){
        var that=this
    $.popstate=function(){
      document.title='Banner管理'
      that.$store.commit('setProtionSize',1125 / 480)
   $(window).unbind('popstate')
 $(window).on('popstate', function () {
   document.title='管理控制台'
 that.$router.push({
    name:'index'
  })
 })
 
 if($(window).outerWidth()>700){
  that.appsan=true
 }
 

 
 }
  $.popstate() 
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
   HTTP.post("/appconsole/index/bannerlist", Qs.stringify({ 
      'schoolId':this.$store.state.schoolId
       }))
    .then(res => {
     
    if(res.data.length){
     this.bannerlist=res.data
    }
    //  console.log(res)
    })
    .catch(error => {
     console.log(error)
    })
      },
      methods:{
        // 调用相册&相机
        fileClick() {
          $('#upload_file').click();
 
        },
        // 调用手机摄像头并拍照
        getImage() {
          let cmr = plus.camera.getCamera();
          cmr.captureImage(function(p) {
            plus.io.resolveLocalFileSystemURL(p, function(entry) {
              compressImage(entry.toLocalURL(),entry.name);
            }, function(e) {
              plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            });
          }, function(e) {
          }, {
            filter: 'image'
          });
        },
        // 从相册选择照片
        galleryImgs() {
          plus.gallery.pick(function(e) {
            let name = e.substr(e.lastIndexOf('/') + 1);
            compressImage(e,name);
          }, function(e) {
          }, {
            filter: "image"
          });
        },
        // 点击事件，弹出选择摄像头和相册的选项
        showActionSheet() {
          let bts = [{
            title: "拍照"
          }, {
            title: "从相册选择"
          }];
          plus.nativeUI.actionSheet({
              cancel: "取消",
              buttons: bts
            },
            function(e) {
              if (e.index == 1) {
                this.getImage();
              } else if (e.index == 2) {
                this.galleryImgs();
              }
            }
          );
        },
        fileChange(el) {
          this.files=$("#upload_file").get(0).files;
          console.log(this.files.length);
          for(let i=0;i<this.files.length;i++){
            this.datas.append("file",this.files[i]);
          }
          this.show1=false;
          console.log(typeof this.files);
          console.log(this.files);
          if (!el.target.files[0].size) return;
          this.fileList(el.target);
          el.target.value = ''
        },
        fileList(fileList) {
          let files = fileList.files;
          for (let i = 0; i < files.length; i++) {
            // 判断是否为文件夹
            if (files[i].type != '') {
              this.fileAdd(files[i]);
            } else {
              // 文件夹处理
              this.folders(fileList.items[i]);
            }
          }
        },
        // 文件夹处理
        folders(files) {
          let _this = this;
          // 判断是否为原生file
          if (files.kind) {
            files = files.webkitGetAsEntry();
          }
          files.createReader().readEntries(function (file) {
            for (let i = 0; i < file.length; i++) {
              if (file[i].isFile) {
                _this.foldersAdd(file[i]);
              } else {
                _this.folders(file[i]);
              }
            }
          })
        },
        fileAdd(file) {
          // 总大小
          this.size = this.size + file.size;
          // 判断是否为图片文件
          if (file.type.indexOf('image') == -1) {
            file.src = 'wenjian.png';
            this.imgList.push({
              file
            });
          } else {
            let reader = new FileReader();
            reader.vue = this;
            reader.readAsDataURL(file);
            reader.onload = function () {
              file.src = this.result;
              this.vue.imgList.push({
                file
              });
            }
          }
        },
        fileDel(index) {
          this.size = this.size - this.imgList[index].file.size;
          // 总大小
          this.imgList.splice(index, 1);
        },
        bytesToSize(bytes) {
          if (bytes === 0){
            return '0 B';
          }
          let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
          return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        dragenter(el) {
          el.stopPropagation();
          el.preventDefault();
        },
        dragover(el) {
          el.stopPropagation();
          el.preventDefault();
        },
        drop(el) {
          el.stopPropagation();
          el.preventDefault();
          this.fileList(el.dataTransfer);
        },
        shows(et,tx){
          this.strut=et;
          this.txt=tx;
        },
        handleClick(){
          this.$store.commit('add')
        },
        // 上传头像 
    upload:function(id) { 
      
      this.$refs['cropper'].upload()
      this.imgList=this.$refs['cropper'].imgList
      this.bannerId=id
      
     },
   // 上传头像成功回调
    uploadHandle (data) {
     if (data.state === 'SUCCESS') {
     this.userImg = this.form.headImgUrl = data.fileId 
     } 
     },
   // 添加banner
     addBanner:function(file,url){
       console.log(file)
     const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
    })
     let param = new window.FormData()
     param.append('url',url)
     param.append('filesList',file,"blob.png")
      param.append('schoolId',this.$store.state.schoolId)
      if(this.bannerId){

        param.append('id',this.bannerId)
      }
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    }
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
    
   HTTP.post("/appconsole/index/addBanner",param ,config)
    .then(res => {
      var data=res.data
      if(data.code==0){
       
       this.bannerlist=data.data.bannerList
      
       this.$message({
          message: '添加成功',
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
    },
        uploadPicfile:function(fileResult){
        //  console.log(fileResult)
     
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
							width: 1125,
							height: 480,
							level: 1
						};
						if(w > 1125 || h > 480) {
							var multiple = Math.max(w / maxSize.width, h / maxSize.height);
							resizeW = w / multiple;
							resizeH = h / multiple;
						} else {
							resizeW = w;
							resizeH = h
						}
						var canvas = document.createElement('canvas'),
							ctx = canvas.getContext('2d');
				
							canvas.width = resizeW;
							canvas.height = resizeH;
							ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
						
						var base64 = canvas.toDataURL('image/png', maxSize.level);
						// console.log(base64.split(',')[1])
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
      ratio(){
         let ratio=480/1125
            let h=ratio*($(window).outerWidth()-20)

           
            $('.bannermanage').each(function(i,elem){
                $(elem).height(h+50)
                $(elem).find('.bannerImg').height(h)
                $(elem).find('.bannerbtn').css({
                  'top':h
                })
            })
        $('.genitor').css({opacity:1})
      },
      danger:function(id,index){
       
        var that=this
         this.$confirm('是否删除该banner?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
        
    var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
   HTTP.post("/appconsole/index/deleteBanner", Qs.stringify({ 
      'id':id
       }))
    .then(res => {
      var data=res.data
      if(data.code==0){
  
    that.bannerlist.splice(index,1)
       this.judge=true
       this.$message({
            type: 'success',
            message: data.message
          })
      }
      console.log(data)
    })
    .catch(error => {
     console.log(error)
    })
    
       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
        $('.el-message-box').css({
          'width':'90%',
          'height':'135px'
        })
        $('.el-message-box__headerbtn').hide()
      },
      addlink:function(id,index,value){
       
         const h = this.$createElement
            
            this.$msgbox({
          title: '请输入banner链接',
          message: h('p', null, [
            h('input', { style: '-webkit-user-select:text !important' }, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              var reg=/^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/
             console.log($('.el-message-box__message').find('input').val())
             
              if(reg.test($('.el-message-box__message').find('input').val())){
              done()
              instance.confirmButtonLoading = false;
              }else{
                instance.confirmButtonLoading = true;
              instance.confirmButtonText = '格式错误...';
              setTimeout(function(){
                 instance.confirmButtonLoading = false;
              instance.confirmButtonText = '确定';
              },800)
              }
               
             
            } else {
              done()
            }
          }
        }).then(action => {
         let banner=JSON.parse($('.bannermanage').eq(index).attr('data'))
        let bamer=[]
        banner.content=$('.el-message-box__message').find('input').val()
        bamer.push(banner)
        console.log(bamer)
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
   HTTP.post("/appconsole/index/updateBanner", Qs.stringify({ 
      'banner':JSON.stringify(bamer)
       }))
    .then(res => {
      var data=res.data
      if(data.code==0){
        $('.bannermanage').eq(index).attr('content', banner.content)
        $('.cmn').eq(index).removeClass('cmnsn')
         this.$message({
            type: 'success',
            message: data.message
          })
      }
      console.log(data)
    })
    .catch(error => {
     console.log(error)
    })
        })
 this.$nextTick(()=>{
   $('.el-message-box').css({
           'width':'90%',
          'height':'150px'
        })
        $('.el-message-box__headerbtn').hide()
       
        $('.el-message-box__message').find('input').addClass('el-input__inner').val($('.bannermanage').eq(index).attr('content'))
  })
        
        
      },
    movefun(){
      
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        
      var banlist=[]
    $.each(this.bannerlist,function(b,blem){
      banlist.push(blem.sortCode)
    })
    function sortNum(a,b){
      return a-b
    }
    banlist.sort(sortNum)
    $.each(this.bannerlist,function(b,blem){
      blem.sortCode=banlist[b]  
    })
    
      console.log(banlist)
      console.log(this.bannerlist)
   
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
   HTTP.post("/appconsole/index/updateBanner", Qs.stringify({ 
      'banner':JSON.stringify(this.bannerlist)
       }))
    .then(res => {
      var data=res.data
      
      if(data.code==0){
    
      loading.close()
   this.$message({
          message: '修改成功',
          type: 'success',
          center: true
        })
       
  
         
      }
     
    })
    .catch(error => {
     console.log(error)
    })
    
      },
    icodatadrag:function(){
  this.movefun()
    },
    choose:function(evt){
     
     $('.bannermanage').eq(evt.oldIndex).css({
       'boxShadow':'0 1px 3px rgba(10,10,10,1)'
     })
     
    },
    choosa:function(evt){
    
      
      $('.bannermanage').eq(evt.oldIndex).css({
       'boxShadow':'none'
     })
     
    },
    clone:function(evt){
  
    }        
      },
       components: { 
          SimpleCropper,
          draggable 
    } 
 }
</script>