window.onload=function(){
	jQuery('.selectpicker').selectpicker();
	jQuery('.selectpicker').on('changed.bs.select', function (e) {
	 	jQuery(this).prevAll(".dropdown-toggle").find(".filter-option").css("color","#505050");
	});

	jQuery(".mainDrop").find(".dropdown-menu").find("li").each(function(){
		jQuery(this).click(function(){
			var dropdownHtml=jQuery(this).find(".dropdownPhoto").html();
			var dropdownText=jQuery(this).find(".dropdownText").text();
			var navHtml=jQuery(this).parents(".dropdown-menu").prev(".dropdown-toggle").find(".dropdownPhoto");
			var navText=jQuery(this).parents(".dropdown-menu").prev(".dropdown-toggle").find(".dropdownText");
			navHtml.html(dropdownHtml);
			navText.text(dropdownText); 
		})
	});

	jQuery('.datapicker').each(function(){
		jQuery(this).dateRangePicker(
		{ 
	    	language:'en',
	    	autoClose: true
		}); 
	}) 
    jQuery('.singleDataPicker').each(function(){
        jQuery(this).dateRangePicker(
        { 
            language:'en',
            singleDate : true,
            autoClose: true,
            showShortcuts: false
        }); 
    }) 

	function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader(); 
        	reader.onload = function (e) {
        		var img = jQuery('<img id="dynamic">'); 
				img.attr('src', e.target.result); 
                jQuery('.editorBox').append(img);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    } 
    jQuery("#imgInp").change(function(){
        readURL(this);
        jQuery(this).parent().addClass("active");
    });

    jQuery("#fileInp").change(function(e) {
	    var fileList = e.target.files;
	    var fileName=fileList[0].name;
	    jQuery(".fileName").text(fileName);
	    jQuery(".attachment").css({"display":"block"});
	}); 

    jQuery(".step").delegate(".hirePlat","click",function(){ 
		if(jQuery(this).is(":checked")){
			jQuery(this).parents(".peopleSet").find(".myContactsSelect").removeClass("show");
    		jQuery(this).parents(".peopleSet").find(".hirePlatSelect").addClass("show"); 
	    }else{
	    	jQuery(this).parents(".peopleSet").find(".myContactsSelect").addClass("show");
	    	jQuery(this).parents(".peopleSet").find(".hirePlatSelect").removeClass("show"); 
	    }  
    }).delegate(".myContacts","click",function(){ 
		if(jQuery(this).is(":checked")){ 
    		jQuery(this).parents(".peopleSet").find(".myContactsSelect").addClass("show");
	    	jQuery(this).parents(".peopleSet").find(".hirePlatSelect").removeClass("show"); 
	    }else{
	    	jQuery(this).parents(".peopleSet").find(".myContactsSelect").removeClass("show");
    		jQuery(this).parents(".peopleSet").find(".hirePlatSelect").addClass("show"); 
	    }  
    }).delegate(".delHirePlat","click",function(){
    	jQuery(this).parents(".peopleSet").remove();
    })

    jQuery("#addPSet").click(function(){
    	var cloneE=jQuery(".peopleSet").first().clone();
    	var n=jQuery(".hirePlat").length;
    	var del=jQuery('<div class="delHirePlat"><span class="iconMoon icon-delPp"></span></div>');
    	cloneE.css({"margin-top":"20px"});
    	cloneE.find(".hirePlat").attr("name","pSet"+n);
    	cloneE.find(".myContacts").attr("name","pSet"+n);
    	cloneE.find(".hirePlatSelect").append(del);
    	cloneE.insertBefore(jQuery(this)); 
    });

    jQuery("#finish").click(function(){
    	jQuery(".tab-content").find(".step").find(".col-lg-2").addClass("errorMessage");
    });

    jQuery("#nextStaffSet").click(function(){
    	jQuery("a[href='#staff-set']").attr("aria-expanded","true").parent().addClass("active").prev().removeClass("active").find("a").attr("aria-expanded","false");
    	jQuery("#basic-set").removeClass("active");
    	jQuery("#staff-set").addClass("active");
    });
    jQuery(".returnBack").click(function(){
    	jQuery("a[href='#staff-set']").attr("aria-expanded","false").parent().removeClass("active").prev().addClass("active").find("a").attr("aria-expanded","true");
    	jQuery("#basic-set").addClass("active");
    	jQuery("#staff-set").removeClass("active");
    });

    jQuery('.grid').masonry({
         itemSelector : ".item",
         gutterWidth : 30,
         isAnimated: true
    });

    jQuery("#searchBtn").click(function(){
        jQuery(".categorySearch").toggleClass("active");
    })

    var workingClock;
    function workClock(clockName){
        workingClock = clockName.FlipClock({ 
            clockFace: 'HourlyCounter',
            autoStart: false,
            lang: false,  
            language: 'chinese' 
        });  
        var dataSetTime=clockName.attr("data-time")
        workingClock.setTime(dataSetTime);
        workingClock.setCountdown(true);
        workingClock.start(); 
    } 
    jQuery('.workingTimer').each(function(){
        workClock(jQuery(this)); 
        jQuery(this).parents(".workIng").find(".workingStop").each(function(){
            jQuery(this).click(function(){
                workingClock.stop(); 
                jQuery(this).parents("tr").prevAll('.projectStatus').find(".status").removeClass("working").text("暂停");
                jQuery(this).prev(".workingStart").removeClass("hide"); 
                jQuery(this).addClass("hide"); 
            })
        })
        jQuery(this).parents(".workIng").find(".workingStart").each(function(){ 
            jQuery(this).click(function(){
                workingClock.start();
                jQuery(this).parents("tr").prevAll('.projectStatus').find(".status").addClass("working").text("工作中");
                jQuery(this).next(".workingStop").removeClass("hide"); 
                jQuery(this).addClass("hide");  
            })
        })
    })

    var noClock = jQuery('.noTimer').FlipClock({ 
            clockFace: 'HourlyCounter',
            autoStart: false,
            lang: false,  
            language: 'chinese' 
        });    
    noClock.setTime(64400);
    noClock.setCountdown(true); 
    jQuery('.noTimer').parents(".noWorkStart").find(".noStop").each(function(){
        jQuery(this).click(function(){
            noClock.stop(); 
            jQuery(this).parents("tr").prevAll('.projectStatus').find(".status").removeClass("working").text("暂停");
            jQuery(this).prev(".noStart").removeClass("hide"); 
            jQuery(this).addClass("hide"); 
        })
    })
    jQuery('.noTimer').parents(".noWorkStart").find(".noStart").each(function(){ 
        jQuery(this).click(function(){
            noClock.start(); 
            jQuery(this).parents("tr").prev("tr").removeClass("hide"); 
            jQuery(this).parents("tr").prevAll('.projectStatus').find(".status").addClass("working").text("工作中");
            jQuery(this).next(".noStop").removeClass("hide"); 
            jQuery(this).addClass("hide");  
        })
    })

    var pauseClock = jQuery('.pauseTimer').FlipClock({ 
            clockFace: 'HourlyCounter',
            autoStart: false,
            lang: false,  
            language: 'chinese' 
        });    
    pauseClock.setTime(94400);
    pauseClock.setCountdown(true); 
    jQuery('.pauseTimer').parents(".pauseWork").find(".pauseStop").each(function(){
        jQuery(this).click(function(){
            pauseClock.stop(); 
            jQuery(this).parents("tr").prevAll('.projectStatus').find(".status").removeClass("working").text("暂停");
            jQuery(this).prev(".pauseStart").removeClass("hide"); 
            jQuery(this).addClass("hide"); 
        })
    })
    jQuery('.pauseTimer').parents(".pauseWork").find(".pauseStart").each(function(){ 
        jQuery(this).click(function(){
            pauseClock.start(); 
            jQuery(this).parents("tr").prev("tr").removeClass("hide"); 
            jQuery(this).parents("tr").prevAll('.projectStatus').find(".status").addClass("working").text("工作中");
            jQuery(this).next(".pauseStop").removeClass("hide"); 
            jQuery(this).addClass("hide");  
        })
    })

    setTimeout(function(){
        jQuery(".loading").addClass("hide");
    }, 2000);

    jQuery( ".newTask" ).dialog({
        autoOpen: false,
        width: "620px",
        modal: true,
        close:function(){
            jQuery("#newTaskStepTwo").addClass("moveToRight").prev().removeClass("moveToRight");
            jQuery("#stepBtnNext").removeClass("hide").next().addClass("hide");
        }
    });

    jQuery(".newTaskPp").dialog({
        autoOpen: false,
        width: "320px", 
        modal: true
    })
 
    jQuery( "#createTask" ).click(function() {
      jQuery( ".newTask" ).dialog( "open" );
    });

    jQuery( ".addTaskPp" ).click(function() {
      jQuery( ".newTaskPp" ).dialog( "open" );
    });

    jQuery("#addDocuType").click(function(){
        var cloneE=jQuery(".docuTypeSelect").eq(0).clone(); 
        var del=jQuery('<div class="delHirePlat"><span class="iconMoon icon-delPp"></span></div>');
        cloneE.css({"margin-top":"20px"}); 
        cloneE.append(del);
        cloneE.insertBefore(jQuery(this)); 
    })
    jQuery(".twoSepSelect").delegate(".delHirePlat","click",function(){
        jQuery(this).parent().remove(); 
    })

    jQuery("#stepBtnNext").click(function(){ 
        jQuery("#newTaskStepOne").addClass("moveToRight").next().removeClass("moveToRight");
        jQuery(this).addClass("hide").next().removeClass("hide");
    })
    jQuery("#stepBtnPrev").click(function(){ 
        jQuery("#newTaskStepOne").removeClass("moveToRight").next().addClass("moveToRight");
        jQuery(this).parents(".col-lg-12").addClass("hide").prev().removeClass("hide");
    })

    jQuery(".delTask").find(".icon-delete").click(function(){
        jQuery(this).parents("li").addClass("removeUp");    
        setTimeout(function(){
            jQuery(".removeUp").remove(); 
        }, 600) 
    })
 
    jQuery(".allProPeople").find("li").each(function(){
        var allshow=false;
        jQuery(this).click(function(e){
            if(allshow){
                jQuery(this).removeClass("hasShadow");
                jQuery(this).find(".proBlock").removeClass("showClass");
                allshow=false; 
            }else{ 
                jQuery(this).addClass("hasShadow").siblings().removeClass("hasShadow");
                jQuery(this).find(".proBlock").addClass("showClass").end().siblings().find(".proBlock").removeClass("showClass");
                allshow=true;
                jQuery(document).on("click", function(){
                    jQuery(".allProPeople").find("li").removeClass("hasShadow");
                    jQuery(".proBlock").removeClass("showClass");  
                    allshow=false; 
                });  
                e.stopPropagation();
            } 
        });
        jQuery(".proBlock").on("click", function(e){
            e.stopPropagation();
        });
        jQuery(this).find(".seeMore").dialog({
            autoOpen: false,
            width: "520px", 
            modal: true 
        })  
        jQuery(this).find(".seeMoreLink").click(function(){
                 jQuery(".seeMore").dialog( "open" );
                 console.log("2");  
        })
    }) 
    
}