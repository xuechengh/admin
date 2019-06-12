// 正式
let temporary='http://www.app.huahuaba.net'
// 测试
let formal='http://47.110.64.242:8080' 
let Hurl= formal+'/appServer'
let SchoolId = 194
let UserId = 14230
let local = { 
    temporary(){
        return Hurl
    }
}
let schoolId = {
    temporary(){
        return SchoolId 
    }
}
let userId = {
    temporary(){
        return UserId
    } 
}
export default {
   install:function(vm){
    vm.prototype.$local = local
    vm.prototype.$schoolId = schoolId
    vm.prototype.$userId = userId
   }
  
}