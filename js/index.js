$(function(){
	
	var baseUrl = './images/';
	
	var weatherIcons = {
		
		yun:{
			title:'多云',
			icon: 'yun.png'
		},
		
		 qing: {
		  title: '晴',
		  icon: 'qing.png'
		},
		
		lei: {
		  title: '雷阵雨',
		  icon: 'lei.png'
		},
		
		yu: {
		  title: '小雨',
		  icon: 'xiao.png'
		},
		
		 default: {
		  title: '未知',
		  icon: ''
		}
	}
	
	function getWeatherData(city){
		var data = {
			
			appid: '22259629',
			appsecret: 'Ty8wR73G',
			version: 'v6',
			
		};
		
		if (city !== undefined) {
		  data.city = city;
		}
		
		$.ajax({
			type: 'GET',
			url: 'https://www.tianqiapi.com/api',
			data: data,
			dataType: 'jsonp',
			success : function(data){
				// console.log('data ==> ', data);
				$('.location').text(data.city);
				
				
				var weatherData = ['date', 'week', 'tem', 'wea',  'win', 'win_speed', 'win_meter', 'air_tips'];
				
				
				for (var i = 0; i < weatherData.length; i++) {
				  if (weatherData[i] === 'wea') {
				    $('.' + weatherData[i]).css({
				      backgroundImage: 'url(' + baseUrl + (weatherIcons[data.wea_img] == undefined ? weatherIcons.default : weatherIcons[data.wea_img]).icon + ')',
				    });
				  } else {
				    $('.' + weatherData[i]).text(weatherData[i] === 'tem' ? data[weatherData[i]] + '℃' : data[weatherData[i]]);
				  }
				
				}
				
				
				var params = {
				  appid: '22259629',
				  appsecret: 'Ty8wR73G',
				  version: 'v9'
				};
				
				if (city !== undefined) {
				  params.city = city;
				}
				
				
				
				
				$.ajax({
					type: 'GET',
					url: 'https://www.tianqiapi.com/api',
					data: params,
					dataType: 'jsonp',
					success: function (result){
					
					console.log('result ==> ', result);
					
				  //绑定24小时天气数据
					var hoursWeatherData = result.data[0].hours;
					  
					$.each(hoursWeatherData, function (i, v) {
					  
						var $li = $(`<li>
								<div>${v.hours}</div>
								<div class="tu" style="background-image: url('${baseUrl + (weatherIcons[v.wea_img] == undefined ? weatherIcons.default : weatherIcons[v.wea_img]).icon}')"></div>
								<div>${v.tem}℃</div>
								<div>${v.win}</div>
							  </li>`);
						$('#hw').append($li);
					})
				  //未来6天天气
					var futureWeatherData = result.data.slice(1);
					  
					console.log('futureWeatherData ==> ', futureWeatherData);
				  
				  
					$.each(futureWeatherData, function (i, v) {
						var $li = $(`<li class="clearfix">
								  <div>${v.day.replace(/（星期[一二三四五六日]）/, '')}</div>
								  <div>
									<i class="tupian" style="background-image: url('${baseUrl + (weatherIcons[v.wea_img] == undefined ? weatherIcons.default : weatherIcons[v.wea_img]).icon}')"></i>
								  </div>
								  <div>${v.tem2 + '℃ ~' + v.tem1 + '℃'}</div>
								  <div class="w-dir">${v.win[1]}</div>
								</li>`);
						$('#fw').append($li);
						})
				  
					}
				})
			}
		})
		
	}
	
	
	
	
	
	getWeatherData();
	
	//搜索
	$('.search_icon').on('click', function () {
	  //获取搜索城市
	  var city = $('.search_ipt').val();
	
	  if (city == undefined || city.trim() == '') {
	    return;
	  }
	
	  console.log(city);
	
	  $('#hw,#fw').empty();
	
	  getWeatherData(city);
	
	})
	
	
})