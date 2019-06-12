import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({ 
    state:{
     schoolId:0,
     setUserId:0,
     type:'',
     bata:[],
     leaveTotal:1, 
     teacherCount:0,
     studentCount:0, 
     dailyActive:0,
     monthActive:0,
     leaveTotal:0,
     lateTotal:0,
     earlyTotal:0,
     escapeTotal:0,
     classStudentCount:0,
     systemHeight:0,
     resourceIds:'',
     acropperType:0,
     acropperTop:0,
     protionSize:1,
     className:'',
     classId:0,
     personnelType:0,
     schoolClassList:'',
     skip:0
    },
    getters: {
       getStudentCount(state){
          return state.studentCount
       },
       getDailyActive(state){
          return state.dailyActive
       },
       getMonthActive(state){
         return state.monthActive
       },
       getTeacherCount(state){
         return state.teacherCount 
       },
       getLeaveTotal(state){
          return state.leaveTotal
       },
       getLateTotal(state){
         return state.lateTotal
       },
       getEarlyTotal(state){
         return state.earlyTotal
       },
       getEscapeTotal(state){
         return state.escapeTotal
       },
       getClassStudentCount(state){
         return state.classStudentCount
       },
       getResourceIds(state){
         return state.resourceIds
       },
       getType(state){
         return state.type
       },
       getAcroppertype(state){
         return state.acropperType
       },
       getAcropperTop(state){
         return state.acropperTop
       },
       getAcropperTop(state){
         return state.protionSize
       },
       getClassName(state){
         return state.className
       },
       getClassId(state){
         return state.classId
       },
       getPersonnelType(state){
         return state.personnelType 
       },
       getSchoolClassList(state){
          return state.schoolClassList
       },
       getSkip(state){
         return state.skip
       }
    },
    mutations:{
     setSchoolId(state,n){
     state.schoolId=n
    },
    setUserId(state,n){
      state.userId=n
     },
    setType(state,n){
    state.type=n
    },
    setBata(state,n){
     state.bata=n
    },
    setLeaveTotal(state,n){
        state.leaveTotal=n
    },
    setTeacherCount(state,n){
       state.teacherCount=n
    },
    setStudentCount(state,n){
        state.studentCount=n
     },
     setDailyActive(state,n){
        state.dailyActive=n
     },
     setMonthActive(state,n){
        state.monthActive=n
     },
     setLeaveTotal(state,n){
        state.leaveTotal=n
     },
     setLateTotal(state,n){
        state.lateTotal=n
     },
     setEarlyTotal(state,n){
        state.earlyTotal=n
     },
     setEscapeTotal(state,n){
        state.escapeTotal=n
     },
     setClassStudentCount(state,n){
        state.classStudentCount=n
     },
     setResourceIds(state,n){
        state.resourceIds=n
     },
     setSystemHeight(state,n){ 
        state.systemHeight=n
     },
     setAcroppertype(state,n){
        state.acropperType=n
     },
     setAcropperTop(state,n){
        state.acropperTop=n
     },
     setProtionSize(state,n){
      state.protionSize=n
    },
    setClassName(state,n){
      state.className=n
     },
    setClassId(state,n){
       state.classId=n
    },
    setPesonnelType(state,n){
      state.personnelType=n
    },
    setSchoolClassList(state,n){
      state.schoolClassList=n 
    },
    setSkip(state,n){
      state.skip=n
    }
    }
})
export default store