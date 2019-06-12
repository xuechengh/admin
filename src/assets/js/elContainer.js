$(function(){
 
   $.watch=function(){
    $.fn.watch = function (callback) {
      return this.each(function () {
          // 缓存以前的值  
          $.data(this, 'originVal', $(this).val());

          // event  
          $(this).on('keyup paste', function () {
              var originVal = $.data(this, 'originVal');
              var currentVal = $(this).val();

              if (originVal !== currentVal) {
                  $.data(this, 'originVal', $(this).val());
                  callback(currentVal);
              }
          });
      });
  }
   }
   $.watch()
    // alert($(document).width())
    

  
    $documentWidth=$(document).width()
    $maxWidth=100
    $minWidth=70
    $k=null
 
    $.modelBlock=function(){
     
     
    $('.modelBlock ').each(function(i,elem){
      
      $elemWidth=$(elem).outerWidth()
      $elemHeight=$(elem).outerHeight()
      
      $ratio=$elemWidth/$elemHeight
      $w=$k

    
     $(elem).find('img').css({
        'width':$w,
        'height':$w 
     })
     $(elem).find('.pictureAccompany').css({
      'width':$w,
      'height':$w 
    })
    $(elem).find('.pictureAccompany').children('.genre').css({
      'position':'absolute',
      'bottom':0,
      'width':$w,
      'opacity':'0.35'
    })
    $h=$w/$ratio
    $(elem).css({
        'width':$w
    })
    $w=$(elem).outerWidth()
    
      $num=parseInt($documentWidth/$w)
      $surplus=$documentWidth-$num*$w
      if($surplus>=0){
        $m=$surplus/($num+1)
      }
     
    
     $(elem).css({
        'margin-left':'8px'
      })
      
     
         
      
      
    })
}
$.finalWidth=function(){
    for(var e=$minWidth;e<=$maxWidth;$maxWidth--){
           if(($documentWidth-36)/$maxWidth>=4){
            $k=$maxWidth
          //  //  ('-------')
           // //  ($k)
            break;
           }
    } 
    $.modelBlock() 
  } 
 $.finalWidth()



})