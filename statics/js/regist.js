var username = $("#username"),
		pwd = $("#pwd"),
		pwd1 = $("#pwd1"),
		regist = $("#regist"),
		email = $("#email"),
	     sigin = false;
	
		regist.on("click",function(){
			var params = {};
		params.username = username.val().trim();
		params.pwd = pwd.val().trim();
		params.email = email.val().trim();
		
		if(!params.username){
			alert("用户名不能为空");
			sigin = false;
			
		}else{
			sigin = true;
			
		}
		if(!params.pwd){
			alert("密码不能为空");
			sigin = false;
			
		}else{
			sigin = true;
			
		}
		if(!params.email){
			alert("邮箱不能为空");
			sigin = false;
			
		}else{
			sigin = true;
			
		}
		
		var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		
		if(!reg.test(params.email)){
			alert("邮箱格式有误");
			sigin = false;
		}else{
			sigin = true;
			
		}
		
		if(params.pwd !=pwd1.val().trim()){
			alert("密码不匹配");
			sigin = false;
			
		}else{
			sigin = true;
			
		}
		
		if(sigin=true){

		$.post("/regist/index",params,function(data){
			if(!data.code){
			$("#myModal").modal("hide");
					$(".box").hide();
				var html ="你好！"+params.username;
				$(".box1").find(".user").html(html);
					$(".box1").show();
			
			}else{
				alert(data.msg);
				username.val(" ");
				pwd.val(" ");
				pwd1.val("");
				email.val(" ");
				return;	
			}
		})
		
		
	}else{
			alert("注册失败，请重试。。。")
		}	
		
	
		
		});