<template>
<div>
22222
</div>
</template>
<script>
export default{
    created(){ 
        
      this.$nextTick(function () {
         let stationId=this.$route.params.stationId
         let name=this.$route.params.name
         let activeType=this.$route.params.activeType
         let uploadOrganization=this.$route.params.uploadOrganization
        
         //  (name)
          let pathname
         if(stationId==1||stationId==5){
             if(name){
              pathname= 'coutsewarer'
             }else{
              pathname= '/coutseware/cour'    
             }
             
         }else if(stationId==2){
            pathname= '/atowGridPages'  
         }else if(stationId==3){
             pathname= '/asourceSetting' 
         }else if(stationId==4){
              if(name){
              pathname= name
             }else{
              pathname= '/echarts/echartsContent'    
             }
          
         }else if(stationId==6){
          pathname= name
         }
         //  (pathname)
         if(pathname){
           if(!name){
          this.$router.replace({  
           path: pathname
           })
         }else{
             //  (0)
           this.$router.push({  
           name: pathname,
           params:{
            name:name,
            activeType:activeType,
            uploadOrganization:uploadOrganization,
            activeType:3
            }
           })  
         }  
         }
         
        
         
      })
        
       /* 
      
       */
    }
}
</script>