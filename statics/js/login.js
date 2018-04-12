var usernames = $("#usernames"),pwdes = $("#pwds"),login = $("#login");


login.on("click",function(e){
	e.preventDefault();
	var params = {};
	params.username = usernames.val().trim();
	params.pwd = pwdes.val().trim();
	
	if(!params.username ||!params.pwd){
		alert("用户名或密码不能为空");
		return;
	}
	
	 $.post('/login/index', params, function(data) {
	    	  //console.log(data);
	    	  if(!data.code){
	    	  	alert(data.msg);
			$("#myModals").modal("hide");
				
					$(".box").hide();
				var html ="你好！"+params.username;
				$(".box1").find(".user").html(html);
					$(".box1").show();  
	    	  	  
	    	  	$(".eg").addClass("hidden");
	    	  	$(".main").show();
	    	  	  $(".one").css({"color":"#92918d"});
	    	  	  $(".two").css({"color":"white"});
	    	  	  
	    	  }else{
	    	  	  alert(data.msg)
	    	  }
	    });
})

