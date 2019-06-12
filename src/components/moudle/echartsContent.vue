<template>
<div>
<div>
<el-row class="elRow">
  <el-col :span="13" class="elCol">
  <div class="grid-content bg-purple" :value="value" style=" font-size:15px; line-height:60px;text-align:left;text-indent:1em;">
 {{ near }}{{ vlaString }}{{ massage }}{{ information }}
  </div>
  </el-col>
   <el-col class="elCol" :span="1">
  <div class="grid-content bg-purple">
  </div>
  </el-col>
  <el-col class="elCol" :span="4">
  <div class="grid-content bg-purple" style="line-height:60px;">
  <!--
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  -->
   <el-button type="primary" style="padding:5px 2px;" class="setData"  @click="setDays(0)">{{ options[0].label }}</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="1">
  <div class="grid-content bg-purple">
  </div>
  </el-col>
  <el-col class="elCol" :span="4">
  <div class="grid-content bg-purple" style="line-height:60px;">
  <el-button type="primary" style="padding:5px 2px;" class="setData" @click="setDays(1)">{{ options[1].label }}</el-button>
  </div>
  </el-col>
   <el-col class="elCol" :span="1">
  <div class="grid-content bg-purple">
  </div>
  </el-col>
</el-row>
<el-row class="elRow">
  <el-col class="elCol" :span="24">
  <div class="grid-content bg-purple">
  <div id="main" class="main" style="background:#fff;width:100%; height:289px; box-sizing:border-box; line-height: 289px;">     
  </div>
  </div>
  </el-col>
</el-row>

  <el-row class="elRow" v-show="register"> 
  <el-col class="elCol" :span="13">
  <div class="grid-content bg-purple" :value="value" style="font-size:15px;line-height:60px;text-align:left;text-indent:1em;">
 {{ near }}{{ setVlaString }}{{ massaga }}{{ information }}
  </div>
  </el-col>
   <el-col class="elCol" :span="1">
  <div class="grid-content bg-purple" >
  </div>
  </el-col>
  <el-col class="elCol" :span="4">
  <div class="grid-content bg-purple" style="line-height:60px;">
  <!--
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  -->
   <el-button type="primary" v-show="btn" class="setData"  @click="setDays(2)">{{ options[0].label }}</el-button>
  </div>
  </el-col>
  <el-col class="elCol" :span="0">
  <div class="grid-content bg-purple">
  </div>
  </el-col>
  <el-col class="elCol" :span="4">
  <div class="grid-content bg-purple" style="line-height:60px;">
  <el-button type="primary" class="setData" @click="examine()">查看</el-button>
  </div>
  </el-col>
   <el-col class="elCol" :span="1">
  <div class="grid-content bg-purple">
  </div>
  </el-col>
</el-row>
<el-row class="elRow" v-show="register">
  <el-col class="elCol" :span="24">
  <div class="grid-content bg-purple">
  <div id="main" class="main" style="background:#fff;width:100%; height:289px; box-sizing:border-box; line-height: 289px;">     
  </div>
  </div>
  </el-col>
</el-row>
</div>
</div>
</template>
<script>
 import axios from 'axios'
 import Qs from 'qs'
 // jquery
 import '@/assets/js/unixTime.js'
export default {
	data() {
      return {
        options: [{
          value: '7',
          label: '近7日'
        }, {
          value: '15',
          label: '近15日'
        }],
        value: '7',
        vlaString:'7',
        registerNumber: 0,
        brt: 0,
        near: '近',
        massage: '日',
        massaga:'',
        information:'的用户活跃量',
        useractiveName: '用户活跃量',
        userNumber: '活跃量',
        seriesType: 'line',
        register: false,
        studyCircles: false,
        btn:false,
        let:false,
        registerbtn:false,
        net:false,
        bet:true,
	    	dialy:[],
        aTdialy:[],
        showDialy:[],
        setShowDialy:[],
        headTailTime:[],
	    	dailyActivity:[],
        setDailyActivity:[],
        activity:[],
        setActivity:[],
        indecrease:[0],
		    percent:[],
        groupTime:[],
        setGroupTime:[],
        monthDegree:{
          '1':31,
          '3':31,
          '4':30,
          '5':31,
          '6':30,
          '7':31,
          '8':31,
          '9':30,
          '10':31,
          '11':30,
          '12':31
        },
        setTime:[
         '7',
         '15',
         '7',
         '15',
         '6',
         '12'
        ],
        setVlaString:'总注册用户数',
        type:1
      }    
    },
    watch:{
        value(){
         // //  ('日期已改变')  
        if(this.$route.params.activeType!=2&&this.$route.params.activeType!=3){
         //  
          this.vlaString=this.value  
          
        }
       if(this.$route.params.activeType!=1){
         if(this.net){
           this.empty(0)  
           this.getCurrentTime(this.value,0)
           }else{
             this.empty(1)
            this.getCurrentTime(this.value,1)
           }
            }else{
             this.empty(0) 
          //  //  (this.value)
             this.getCurrentTime(this.value,0)
            }    

        },
        dailyActivity(){
           this.$nextTick(()=>{
          
          //  //  ('--dailyActivity--')
          // //  (this.groupTime)
          // //  (this.dailyActivity)   
          this.gretDaily()  
             
           }) 
        },
        setDailyActivity(){
           // //  ('--setDailyActivity--')
            this.net=true
           // //  (this.setGroupTime)
           // //  (this.setDailyActivity)
           this.gretDaily(true) 
        },
        registerNumber(){
          
         this.registerNumberFun()
         this.registerbtn=true
        },
        activity(){   
            //  //  (this.activity)
           this.echartsFun() 
          if(this.$route.params.activeType==2){
           this.getCurrentTime(7,1)
          } 
           if(this.registerbtn){
           this.registerNumberFun()
           }
            
        },
        setActivity(){
        
          //  //  (this.setActivity) 
            this.echartsFun(true)
        },
        indecrease(){
            
            if(this.indecrease.length>1){
                var that=this
                var indecrease=this.indecrease
                let centum=0
           // //  (this.indecrease)
                $.each(indecrease,function(i,idem){
                    if(i){
                        if(that.activity[i-1]){
                       centum=idem/(that.activity[i-1])
                        }else{
                            if(idem>0){
                              centum=1
                            }else{
                              centum=-1  
                            }
                            
                        }
                
                    }
                    that.percent.push(centum*100)
                }) 
        //    //  (that.percent)
            }
        },
       percent(){
         // this.echartsFun() 
       },
       dialy(){
         
          
        //  //  (this.dialy)
        //  //  (this.showDialy)
           this.setTimeData()
        
         
       },
       aTdialy(){
       //    //  (this.aTdialy)
           this.setTimeData(true) 
       } 
    },
    created(){
     
      var that=this
     
     //  console.log(document.title)
       $('.el-main').css('background','#fff')
        $("html,body").animate({scrollTop:0},10)
        $("#app").removeAttr('style')
        this.massaga='('+this.$store.state.studentCount+')'
        this.$nextTick(()=>{	
        $('.setData').each(function(i,elem){
         if(i%2==1){
          $(elem).removeClass('el-button--primary')
         }
        })
        })
      // //  (this.$route.params.activeType)
       if(this.$route.params.activeType==1){
         this.value='6'
         this.massage='个月'
         this.options[0].value='6'
         this.options[0].label='近6个月'
         this.options[1].value='12'
         this.options[1].label='近12个月'
         this.type=2
         this.getCurrentTime(6,0) 
         document.title="月活跃"
       }else if(this.$route.params.activeType==2){
         var that=this  
         this.register=true 
         this.near=''
         this.information=''
         this.massage=''
         this.useractiveName='注册用户数'
         this.userNumber='注册量'     
         this.vlaString='当日注册用户数'  
         this.type=3  
         this.getCurrentTime(7,0) 
         document.title="注册用户"
         
       }else if(this.$route.params.activeType==3){
           var that=this  
         this.register=true 
         this.studyCircles=true
         this.near=''
         this.information=''
         this.massage=''
         this.setVlaString='总发帖量'
         this.useractiveName='发帖数'
         this.userNumber='发帖量'     
         this.vlaString='当日发帖量'
         this.type=5  
          this.$nextTick(()=>{
          $('.main').each(function(i,elem){
         that.getCurrentTime(7,i) 
         })   
         })
       }else{
          this.getCurrentTime(7,0) 
          document.title='日活跃'
       }

       this.$nextTick(()=>{ 
      $.popstate=function(){
        $(window).unbind('popstate')
 $(window).on('popstate', function () {
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
     echartsFun:function(g){
      
    this.$nextTick(function(){    
          var echarts = require('echarts/lib/echarts') 
          require('echarts/lib/chart/line')
          require('echarts/lib/chart/bar')
          var that = this
          var im=0
          var unit='人'
       // //  (that.setActivity)
       //   //  (g)
     if(that.$route.params.activeType==2||that.$route.params.activeType==3){
       if(!g){
         that.seriesType='bar' 
         im=0 
       }else{
         that.seriesType='line' 
         im=1 
       }
     }  
     if(that.$route.params.activeType==3){
       unit='个'
     } 
        
var myChart = echarts.init($('.main').eq(im).get(0));
myChart.setOption({
     legend: {
                    selectedMode: false,
                    data: [that.useractiveName]
                },
                grid: {
                    left:70,
					right:60
                },
                xAxis: [
                    {
                        type: 'category',
                        data: that.showDialy,
                        splitLine: {
                            show: true
                        }
                    }

                ],
                yAxis: [
                    {
                        type: 'value',
                        name: that.userNumber,
                        splitLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value}'+unit
                        }
                    },
                    {
                        type: 'value',
                        name: '',
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        splitLine: {
                            show: true
                        }
                    }
                ],
                series: [
                    {
                        name: that.useractiveName,
                        type: that.seriesType,
                        itemStyle: {
						normal: {
							color: '#7ACAF6'
						}
					   },
                        yAxisIndex: 0,
                        data:!g?that.activity:that.setActivity
                    }
                ]

  })
 

       })
     },   
   getCurrentTime(d,i){
    
     
	   let inum=d
       let fasten=d
   //  //  ('获得时间:'+i)
   //  //  (this.showDialy)
     
    while(inum>0){
	   this.computationTime(inum,fasten,i)	  
       inum--
   //    console.log(inum)
	  }
     
	  
 ///	  //  (this.dialy)
    },
	computationTime:function(n,m,i){
    // //  (this.value)    
 //  //  ('计算时间:'+i)
    let myDate = new Date()
	let now=''
    let bow=''
    let mow=''
    let getTimeDate=[]
    let setGetTimeDate=[]
    if(!i){
     getTimeDate=this.dialy
    }else{
     //  //  (this.aTdialy)
      setGetTimeDate=this.aTdialy     
    }
    
     
    let getshowTime=this.showDialy
    let setGetShowTime=this.setShowDialy
   // //  (getTimeDate)
  //  //  (getshowTime)
  //  //  (n)

  if(this.$route.params.activeType!=1){

    let getfasten=myDate.getDate()
	 myDate.setDate(myDate.getDate()-n)
	let yeat=myDate.getFullYear() 
  let month=myDate.getMonth()+1
	let day=myDate.getDate()
 // console.log(month)
	
	 now=month+"."+day
  // console.log(myDate.getFullYear())
  //  console.log(yeat)
  //  console.log(now)
     mow=(month<10?('0'+month):month)+"-"+(day<10?('0'+day):day) 
     if(n==this.value||n==1){
         let headTailTime=this.headTailTime
       bow=yeat+"-"+(month<10?('0'+month):month)+"-"+(day<10?('0'+day):day)   
        headTailTime.push(bow)
     console.log(headTailTime)
     }
    if(!i){
      getTimeDate.push(now) 
      getshowTime.push(mow)
    }else{
      setGetTimeDate.push(now)
      setGetShowTime.push(mow)
    }
 //  //  (getshowTime)
  // //  (setGetShowTime)
	}else{
     myDate.setMonth(myDate.getMonth()-n)
     let yeat=myDate.getFullYear() 
     let month=myDate.getMonth()+1
     let day=1
    // //  (month)
     if(!yeat%4){ 
     // //  ('闰年')
     if(n==1){
     if(month==2){
      day=29
     }else{
       day=this.monthDegree[month]
     }
     }
     }else{
     // //  ('普通年份')
     if(n==1){
     if(month==2){
      day=28
     }else{
       day=this.monthDegree[month]  
     }
     }
     }
     if(n==this.value||n==1){
         let headTailTime=this.headTailTime
       bow=yeat+"-"+(month<10?('0'+month):month)+"-"+(day<10?('0'+day):day)   
        headTailTime.push(bow)
     //   console.log(headTailTime)
     }
     now=month
     mow=(month<10?('0'+month):month)
      getshowTime.push(mow)
      getTimeDate.push(now)
      // //  ('day:'+day)
     // mow=(month<10?('0'+month):month)+"-"+(day<10?('0'+day):day)   

    }
    },
    setDays:function(d){
        var that=this
    $('.setData').each(function(i,elem){
       if(d==i){
         $(elem).addClass('el-button--primary')  
       }else{
         if(d<2){
         if(i<2){
           $(elem).removeClass('el-button--primary')  
         }
         }else if(d>1){
           if(i>1){
           $(elem).removeClass('el-button--primary')  
           }
         }
         
       }
     
    })
    if(this.$route.params.activeType==1){
     that.value=that.setTime[d+4] 
    }else{
      if(d>1){
        this.net=false
      }else{
        this.net=true
      }
     that.value=that.setTime[d]   
    }
     
    },
    setTimeData:function(g){
     // //  (this.type)
      //  (g)
     
    if(g){
      if(this.$route.params.activeType==2){
        this.type=4
        }else if(this.$route.params.activeType==3){
        this.type=6
        }
        }else{
          if(this.$route.params.activeType==2){
        this.type=3
        }else if(this.$route.params.activeType==3){
        this.type=5
        }
        }
     
        
     var HTTP = axios.create({
    baseURL:this.$local.temporary()
    })
    let startTimes=this.headTailTime[0]
       if(this.type==4){
         startTimes=''
       }
   //    console.log(this.$store.state.schoolId)
   //     console.log(startTimes)
    //     console.log(this.headTailTime)
   //    console.log(this.type)
    HTTP.post("/appconsole/index/schoolCount", Qs.stringify({
       'schoolId': this.$store.state.schoolId , 
       'startTime': startTimes,
       'endTime': this.headTailTime[1],
	   'type': this.type
       }))
    .then(res => {
      var data=res.data
      var that=this
      console.log('--schoolId:227--')
        console.log(data)
      //  ('-----')
      if(!parseInt(data.code)){
        // //  (data.data.list)
        // //  ($.myTime.DateToUnix('2018-11-15 12:10:20'))
        // //  ($.myTime.UnixToDate(1540888476))
        console.log(data.data.list)
          if(data.data.list){
            
             let dailyActivity=that.dailyActivity
          let setDailyActivity=that.setDailyActivity
          let groupTime=that.groupTime
          let setGroupTime=that.setGroupTime
            if(data.data.list.length){
       $.each(data.data.list,function(l,lism){
          let time=$.myTime.UnixToDate(lism.createTime.time/1000) 
          time=time.substring(5,time.length)
          time=time.replace(/-/,".")
          if(!g){
          // //  ('1')
          groupTime.push(time)
          dailyActivity.push(lism.number)
          }else{
          //  //  ()
           setGroupTime.push(time)
           setDailyActivity.push(lism.number)   
          }
          //  ('--------')
          //  (dailyActivity)
          //  (setDailyActivity)
          //  (groupTime)
          //  (that.dialy)
          //  ('--------')
        })
            }else{
           //  console.log('进来了1')
              
              if(!g){
           console.log('1')
          that.groupTime=JSON.parse(JSON.stringify(that.dialy))
          $.each(that.dialy,function(){
          dailyActivity.push(0) 
        //  console.log(dailyActivity)
          }) 
          
          }else{
           console.log(2)
           setGroupTime=that.aTdialy
           setDailyActivity.push(0)   
          }
        
            }
        
          }else{
           this.registerNumber=data.data.number 
          }
       

	  }
	//  //  (data)
	})
    .catch(error => {
      //  (error)
    })
    },
    empty:function(g){
       if(!g){
        this.dialy=[]
        this.showDialy=[]
        this.dailyActivity=[]
        this.activity=[]
        this.groupTime=[]
       }else{
         this.aTdialy=[]
         this.setShowDialy=[]
         this.setDailyActivity=[]
         this.setActivity=[]
         this.setGroupTime=[]
       }
         this.headTailTime=[]   
    },
    gretDaily:function(g){
        //   //  (g)
            var that=this
             var dailyActivity=JSON.parse(JSON.stringify(that.dailyActivity))
             var setDailyActivity=JSON.parse(JSON.stringify(that.setDailyActivity))
             var activity=that.activity
             var setDctivity=that.setActivity
             var groupTime=that.groupTime
             var setGroupTime=that.setGroupTime
             var groupTimeArray=[]
             var setGroupTimeArray=[]
             var neatArray=[]
             var neatTimeArray=[]
             var ac=true
             var bc=true
            // //  (dailyActivity)
            // //  (activity)
             if(this.$route.params.activeType==1){
                $.each(groupTime,function(g,glem){
                 groupTimeArray.push(glem.split('.')[0])  
                })
                groupTime=groupTimeArray
               // //  (groupTime)
             }
          //   //  ('只执行一次')
          //   //  (dailyActivity)
              //  (groupTime)
          //    //  (this.showDialy)
             //  (that.dialy)
          //     //  ('只执行二次')
          //  //  (setDailyActivity)
          //  //  (this.setGroupTime)
          //    //  (this.setShowDialy)
          //    //  (that.setDialy)
         !g?neatArray=that.dialy:neatArray=that.aTdialy
         !g?neatTimeArray=groupTime:neatTimeArray=setGroupTime
       //  //  (neatArray)
         $.each(neatArray,function(d,dlem){
          // //  (dlem)
           if(!g){
           ac=true
           }else{
             bc=true
           }
            
         $.each(neatTimeArray,function(n,nlem){
         if(nlem==dlem){
         if(!g){
           activity.push(dailyActivity[n])
         ac=false
         }else{
           setDctivity.push(setDailyActivity[n])
           bc=false
         }
         
         }else{
          //   //  (ac)
          if(!g){
        if(n==groupTime.length-1&&ac){
          
              ac=true
        //   //  ('执行了')
         activity.push(0)
          }
           
         }else{
           if(n==setGroupTime.length-1&&bc){
            bc=true
            setDctivity.push(0)
           }
            
         }
         }
         })
         })
    },
    registerNumberFun(){
     let number=parseInt(JSON.stringify(this.registerNumber))
          let activityLength=this.activity.length
          let that=this
          let bnum=0
          that.setActivity=[]
         // //  (this.activity)
         // //  (number)
         // //  (activityLength)
          while(activityLength>0){
            let inum=0
      
         $.each(this.activity,function(a,alem){
           if(a){
            if(bnum<a){
              inum+=alem
           //   //  (inum)
            }
           }
            
          })
      //    //  ('------')
          bnum++
          that.setActivity.push(number-inum)
            activityLength--
          }
    },
    examine(){
    this.$router.push({
     name:'userlist' 
    })
    }

    }
}
</script>
