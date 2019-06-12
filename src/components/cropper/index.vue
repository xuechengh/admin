<template> 
<div class="v-simple-cropper"> 
<slot>
</slot>

<div class="screenshot" v-show="cropperben">
 <input class="file" style="display:none;" ref="file" type="file"  accept="image/*" @change="uploadChange"> 
 <div class="v-cropper-layer" ref="layer"> 
 <div class="layer-header tailor"> 
 <button class="cancel taibtn taileft" @click="cancelHandle">取消</button>
 <button class="confirm taibtn tairight" @click="confirmHandle">裁剪</button>
  </div> 
  <img ref="cropperImg" class="cropperImg">
 </div> 
 </div>

 </div> 
 </template>
  <script> 
  import axios from 'axios'
  import Qs from 'qs'
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  import '@/assets/css/croppermin.css'
 export default { 
    name: 'v-simple-cropper', 
    props: { initParam: Object, successCallback: { type: Function, default: () => {} } },
    data () { 
     return { 
      imgList: [],   
      cropper: {},
      filename: '',
      cropperben:false
      } 
     },
    mounted () { this.init() },
    created(){
        this.$nextTick(()=>{
          $('.screenshot').width($(window).outerWidth()) 
          $('.screenshot').height($(window).outerHeight()) 
          $('.cropperImg').height($(window).outerHeight()-200)
         
        })
       
    },
    methods: { // 初始化裁剪插件 
    init () { 
     
    let cropperImg = this.$refs['cropperImg'] 
    this.cropper = new Cropper(cropperImg, { aspectRatio: this.$store.state.protionSize, dragMode: 'move' ,autoCropArea: 1 })   
    },
     // 点击上传按钮 
     upload () { this.$refs['file'].click() }, 
     // 选择上传文件 
     uploadChange (e) {
         this.cropperben=true
         let file = e.target.files[0] 
         this.filename = file['name']
         let URL = window.URL || window.webkitURL 
         this.$refs['layer'].style.display = 'block' 
         this.cropper.replace(URL.createObjectURL(file))
          },
     // 取消上传 
     cancelHandle () { 
         this.cropperben=false
         this.cropper.reset() 
         this.$refs['layer'].style.display = 'none' 
         this.$refs['file'].value = '' 
         },
     // 确定上传 
     confirmHandle () { 
        let that=this
         let cropBox = this.cropper.getCropBoxData() 
         let scale = this.initParam['scale'] || 1 
         let cropCanvas = this.cropper.getCroppedCanvas({ width: cropBox.width * scale, height: cropBox.height * scale }) 
         let imgData = cropCanvas.toDataURL('image/jpeg')  
     //    $('.abc').attr('src',imgData)
         this.getImgToBase(imgData,function(data){
　　　var myFile = that.dataURLtoFile(data,'testimgtestimgtestimg')
      that.fileAdd(myFile)
　　//　console.log(myFile)
         })


         this.cropperben=false
         this.cropper.reset() 
         this.$refs['layer'].style.display = 'none' 
         this.$refs['file'].value = '' 
              },
        dataURLtoFile:function(dataurl,filename){
         var arr = dataurl.split(',');
         var mime = arr[0].match(/:(.*?);/)[1];
         var bstr = atob(arr[1]);
         var n = bstr.length; 
         var u8arr = new Uint8Array(n);
         while(n--){
          u8arr[n] = bstr.charCodeAt(n);
         }
         //转换成file对象
       // return new File([u8arr], filename, {type:mime});
        //转换成成blob对象
         return new Blob([u8arr],{type:mime});

           },
          getImgToBase:function(url,callback){
    
            var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            img = new Image;
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img,0,0);
            var dataURL = canvas.toDataURL('image/png');
            callback(dataURL);
            canvas = null;
            };
            img.src = url;
          },
          fileAdd(file) {
          // 总大小
        //  console.log(file)
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
         
         

        }       
               }
                } 
          </script> 
          <style> 
          .v-simple-cropper { 
              .file { display: none; }
             .v-cropper-layer { position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: #fff; z-index: 99999; display: none; 
             .layer-header { position: absolute; top: 0; left: 0; z-index: 99999; background: #fff; width: 100%; height: .8rem; padding: 0 .2rem; box-sizing: border-box; } 
             .cancel, .confirm { line-height: .8rem; font-size: .28rem; background: inherit; border: 0; outline: 0; float: left; } 
             .confirm { float: right; } 
             img { position: inherit!important; border-radius: inherit!important; float: inherit!important; }
              }
               }
             </style>