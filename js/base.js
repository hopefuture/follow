// 顶部fixed效果
function header_fixedModule(){
	dropAnimation();
	function dropAnimation(){
		$(window).scroll(function(){
			var scrollY=window.scrollY,
				header=$('#header_fixed'),
				header_top=header.css('top'),
				_top=0;
			if (scrollY>=300) {
				if (parseInt(header_top)>=0) _top=0;
				else{
					_top=(scrollY-300)/3-111;
					if(_top>=0) _top=0;
				}
			}
			else{
				if (header_top=='-111px') return;
				else{
					_top=-(300-scrollY)/2;
					if (_top<=-111) _top=-111;
				}
			}
			header.css('top',_top+'px');
		});
	}
}

function cooperationModule(){
	submitCooperation();
	select_module();
	validateInput();
	//提交数据
	function submitCooperation(){
		$('.cooperation-button').click(function(){
			stopEventBubble();
			var name=$('#name').val(),
				company_name=$('#company_name').val(),
				email=$('#email').val(),
				phone=$('#phone').val(),
				company_web=$('#company_web').val(),
				address=$('#address').val(),
				start_time=$('#start_time').val(),
				message=$('#message').val(),
				project_type=$('#project_type .input-value').html();
			if(!name||!company_name||!email) return;
			var url='/service/addcooperation.html',
				params={name:name,company_name:company_name,email:email,phone:phone,company_web:company_web,address:address,start_time:start_time,message:message,project_type:project_type};
			getJsonByPost(url,params,function(data){
				if(data&&data.msg=='1'){
					alert('提交信息成功！');
				}
				else{
					alert('提交信息失败，请稍后再试@');
				}
			});
		});
	}

	// 模拟复选框
	function select_module(){
		function showList(){
			$('.select-options').show();
		}
		function hideList(){
			$('.select-options').hide();
		}
		function getRight(){
			$('.select-options ol li').click(function(){

				stopEventBubble();
				var obj=$(this);
				// console.log(obj);
				var _text='';
				if (obj.hasClass('first-one')){
					hideList();return;
				}
				else{
					obj.children('.input-right').show();
					obj.siblings().children('.input-right').hide();
					_text=obj.children('span').html();
				}
				hideList();
				obj.parents('.select-options').siblings('.input-content').children('.input-value').html(_text);
			});
			
		}
		function selectClick(){
			$('.select-simulate').click(function(){
				stopEventBubble();
				showList();
			});
		}
		function bodyClick(){
			$('body').click(function(){
				hideList();
			});
		}
		getRight();
		selectClick();
		bodyClick();
	}
	function validateInput(){
		$('#name,#company_name').keyup(function(){
			validateName($(this));
		});
		$('#name,#company_name').blur(function(){
			validateName($(this));
		});
		$('#email').keyup(function(){
			validateEmail($(this));
		});
		$('#email').blur(function(){
			validateEmail($(this));
		});
		
		function validateName(obj){
			if(obj.val()){
				rightStyle(obj);
			}
			else{
				wrongStyle(obj);
			}
		}
		function validateEmail(obj){
			var _val=obj.val();
			var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (myreg.test(_val)) rightStyle(obj);
			else wrongStyle(obj);
		}
		function rightStyle(obj){
			obj.parents('.input').css('border','solid 1px #e8e8e8');
		}
		function wrongStyle(obj){
			obj.parents('.input').css('border','solid 1px #ED116B');
		}
	}
}

// banner的fixed效果
// function banner_fixed_animation(){
// 	var _top=0;
// 	$(window).scroll(function(){
// 		var obj=$('body')[0],
// 			scrollTop=obj.scrollTop;
// 		$('.banner').css('background-position','center '+scrollTop+'px');
// 	});
// }
//跳转详情页面
function toCaseDetail(){
	$('#case_list ul li').click(function(){
		var option=$(this).attr('data-option');
		var url='';
		if(option){
			url='case-' + option +'.html';
			window.open(url);
		}
		else{
			url='cases.html';
			window.location.href=url;
		}
		
	});
}
//阻止事件冒泡
function stopEventBubble(event){
    var e=event || window.event;

    if (e && e.stopPropagation){
        e.stopPropagation();    
    }
    else{
        e.cancelBubble=true;
    }
}
function getJsonByPost(url,params,callback){
    ajax(url,'POST',params,true,callback);
}
function ajax(url,type,params,async,callback){
    $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        data: params,
        async: async?async:true
    })
    .done(function(data) {
        callback(data);
    })   
}
