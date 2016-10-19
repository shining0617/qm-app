//login页面初始化完成后，相当于jquery的ready
$(function(){
	$( "[data-role='header']" ).toolbar({ theme: "e" });  
	$(document).on("pagebeforeshow","#login",navG)
	$(document).on("pagebeforeshow","#home",navG)
	$(document).on("pagebeforeshow","#activity",navG)
	$(document).on("pagebeforeshow","#activityDetail",navG)
	$(document).on("pagebeforeshow","#content",navG)
	$(document).on("pagebeforeshow","#contentDetail",navG)
	$(document).on("pagebeforeshow","#personal",navG);
	$(document).on("pagebeforeshow","#team",navG);
	$(document).on("pagebeforeshow","#guide",navG);
	$(document).on("pagebeforeshow","#allStore",navG);

	$(document).on("pagebeforeshow","#personalDetail",navG);

	$(document).on("pagebeforeshow","#integralDetail",navG);

	$(document).on("pagebeforeshow","#integralDetailT",navG);
	$(document).on("pagebeforeshow","#filterDetail",navG);
	$(document).on("pagebeforeshow","#guideProductDetail",navG);
	$(document).on("pagebeforeshow","#guidePeopletDetail",navG);


	 
	$( "#teamStoreTwo,#teamClerkTwo" ).panel({ 
	   open: function( event, ui ) {
			$(this).prev().css({"opacity":0});
	   },
	   beforeclose: function( event, ui ) {
			$(this).prev().css({"opacity":1});
	  } 
	}); 

	$(".moveList").bind("swipeleft", function(event) {
        var w=$(this).children().innerWidth()+13;
        $(this).animate({"margin-left":-w},"normal",function(){
			$(this).css({"margin-left":0})
        }).children().eq(0).appendTo($(this));
	}).bind("swiperight", function(event) {
        var w=$(this).children().innerWidth()+13;
        $(this).css({"margin-left":-w}).children().last().prependTo($(this));
        $(this).animate({"margin-left":0}); 
	});   

});  


//show nav
function navG(){
	var id=$(this).attr("id");
	
	if(id.indexOf('Detail')>0){
		$(".pageTitle").html("<a href='#' data-role='button' data-rel='back' data-icon='back' class='btnBack'></a>");
		$("nav").hide();  
		if(id=="integralDetail"||"integralDetailT"){  
			$(".collect").hide();
		}else{
			$(".collect").show();
		} 
	}else{
		$(".pageTitle").text($(this).attr("data-navTitle")); 
		$(".collect").hide().prev("nav").show();  
	}
}



