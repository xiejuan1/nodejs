$(".two").on("click", function() {
	$(".eg").addClass("hidden");
	$(".main").show();
	$(".one").css({
		"color": "#92918d"
	});
	$(".two").css({
		"color": "white"
	});
	// fenye();   	  	  
})

$(".one").on("click", function() {
	$(".eg").removeClass("hidden");
	$(".main").hide();
	$(".one").css({
		"color": "white"
	});
	$(".two").css({
		"color": "#92918d"
	});
})
//获取后台评论列表信息

var num;

$.get("/comment/index", function(data) {
	if(!data.code && data.list.length) {
		num = data.list.length;
		console.log(num);
		for(var i = 0; i < num; i++) {
			data.list[i].index = i + 1;
		}

		let list = data.list.slice(0, 5);
		let html = template("commentTemp", {
			list});
		$("tbody").html(html);

		$('#paged').pagination({
			totalData: data.list.length, //数据总条数
			showData: 5,
			current: 1,
			prevContent: '<<',
			nextContent: '>>',
			keepShowPN: true,
			count: 0,
			callback: function(api) {

				let page = api.getCurrent();

				$.post("/page/index", {
					page
				}, function(data) {
					for(var i = 0; i < data.list.length; i++) {
						data.list[i].index = (page-1)*5 + i+1;
					}
					if(!data.code) {
						let html = template("commentTemp", data);
						$("tbody").html(html);
					}

				})

			}
		}, function(pagination) {
			element = pagination;
		});
		
		
		
		
		
		
		

	}
});

/*function fenye(){
					//分页;
 			$("#paged").jqPaginator({
            totalPages: 100,
            visiblePages: 1,
            currentPage: 1,
            prev: '<li class="prev"><a href="javascript:void(0);">&lt;&lt;<\/a><\/li>',
            next: '<li class="next"><a href="javascript:void(0);">&gt;&gt;<\/a><\/li>',
            page: '<li class="page"><a href="javascript:void(0);"> {{page}} <\/a><\/li>',
            onPageChange: function (n) {
              	let number = n;//获取当前页数;
              	$.post("/page/index",{number},function(data){
              		
              		if(!data.code){
              			//console.log(number);
              			var html = template("commentTemp",data);
              			$("tbody").html(html);
              		}
              		/*if(number==1){
              				var count = $(".ids").length;
              				var trs = $(".ids");
              				for (let i=1;i<=count;) {
							$(trs[i-1]).html(i);
							i++;
              				}
              			}else{
              				var skip = (number-1)*10;
              				var count = $(".ids").length+skip;
              				var trs = $(".ids");
              				for (let i=skip;i<=count;) {
								$(trs[i-skip]).html(i);
								i++;
              				}
              			}	
					}
        		
        		
              	});
            }
        });
	}*/

//删除

$("tbody").on("click", "#del", function(e) {
	console.log(this);
	e.preventDefault();
	var _this = this;
	$.post("/commentdelete/index",{
		_id: $(_this).data("id")
	}).done(function(data) {
		if(!data.code) {
			$(_this).parents(".boxed").remove();
		}
	})
})

//处理图片
console.log($("#filed")[0]);
console.log($(".img").find("img")[0]);

$("#filed").on("change", function(e) {
	e.preventDefault();
	var type = this.files[0].type;
	if(type == "image.png" || type == "image/jpeg") {
		//提交二进制图片

		var form = new FormData();
		form.append("upload", this.files[0])
		//异步
		$.ajax({
				url: "/upload",
				type: "POST",
				dataType: "json",
				data: form,
				contentType: false,
				processData: false
			})
			.done(function(res) {
				if(!res.code) {
					$(".img").find("img").attr({
						src: res.img

					})
				}
			})
	}
})

$("#send").on("click", function(e) {
	e.preventDefault();
	var params = {};
	params.img = $(".img").find("img").attr("src");
	params.position = $("#position").val().trim();
	params.company = $("#company").val().trim();
	params.expreience = $("#expreience").val().trim();
	params.type = $("#type").val().trim();
	params.site = $("#site").val().trim();
	params.salary = $("#salary").val().trim();

	if(!params.position || !params.company || !params.expreience || !params.type || !params.site || !params.salary) {
		alert("请填写完整内容。。。");
		return;
	};

	$.post("/addcomment/index", params, function(data) {

	//添加重新获取数据分页
	$.get("/comment/index",function(req,res){
		var page = req.list.length;
	

			$('#paged').pagination({
						totalData:req.list.length, //数据总条数
						showData: 5,
						current: 1,
						prevContent: '<<',
						nextContent: '>>',
						keepShowPN: true,
						count: 0,
						callback: function(api) {
			
							let page = api.getCurrent();
			
							$.post("/page/index", {
								page
							}, function(data) {
								for(var i = 0; i < data.list.length; i++) {
									data.list[i].index = (page-1)*5 + i+1;
								}
								if(!data.code) {
									let html = template("commentTemp", data);
									$("tbody").html(html);
								}
			
							})
			
						}
					}, function(pagination) {
						element = pagination;
					});



});



		$("#position").val(" ");
		$("#company").val("");
		$("#expreience").val("");
		$("#type").val("");
		$("#site").val("");
		$("#salary").val("");
		$(".img").find("img").attr("src", "../imgs/10.jpg");

	});

})

//修改
$("tbody").on("click", "#edit", function(e) {
	e.preventDefault();
	var a = $(this).parents(".boxed");
	$(".img").find("img").attr({
		src: a.find(".imgs").attr("src")
	});
	$("#position").val(a.find(".position").html());
	$("#company").val(a.find(".company").html());
	$("#expreience").val(a.find(".expreience").html());
	$("#type").val(a.find(".type").html());
	$("#site").val(a.find(".site").html());
	$("#salary").val(a.find(".salary").html());

	$("#send").addClass("hidden");
	$("#comfirm").removeClass("hidden");
	$("#comfirm").data("id", $(this).data("id"));
});

//确认修改

$("#comfirm").on("click", function(event) {
	event.preventDefault();
	var params = {};
	params.img = $(".img").find("img").attr("src");
	params.position = $("#position").val().trim();
	params.company = $("#company").val().trim();
	params.expreience = $("#expreience").val().trim();
	params.type = $("#type").val().trim();
	params.site = $("#site").val().trim();
	params.salary = $("#salary").val().trim();
	params._id = $(this).data("id");
	if(!params.position || !params.company || !params.expreience || !params.type || !params.site || !params.salary) {
		alert("请填写完整内容。。。");
		return;
	};

	$.post("/commentupdate/index", params, function(data) {
		//找到修改的是哪个dom节点
		if(!data.code) {
			var a = $("tbody").find(`button[data-id=${params._id}]`).parents(".boxed");
			var html = template("commentTemp", data);
			a.replaceWith(html);
			$("#position").val(" ");
			$("#company").val("");
			$("#expreience").val("");
			$("#type").val("");
			$("#site").val("");
			$("#salary").val("");
			$(".img").find("img").attr("src", "../imgs/10.jpg");
		}
	})
})

//分页布局