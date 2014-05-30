(function(){
	$('.contentB input').focus(function(){
		$_this = $(this);
		$_this_parents = $(this).parent();
		$_this_parents.find('span').hide();
		if($_this_parents.index() == 0){
			if($_this.val() == '账号：'){
				$_this.val('');
			}
		}
		$_this.addClass('input1');
	}).blur(function(){
		$_this = $(this);
		$_this_parents = $(this).parent();
		$_this_contentB = $_this.parents('.contentB');
		if($_this.val() == ''){
			if($_this_parents.index() == 0){
				$_this.val('账号：');
			}
			$_this.removeClass('input1');
			$_this_parents.find('span').hide();
		}
	});

	$('.login').click(function(){
		var $_p=$('.contentB p');
		var userTag=$('input[name=user]').val();
		var pasTag=$('input[name=password]').val();
		var value='username='+userTag+'&pswd='+pasTag;
		if(pasTag!=''&&userTag!=''){
			$('.login').css('opacity',0.4);
			$('.lock').css('zIndex',1).show();
			$('.xinxi').text('登录中•••').css('opacity',0.6).show();
			$.ajax({
				type:'post',
				data:value,
				url:'../servlet/LoginAction',
				success:function(res){
					res=res.trim();
					if(res=='1'){
						$('.xinxi').text('登录成功').css('opacity',1).fadeTo(1000,0,function(){
							$('.lock').css('zIndex',-1);
							$('.login').css('opacity',1);
							setCookie("username",userTag,"/");
							//alert(document.cookie);
							window.open('../connect/connect.html','_parent');
							
						});
					}else{
						$('.contentB').find('span').text('用户名或密码错误！').show();
						$('.xinxi').text('登录中•••').css('opacity',0.6).hide();
					}
				},
				error:function(){
					alert('Ajax bug');
				}
			});
		}else if(userTag=='账号：'){
			$_p.eq(0).find('span').text('账号为空').css('color','#e4393c').show();
		}else if(pasTag==''){
			$_p.eq(1).find('span').text('密码为空').css('color','#e4393c').show();
		}
	});
})();