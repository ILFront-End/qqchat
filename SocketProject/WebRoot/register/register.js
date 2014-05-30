(function() {
	var userTag = 0;
	var pasTag = 0;
	$('.contentB input').focus(
			function() {
				$_this = $(this);
				$_this_parents = $(this).parent();
				$_this_p = $_this_parents.parent().children();
				if ($_this_parents.index() == 0) {
					if ($_this.val() == '账号：') {
						$_this.val('');
					}
					$_this_parents.find('span').text('有效手机电话号码').css('color',
							'#666').show();
				} else if ($_this_parents.index() == 1) {
					$_this_parents.find('span').text('6-20位字符，可使用字母、数字或_的组合')
							.css('color', '#666').show();
				}
				$_this_parents.find('.ok').hide();
				$_this.addClass('input1');
			}).blur(
			function() {
				$_this = $(this);
				$_this_parents = $(this).parent();
				$_this_contentB = $_this.parents('.contentB');
				if ($_this.val() == '') {
					if ($_this_parents.index() == 0) {
						$_this.val('账号：');
					}
					$_this.removeClass('input1');
					$_this_parents.find('span').hide();
				} else {
					if ($_this_parents.index() == 0) {
						var regex = /^1[358][0 1 2 3 5 6 7 8 9]\d{8}$/g;
						var index = 0;
						if (!regex.test($_this.val())) {
							$_this_parents.find('span').text('手机号码不正确！').css(
									'color', '#e4393c');
						} else {

							$.ajax({
								type : 'post',
								data : 'user=' + $_this.val(),
								url : '../servlet/Checkuser',
								success : function(res) {

									var s = res.trim();
									if (s == '0') {

										$_this_p.eq(index).find('span').hide();
										$_this_p.eq(index).find('.ok').show();
										userTag = 1;
									} else if (s == '1') {

										$_this_p.eq(index).find('span').text(
												'此手机号码已注册！').css('color',
												'#e4393c');
									}
								},
								error : function() {
									alert('Ajax bug');
								}
							});
						}
					} else if ($_this_parents.index() == 1) {
						var regex = /^[0-9a-zA-Z_]{6,20}$/g;
						if (!regex.test($_this.val())) {
							$_this_parents.find('span').text('密码不符合要求！').css(
									'color', '#e4393c');
						} else {
							$_this_parents.find('span').hide();
							$_this_parents.find('.ok').show();
							pasTag = 1;
						}
					}
				}
			});

	$('.register').click(
			function() {

				var $_p = $('.contentB p');
				var value = 'username=' + $('input[name=user]').val()
						+ '&pswd=' + $('input[name=password]').val();
				if (pasTag == 1 && userTag == 1) {
					$('.register').css('opacity', 0.4);
					$('.lock').css('zIndex', 1).show();
					$('.xinxi').text('注册中•••').css('opacity', 0.6).show();
					$.ajax({
						type : 'post',
						data : value,
						url : '../servlet/ResigerAction',
						success : function(res) {
							$('.xinxi').text('注册成功！').css('opacity', 1).fadeTo(
									1000,
									0,
									function() {
										$('.lock').css('zIndex', -1);
										$('.register').css('opacity', 1);
										window.open('../login/login.html',
												'_parent');
									});
						},
						error : function() {
							alert('Ajax bug');
						}
					});
				} else if (userTag == 0) {
					$_p.eq(0).find('span').text('账号为空').css('color', '#e4393c')
							.show();
				} else if (pasTag == 0) {
					$_p.eq(1).find('span').text('密码为空').css('color', '#e4393c')
							.show();
				}
			});
})();