<template>
    <div id="mir"  class="right clearfloat fr" style="text-align: center;">
    <i id="shoucang" class="iconfont icon-shoucang"></i>
    <p style="cursor: pointer;" id="btn" class=""><a style="color: #8f8f94;" href="Javascript:window.external.addFavorite(document.location.href,document.title)">收藏</a></p>
</div> 
</template>
<script>
export default {
    data(){return{}},
    methods:{
        Postlist:function(){
        var productID = $requestScope.productID;
        var userID = $requestScope.userID;
    function addbtn(){
         $("#shoucang").addClass('icon-shoucang1').removeClass('icon-shoucang');
         $("#btn").text('已收藏');
     };
     
     function dedlebtn(){
         $("#btn").text('收藏');
         $("#shoucang").addClass('icon-shoucang').removeClass('icon-shoucang1');
     };
     
     $(document).ready(function () {
     if ($message.type == 0){
             dedlebtn();
         }else{
             addbtn();
         }
     });
     $("#mir").click(function() {
         if ($("#btn").text() == '收藏' ) {
             $("#shoucang").addClass('icon-shoucang1').removeClass('icon-shoucang');
             $("#btn").text('已收藏');
         } else {
             $("#btn").text('收藏');
             $("#shoucang").addClass('icon-shoucang').removeClass('icon-shoucang1');
         }
         if($("#btn").text() == '收藏'){
             deleteCollection(productID,userID);
         }
         else{
             addUserCollection(productID,userID);
             
         }
     });
    

     function addUserCollection(productID){
         $.ajax({
             type: "POST",
             url: "collection.do",
             data:{"productID":productID,"userID":userID},
             dataType: "text",
             success:function(data){
                 if(data=="1"){
                     $("#shoucang").addClass('icon-shoucang1').removeClass('icon-shoucang');
                     $("#btn").text('已收藏');
                     
                 }else{
                     $("#btn").text('收藏');
                     $("#shoucang").addClass('icon-shoucang').removeClass('icon-shoucang1');
                 }

             }
         })
     }

     function deleteCollection(productID,userID){
         $.ajax({
             type: "POST",
             url: "deleteUcByUPId.do",
             data:{"productID":productID,"userID":userID},
             dataType: "text",
             success:function(data){
                 if(data=="1"){
                     $("#btn").text('收藏');
                     $("#shoucang").addClass('icon-shoucang').removeClass('icon-shoucang1');
                 }else{
                     $("#shoucang").addClass('icon-shoucang1').removeClass('icon-shoucang');
                     $("#btn").text('已收藏');

                 }

             }
         })
     }
    
        },
    }
}
</script>
<style scoped>

</style>
