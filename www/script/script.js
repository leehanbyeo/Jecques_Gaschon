$(document).ready(function(){
    $(".main").mouseover(function(){
        $(".sub").stop().slideDown();
    });
    $(".main").mouseout(function(){
        $(".sub").stop().slideUp();
    });
    
    $(".mmain>a").click(function(e){
        e.preventDefault();
    });
    
    $(".mmain").click(function(){
        if($(this).children(".msub").is(":visible")){
            $(this).children(".msub").stop().slideUp();
        }else {
            $(this).children(".msub").stop().slideDown();
        }
    });
    
    $("#ham").click(function(){
        $("#mback").fadeIn(200);
        $("#mnav").animate({
            right: "0px"
        },300);
    });
    $("#mback, .msub a").click(function(){
        $("#mback").fadeOut(200);
        $("#mnav").animate({
            right: "-200px"
        },300);
    });
    
    $(".tabbtn").click(function(){
        var th = $(this).index(".tabbtn");
        $(".tabbtn").removeClass("tactive");
        $(".tabcont").hide();
        $(".tabbtn").eq(th).addClass("tactive");
        $(".tabcont").eq(th).show();
    });
    
    $("#btn").click(function(){
        $("#rbox").show();
    });
    
    
});