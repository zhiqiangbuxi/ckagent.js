<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h3>
		javascript 检测浏览器版本、内核、操作系统
	</h3>
	<h3>
		函数介绍：
	</h3>
	<p>
		<h4>
			1、C.browser(k,v)
		</h4>
		<div>
		此函数有两个可选参数如果不传任何参数即:
		<br/>
		C.browser(),函数将返回一个包含当前浏览器名称和版本的json对象.example:{“browser”:”ie”,”version”:”7.0″}<br/>
		如果传入一个参数即:C.browser(‘ie’),将检测当前浏览器名称是否正确返回一个布尔值
		<br/>
		如果传入两个参数即:C.browser(‘ie’,’7′),将检测当前浏览器的名称和版本号只有二者都正确的时候才返回true ,反之返回false.
		</div>
	</p>
	<p>
		<h4>
			2、C.engine(k,v);
		</h4>
		<div>
		用法同上只不过是返回浏览器内核信息和检测浏览器内核版本
		</div>
	</p>
	<p>
		<h4>
			3、C.system(k,v);
		</h4>
		<div>
		用法同上只不过是返回操作系统信息和检测操作和版本
		</div>
	</p>
	<p>
		<h4>
			4、可能还会有所疑问的就是我如何知道要检测的浏览器、操作系统、内核的具体字串信息，所以专门写了一个返回可检测信息的函数.
		</h4>
		<div>
			<p>
				C.agent(‘browser’);返回可检测的浏览器名称数组:["ie", "firefox", "safari", "konq", "opera", "chrome"]
			</p>
		<p>
			C.agent(‘system’);返回可检测的操作系统名称数组:["win", "mac", "x11", "iphone", "ipod", "ipad", "ios", "android", "nokiaN", "winMobile", "wii", "ps"]
		</p>
  	<p>
  	C.agent(‘engine’);返回可检测的浏览器内核名称数组:["ie", "gecko", "webkit", "khtml", "opera"]	
  	</p>
		</div>
	</p>
</body>
</html>
  	
