var Name = [];
var navName = [];
var t = 0;
var message = [];

$('.own span').text(getCookie("username"));
var Own = $('.own span').text();



$.ajax({
	type:'post',
	data:"username="+Own,
	url:'../servlet/GetImage',
	success:function(res){
		$('.own img').attr('src',res);
	},
	error:function(){
		//alert('Ajax bug');
	}
});

function lableclick() {
	$('.lable').click(function() {
		var $_this = $(this);
		var $_thisPrant = $_this.parents('.jj');
		var text = $_thisPrant.find('.who span').text();
		if ($_thisPrant.find('.who b').css('display') == 'block') {
			var index = $_thisPrant.index() - 1;
			$('.jj').find('.who').addClass('who2');
			$('.jj').eq(index).find('.who').removeClass('who2');
			$('.jj').find('.chat').css('zIndex', 0)
			$('.jj').eq(index).find('.chat').css('zIndex', 1);
			t = index;
			$('.jj').find('.who b').hide();
			$('.jj').eq(index).find('b').show();
		}
		var n = Name.indexOf(text);
		Name.splice(n, 1);
		$_thisPrant.remove();
	});
};

function Tabliclick() {
	$('.tabul li')
			.click(
					function() {
						var index = $(this).index();
						$_this = $(this);
						var text = $_this.find('span').text();
						var content = document.getElementById('tabcontent');
						if (Name.indexOf(text) == -1) {
							Name.push(text);
							if (message[index] == undefined) {
								var html = '	<div class="jj"> '
										+ '		<div class="who"> '
										+ '			<span>'
										+ text
										+ '</span> '
										+ '			<b style="display:block"></b> '
										+ '			<label class="lable"><i></i><em></em> '
										+ '			</label> ' + '		</div> '
										+ '		<div class="chat"> ' + '		</div> '
										+ '	</div>';
							} else {
								var html = '	<div class="jj"> '
										+ '		<div class="who"> '
										+ '			<span>'
										+ text
										+ '</span> '
										+ '			<b style="display:block"></b> '
										+ '			<label class="lable"><i></i><em></em> '
										+ '			</label> ' + '		</div> '
										+ '		<div class="chat"> '
										+ message[index] + '		</div> '
										+ '	</div>';
							}
							$('.who').addClass('who2').find('b').hide();
							$('.who').addClass('who2').find('b').eq(
									Name.length - 1).show();
							$('.jj').find('.chat').css('zIndex', 0)
							$('.jj').eq(Name.length - 1).find('.chat').css(
									'zIndex', 1);
							t = Name.length - 1;
							content.innerHTML += html;

							lableclick();
							whoclick();
						} else {
							var n = Name.indexOf(text);
							$('.who').addClass('who2').find('b').hide();
							$('.who').find('b').eq(n).show();
							$('.who').eq(n).removeClass('who2');
							$('.jj').find('.chat').css('zIndex', 0)
							$('.jj').eq(n).find('.chat').css('zIndex', 1);
							t = n;
						}
						$(this).css('background', 'none');
					});
}

function whoclick() {
	$('.who').click(function() {
		var index = $(this).parent().index();
		$('.who').addClass('who2').next('.chat').css('zIndex', 0);
		$(this).removeClass('who2').next('.chat').css('zIndex', 1);
		t = $(this).parent().index();
		$('.who').find('b').hide();
		$(this).find('b').show();
		$(this).css('background', 'none');
	})
};

$('.submit').click(
				function() {
					
					var text = $('textarea').val();
					var who = $('.who').eq(t).find('span').text();
					if (text != '') {
						var date = new Date();
						$('textarea').val('');
						$.ajax({
									type : 'post',
									data:"username="+Own+"&message="+text+"&senduser="+who,
									url : '../servlet/SendAction',
									success : function(res) {
										res=res.trim();
										
										if (res == '1') {
											var html = $('.chat').eq(t).html();
											html += '			<li><font style="color: #7abd54;font-size: 12px;">'
													+ Own
													+ '</font><i>'
													+ date.getFullYear()
													+ '			-'
													+ (date.getMonth() + 1)
													+ '			-'
													+ date.getDate()
													+ '			&nbsp&nbsp&nbsp'
													+ date.getHours()
													+ '			:'
													+ date.getMinutes()
													+ '</i> '
													+ '				<span style="color:#4bb6ca;">'
													+ text
													+ '</span> '
													+ '			</li> ';
											$('.chat').eq(t).html(html);
										}
									},
									error : function() {
										//alert('Ajax bug');
									}
								});
					}
				});

setInterval(
		function() {
			 Own = $('.own span').text();
			$.ajax({
				
						type:'get',
						data:"username="+Own,
						url : '../servlet/Chataction',
                        success:function(res) {
                        	res=res.trim();
							if (res != '') {
								var array = res.split(':');
								//alert(array[0]);
								//alert(array[1]);
								if (Name.indexOf(array[0]) != -1) {
									var index = Name.indexOf(array[0]);
									var date = new Date();
									var html = $('.chat').eq(index).html();
									html += '			<li><font style="color: #2cd4bc;font-size: 12px;">'
											+ array[0]
											+ '</font><i>'
											+ date.getFullYear()
											+ '			-'
											+ (date.getMonth() + 1)
											+ '			-'
											+ date.getDate()
											+ '			&nbsp&nbsp&nbsp'
											+ date.getHours()
											+ '			:'
											+ date.getMinutes()
											+ '</i> '
											+ '				<span style="color:#f98fbc;">'
											+ array[1]
											+ '</span> '
											+ '			</li> ';
									$('.chat').eq(index).html(html);
									if (t != index) {
										$('.who').eq(index).css('background',
												'#ffc99d');
									}

								} else {
									var date = new Date();
									var index = navName.indexOf(array[0]);
									if(index>=0)
									{
									$('.tabul li').eq(index).css('background',
											'#ffc99d');
									var html = '';
									html += '			<li><font style="color: #2cd4bc;font-size: 12px;">'
											+ array[0]
											+ '</font><i>'
											+ date.getFullYear()
											+ '			-'
											+ (date.getMonth() + 1)
											+ '			-'
											+ date.getDate()
											+ '			&nbsp&nbsp&nbsp'
											+ date.getHours()
											+ '			:'
											+ date.getMinutes()
											+ '</i> '
											+ '				<span style="color:#f98fbc;">'
											+ array[1]
											+ '</span> '
											+ '			</li> ';
									message[index] = html;
								}
								}
							}

						},
						error : function() {
							//alert('Ajax bug');
						}
					});
		}, 1000);

$.ajax({
	type : 'get',
	url : '../servlet/OnlineAction',
	success : function(res) {
		res = res.trim();

		var who = res.split('#');
		var html = $('.tabul').html();
		for (var i = 0; i < who.length; i++) {
			var CN = who[i].split('*');
			html += '			<li>' + '				<img src="' + CN[1] + '" alt="">'
					+ '				<span>' + CN[0] + '</span>' + '			</li>';
			navName[i] = CN[0];
		}
		$('.tabul').html(html);
		Tabliclick();
	},
	error : function() {
		//alert('Ajax bug');
	},
});

setInterval(function() {
	$.ajax({
		type : 'get',
		url : '../servlet/OnlineAction',
		success : function(res) {
			res = res.trim();
			var who = res.split('#');
			var html = $('.tabul').html();
			for (var i = 0; i < who.length; i++) {
				var CN = who[i].split('*');
				if (navName.indexOf(CN[0]) == -1) {
					html += '			<li>' + '				<img src="' + CN[1] + '" alt="">'
							+ '				<span>' + CN[0] + '</span>' + '			</li>';
					navName.push(CN[0]);
				}
			}
			$('.tabul').html(html);
			Tabliclick();
		},
	})
}, 10000);
