<template>
<div class="granddad" style="padding-bottom:40px; position:relative;" >
<div v-show="false">
 <input id="upload_file" type="file"  style="display: none;" accept='image/*' name="file"  @change="fileChange($event)"/>
    <div class="image-item space" @click="showActionSheet()">
      <div class="image-up"></div>
    </div>
   
    <div class="upload_warp">
      <div class="upload_warp_img">
        <div class="upload_warp_img_div" :key="index" v-for="(item,index) in imgList">
          <div class="upload_warp_img_div_top" >
            <img src="" class="upload_warp_img_div_del"  @click="fileDel(index)">
          </div>
          <img :src="item.file.src" style="display: inline-block;">
        </div>
        <div class="upload_warp_left" id="upload_warp_left" @click="fileClick()" v-if="this.imgList.length < 6">
          <img src="" class="imgs"/>
        </div>
      </div>
 
    </div>
   
    <div class="upload_warp_text">
    <span>选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}</span>
    </div>
    </div>
  <!--banner-->

    <!--模板-->
  <div class="genitor" style="padding:0 0 45px 0;opacity:0;border:1px solid red;">
  <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper"  >
  <slot>
  <div class="bannertim">
  <div class="bannertitle">最多添加5个banner图片,宽高为1125×480(像素)<span v-show="appsan">jpg和png格式,长按Banner卡片可以排列顺序</span></div>
  <div class="bannertitle" v-show="!appsan">jpg和png格式,长按Banner卡片可以排列顺序</div>
  </div>

  <div id="agencyMsg"  class="agencyMsg">

  <div class="bannermanage" :data="JSON.stringify(item)" :index="index" :sortCode="item.sortCode" :content="item.content" :key="index" v-for="(item,index) in bannerlist">
  <el-row class="el-borderRadio">
  <el-col :span="24">
  <div class="grid-content bg-purple-dark">
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
  <span class="bmn">
  <el-button @click="upload(item.id)" >更换图片</el-button>
  <el-button @click="addlink(item.id,index)">添加链接</el-button>
  <el-button type="danger" @click="danger(item.id,index)">删除</el-button>
  </span>
  </div>
  </el-col>
  </el-row>
  </div>

   </div>

  <!--添加按钮-->
  <div class="addbannerbtn" v-show="judge" >
   <router-link :to="{name:'appbanner'}" @click.native="upload(0)" >
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
   appsan:false
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
             $('.granddad').height($(window).outerHeight())

            if($('.bannermanage').length<5){
             this.judge=true
            }else{
              this.judge=false
            }
          this.ratio()
              var bstop = false;
	            var hstop=true
	            var $viemout = null
              var $timeout=null
              var ream=null
              var smove=0
              var smova=0
              var touchstart=0 
              var touchatart=0
              var emove=0
              var record=0
            $('body').unbind('touchstart')
           	$('body').on('touchstart', '.bannerImg', function(e) {	
               var thea=this
           //   console.log('触发：'+$(this).parents('.bannermanage').index())
           //   $('.genitor').hide()
         
             //  alert($(document).length)
       if (e.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!e.defaultPrevented) {
            e.preventDefault();
        }
        }
              
       //  document.removeEventListener('touchmove', handler, false);      
        
           clearTimeout($viemout);
	       	var $clone = $(this).parents('.bannermanage').clone();
	      	var that = this;
          var touch = e.originalEvent.targetTouches[0]
	      	var disy = touch.pageY;
	       	var w=$(this).outerWidth();
       $clone.addClass('draging').css({
			top: $(this).parents('.bannermanage').position().top,
			"opacity": "0",
		 	width: w,
      'box-shadow':'0 0 10px 5px #aaa'
		})
     function animateFunc(time){ 
                 //   console.log(time)
                   ream=requestAnimationFrame(animateFunc)
                  
                    TWEEN.update(time)
            }	
		if(hstop){
		$timeout = setTimeout(function() {
      console.log('不好的事')
			$('#agencyMsg').append($clone);
			$(that).parents('.bannermanage').css({ "opacity": "0" });
			$clone.css({ "opacity": "1" })
			bstop = true
     
    $(document).unbind('touchmove') 
    $(document).unbind('touchend')
		animateFunc() 
    // document.addEventListener('touchmove', handler, false)
			//追加到box里面	
		}, 800)
       }
      
         $(document).unbind('touchmove') 
      $(document).unbind('touchend')  
    //    smove=0   
 $(document).on('touchmove',function(e){
   var touch2=e.originalEvent.targetTouches[0]
 // console.log($('.ebottom').offset().top)
    clearTimeout($timeout);
   if(touchstart==0){
   touchstart= e.originalEvent.targetTouches[0].pageY
   }else{
     if(smove<=0){
       var k=1
       if(k||touch2.pageY-touchstart>0||$(window).outerHeight()<=parseInt($('.ebottom').offset().top+20)){
     
     smove=touch2.pageY-touchstart+emove
    
  // console.log('还在里面')
       }else{
     //  alert(1)
      //    $(document).unbind('touchmove') 

       }
   //  console.log(parseInt(smove))
 
   }else{
   
   // $(document).unbind('touchmove') 
   //  smove=0
   }
    $('.genitor').css({
     'top':smove
    })
     }
    
   $(document).on('touchend',function(e){
    // $(document).unbind('touchmove') 
    //  $(document).unbind('touchend')
      if(smove>=0||$('.genitor').outerHeight()<$(window).outerHeight()){
      smove=0
      $('.genitor').css({
     'top':smove
    })
      }
      if($('.genitor').outerHeight()>$(window).outerHeight()&&$(window).outerHeight()>=parseInt($('.ebottom').offset().top+20)){
      
        $('.genitor').css({
     'top':-$('.genitor').outerHeight()+$(window).outerHeight()
       })
       smove=-$('.genitor').outerHeight()+$(window).outerHeight()
      }
    emove=smove
  
    touchstart=0
  //  console.log('在这呢老弟')
   // console.log(emove)
   })
   
  // console.log(smove)

     // console.log(touch2.pageY)


 })
       
       $('#agencyMsg').on('touchmove', function(e) {
          var touch1 = e.originalEvent.targetTouches[0]
          if(bstop){
          if(touchatart==0){
           touchatart=touch1.pageY
          }else{
            smova=touchatart-touch1.pageY+emove
            console.log(smova)
            
             $('.genitor').css({
            'top':smova
            })
            
          }
          }
	   //    e.preventDefault()
    //    console.log(disy)
    //     console.log(touch1.pageY  - disy)
		//	e.preventDefault ? e.preventDefault() : (e.returnValue = false)
// console.log($(this).offset().top)
 let ascrollTop = $(window).scrollTop()
 let bnh=$(window).outerHeight()-$clone.outerHeight()

 let h=touch1.pageY- $(this).offset().top-120
 
           
 function tweenfun(escrollTop,t){

 new TWEEN.Tween({
            number:escrollTop
      }).to({
          number:t
      },500).onUpdate(function(){ 
        
         $(window).scrollTop(this.number.toFixed(0))
     }).start()
 }
 if(parseInt(ascrollTop)>=parseInt(h)){
 
  tweenfun(ascrollTop,0)
 }else if(parseInt(bnh)<=parseInt(h)){

  tweenfun(ascrollTop,bnh+2000)
 }

  // console.log(parseInt(bnh)+':'+parseInt(h))
   
			$clone.css({
				top: touch1.pageY- $(this).offset().top-120
			})

		 })
    
     $('#agencyMsg').on('touchend', function(e) {
      $('#agencyMsg').unbind('touchmove')
			$('#agencyMsg').unbind('touchend')
      
      hstop=false
			var interimArray = [];
			var groupArray=[];
  	 	 var seatAttay=[];
         clearTimeout($timeout);
			$('#agencyMsg').off('mousemove');
      	if(bstop) {
          if($(thea).parents('.bannermanage').attr('index')==0){
            $('.genitor').css({
            'top':0
            })
          }
         

				var minIndex = $(that).parents('.bannermanage').index();
				 // //(minIndex)
         console.log($clone.attr('index'))
				var minValue = 1000;
				$('.bannermanage').not(':last').each(function() {
				var smalldistance = Math.sqrt(Math.pow($clone.position().left - $(this).position().left, 2) + Math.pow($clone.position().top - $(this).position().top, 2)); //利用勾股定理获取每一个盒子离克隆出来的盒子的距离
					if(smalldistance < minValue) {
						minValue = smalldistance;
						minIndex = $(this).index();
					}
				})
        if(minIndex == $(that).parents('.bannermanage').index()) {
			    	//('执行了')
					$clone.animate($(that).parents('.bannermanage').position(), 400, function() {
						$(that).parents('.bannermanage').css({"opacity": "1"});
						$clone.remove();
						// bstop=true;
					});
				}else {
					var $minbox = $('.bannermanage').eq(minIndex);
					var $firstIndex=$(that).parents('.bannermanage').index();
					var $lastIndex=$minbox.index();
					if($firstIndex<$lastIndex){
					 for(var i=$firstIndex+1;i<=$lastIndex;i++){
					 	groupArray.push(i)
					 }
					
					}else{
					 for(var i=$firstIndex-1;i>=$lastIndex;i--){
					 	groupArray.push(i)
					 }	
					}
				  	
					$.each(groupArray, function(i,index) {
				var $inbtn=$firstIndex<$lastIndex?index-1:index+1
				var  	$position=$('.bannermanage').eq($inbtn).position()
					seatAttay.push($position)  
				     ////($inbtn)
					});
					
					$clone.animate($minbox.position(), 400, function() {
						//$minbox.html($clone.html()); 
            var $mincode=parseInt($minbox.attr('sortCode'))
           // console.log($mincode) 

						 $minbox.html('').css({ "opacity": "0" });
						$minbox.html($clone.get(0).outerHTML);
           
						$clone.remove();
					var $mindate=	$minbox.children().removeClass('draging').unwrap()
          var $mindata=JSON.parse($mindate.attr('data'))
          $mindata.sortCode=$mincode
          $mindate.attr('data',JSON.stringify($mindata))
          setTimeout(function(){
           than.movefun() 
          },100)
          
						//bstop = true;
					});
						//上传交换的位置
                   $.each(seatAttay, function(i,position) {
					  	////(groupArray[i]+':'+position)
					  	 
					  var	 $imun=parseInt(groupArray[i])
					  //	 console.log($imun)
					var	 $Arraybox=$('.bannermanage').eq($imun)
						 $imun=$firstIndex<$lastIndex?$imun-1:$imun+1
						var $Beforebox=$('.bannermanage').eq($imun)
					var	 $clone2=$Arraybox.clone()
						
			     $clone2.addClass('draging').css({
						left: $Arraybox.position().left,
						top:  $Arraybox.position().top,
						width: w
					})
					$('#agencyMsg').append($clone2);
				 	 //$Beforebox.html('');
          //  position.push({'opacity':0})
            console.log(position)
					$clone2.animate(position, 400, function() {
					var	$add=$firstIndex<$lastIndex?-1:1
						//('-----')
						//($(this).attr('index'))
					var	 $icon=parseInt($(this).attr('index'))+$add
					//	console.log($icon)
					var	 $lingShi=$('.bannermanage').eq($icon)
          var  $sortCode=parseInt($lingShi.attr('sortCode'))
          
         // console.log($sortCode)
						$lingShi.html($(this).get(0).outerHTML)
						var $lingsdate=$lingShi.children().removeClass('draging').unwrap()
						$(this).remove();
					var	$lingsdata=JSON.parse($lingsdate.attr('data'))
            $lingsdata.sortCode=$sortCode
            $lingsdate.attr('data',JSON.stringify($lingsdata))
          console.log($lingsdata)
					//	//($lingShi.index())

					//	$.ClosePageEvents(true)
					});
          
					////
					});
					interimArray.splice(0, interimArray.length);
				}
         bstop = false
//
        }else{
          $clone.remove();
        }
        
      $viemout = setTimeout(function() {
        $('.bannermanage').each(function(i,elem){
         $(elem).css({
           top:0,
           opacity:1
         })
         
        })
        window.cancelAnimationFrame(ream)
     //   document.removeEventListener('touchmove', handler, false)
				hstop=true
        
			}, 410)
     
//
     })
     
             })


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
      console.log(res)
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
     const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
    })
     let param = new window.FormData()
     param.append('url',url)
     param.append('filesList',file)
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
      console.log(res)
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
						if(window.navigator.userAgent.indexOf('iPhone') > 0) {
							canvas.width = resizeH;
							canvas.height = resizeW;
							ctx.rorate(90 * Math.PI / 180);
							ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
						} else {
							canvas.width = resizeW;
							canvas.height = resizeH;
							ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
						}
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
            message: data.message,
            center:true
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
            message: '已取消删除',
            center:true
          })          
        })
        $('.el-message-box').css({
          'width':240,
          'height':150
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
 this.$nextTick(()=>{
   $('.el-message-box').css({
           'width':240,
          'height':180
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
     var bannermlist=[]
     $('.bannermanage').each(function(i,elem){
       bannermlist.push(JSON.parse($(elem).attr('data')))  
     })
     var bnm=JSON.stringify(bannermlist)
      var HTTP = axios.create({
    baseURL:this.$local.temporary()
    }) 
   HTTP.post("/appconsole/index/updateBanner", Qs.stringify({ 
      'banner':bnm
       }))
    .then(res => {
      var data=res.data
      var that=this
      if(data.code==0){
        $('.bannermanage').each(function(i,elem){
        $(elem).animate({opacity:0},1000,function(){
           loading.close()
        })
        })
        setTimeout(function(){
    that.$message({
          message: '修改成功',
          type: 'success',
          center: true
        })
        that.$router.push({
          name: 'atowone',
          params: {
            stationId:6,
            name:'appbanner'
            }
        })
        },1000)
         
      }
     
    })
    .catch(error => {
     console.log(error)
    })
      }      
      },
       components: { 
          SimpleCropper 
    } 
 }
</script>