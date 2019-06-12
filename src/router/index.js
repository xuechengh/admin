import Vue from 'vue'
import VueRouter from 'vue-router' 
import SystemManagement from '@/components/collapse/systemManagement'
import ModelBlock from '@/components/moudle/modelBlock'
import Courseware from '@/courseware'
import Details from '@/details'
import AtowGridPages from '@/atowGridPages'  
import CoursewareScreening from '@/components/batten/coursewareScreening'
import CoursewareTable from '@/components/staffList/coursewareTable'
import Knowledge from '@/components/batten/knowledge'
import StationAtow from '@/components/station/atowStation'
import AsourceSetting from '@/asourceSetting'
import AscreenedPublisher from '@/ascreenedPublisher'
import Echarts from '@/echarts'
import EchartsContent from '@/components/moudle/echartsContent'
import UnpublishedData from '@/components/moudle/unpublishedData'
import UnpubRevise from '@/components/moudle/unpubRevise'
import AuditSettings from '@/components/moudle/auditSettings'
import AuditCounter from '@/components/moudle/auditCounter'
import Master from '@/components/staffList/master'
import UserActivity from '@/components/batten/userActivity'
import Trainee from '@/components/staffList/trainee' 
import LearnFlat from '@/components/staffList/learnFlat'
import AppManagement from '@/components/moudle/appManagement'
import Erbac from '@/erbac'
import Gpannel from '@/gpannel'
import Personnel from '@/personnel'
import Teacherdel from '@/teacherdel'
import Addpeople from '@/addpeople'
import Modulecustom from '@/modulecustom'
import Appbanner from '@/appbanner'
import Acropper from '@/acropper'
import Modulecustoman from '@/modulecustoman'
import Effectivecrop from '@/effectivecrop'
import Userlist from '@/userlist'
import Aaa from '@/aaa'
Vue.use(VueRouter)
let router = new VueRouter({ 
  mode: 'history',
  base: '/system',
  routes: [
   {
     path:'/', 
     name:'index',
     components: {
       default:Master,
       batten:UserActivity,
       learnFlat:LearnFlat,
       trainee:Trainee,
       systemManagement:SystemManagement,
       appManagement:AppManagement
     },
     meta: {
       title: '控制台主页',
       backgroundColor: 1
     }
   },
   {
    path:'/erbac',
    name:'erbac',
    component:Erbac
   },
   {
     path:'/userlist',
     name:'userlist',
     component:Userlist,
     meta: {
      content: 'width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no'
     }
   },
   {
     path:'/appbanner',
     name:'appbanner',
     component:Appbanner
   },
   {
    path:'/modulecustom',
    name:'modulecustom',
    component:Modulecustom
   },
   {
     path:'/Gpannel',
     name:'Gpannel',
     component:Gpannel
   },
   {
     path:'/Personnel',
     name:'pesonnel',
     component:Personnel
   },
   {
    path:'/Teacherdel/:platformResourceId?',
    name:'teacherdel',
    component:Teacherdel
  },
  {
    path:'/Addpeople', 
    name:'addpeople',
    component:Addpeople
  },
  {
    path:'/Acropper/:type?',
    name:'acropper',
    component:Acropper
  },
  {
    path:'/Effectivecrop',
    name:'effectivecrop',
    component:Effectivecrop
  },
  {
   path:'/Modulecustoman/:name?',
   name:'modulecustoman',
   component:Modulecustoman 
  },
  {
    path:'/coutseware',
    component:Courseware,
    children:[
      {
       path:'cour', 
       name:'coutsewarer',
      components:{
        batten:CoursewareScreening,
        trainee:CoursewareTable
      }
     }
    ]
   },
   {
    path:'/details/:platformResourceId?', 
    name:'details',
    component:Details
  },
  {
    path:'/atowGridPages',
    name:'atowGridPages',
    component:AtowGridPages,
    children:[{
      path:'knowledge',
      name:'knowledge',
      component:Knowledge
    }]
  },
  {
    path:'/atowGridPages/atowGridBack',
    name:'atowone',
    component:StationAtow
  },
  {
    path:'/asourceSetting', 
    name:'asource',
    component:AsourceSetting,
    
  },
  {
    path:'/ascreenedPublisher',
    name:'ascreen',
    component:AscreenedPublisher
  },
  {
    path:'/echarts',
    name:'echarts',
    component:Echarts,
    children:[{
    path:'echartsContent', 
    name:'echartsContent',
    components:{
     default: EchartsContent,
     auditSettings: AuditSettings,
     auditCounter: AuditCounter
    }
    }]  
  },
  {
   path:'/unpublishedData',
   name:'unpublishedData',
   component:UnpublishedData
  },
  {
   path:'/unpubRevise',
   name:'unpubRevise',
   component:UnpubRevise 
  },
  {
    path:'/aaa',
    name:'aaa',
    component:Aaa
  },
  {
    path:'/*',
    redirect:{name:'index'}
  }
  ] 
})

export default router
