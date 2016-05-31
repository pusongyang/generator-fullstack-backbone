我们是中国的开发团队,公司内部主要项目都在使用这套框架。
- 优点: 模块化代码易于维护和阅读。支持requireJS和多种多样的CSS样式库。前后端都是MVC结构,拆分开来也很方便。
- 缺点: 模块化和MVC意味着更多的编码量。 不支持IE8.

Yoman:google公司推出的快速搭建nodejs开发系统的脚手架工具。
Grunt: Grunt是基于Node.js的项目构建工具。它可以自动运行你所设定的任务。主要用于网站的自动化优化脚本处理。
Bower:管理前端JS和CSS库的nodejs工具，可以方便的处理依赖和安装。
Expressjs: ExpressExpress 基于 Node.js 平台的 web 应用开发框架 基于Node.js 平台,快速、开放、极简的 web 开发框架。
Underscore: Underscore 是一个 JavaScript 工具库，它提供了一整套函数式编程的实用功能，但是没有扩展任何 JavaScript 内置对象。 他解决了这个问题：“如果我面对一个空白的 HTML 页面，并希望立即开始工作，我需要什么？” 他弥补了 jQuery 没有实现的功能，同时又是 Backbone 必不可少的部分。
Backbone: Backbone 为复杂Javascript应用程序提供模型(models)、集合(collections)、视图(views)的结构。其中模型用于绑定键值数据和自定义事件；集合附有可枚举函数的丰富API； 视图可以声明事件处理函数，并通过RESTful JSON接口连接到应用程序。
Jquery: jQuery是继prototype之后又一个优秀的Javascript库。它是轻量级的js库 ，它兼容CSS3，还兼容各种浏览器（IE 6.0+, FF 1.5+, Safari 2.0+, Opera 9.0+），jQuery2.0及后续版本将不再支持IE6/7/8浏览器。jQuery使用户能更方便地处理HTML（标准通用标记语言下的一个应用）、events、实现动画效果，并且方便地为网站提供AJAX交互。jQuery还有一个比较大的优势是，它的文档说明很全，而且各种应用也说得很详细，同时还有许多成熟的插件可供选择。
Git:项目代码版本管理工具。
Bootstrap: Bootstrap，来自 Twitter，是目前很受欢迎的前端框架。Bootstrap 是基于 HTML、CSS、JAVASCRIPT 的，它简洁灵活，使得 Web 开发更加快捷。[1]  它由Twitter的设计师Mark Otto和Jacob Thornton合作开发，是一个CSS/HTML框架。Bootstrap提供了优雅的HTML和CSS规范，它即是由动态CSS语言Less写成。Bootstrap一经推出后颇受欢迎，一直是GitHub上的热门开源项目，包括NASA的MSNBC（微软全国广播公司）的Breaking News都使用了该项目。


本系统采用backbone的MVC框架实现单页面应用。前端和后端都使用javascript编写代码。主要使用nodejs技术，脚手架工具：yoman+grunt+bower.后端服务器使用expressjs。前端库：underscore+backbone+jquery
app文件主要存放客户端使用的文件：
	bower_components:存放通过bower安装的库。
	images:存放图片文件夹。
	scripts存放脚本文件夹：
		collections:backbone集合类脚本文件夹。
		helpers:backbone辅助类脚本文件夹。
		models:backbone模型类脚本文件夹。
		routes:backbone路由类脚本文件夹。
		Templates:bakbone模板脚本文件夹。
		vendor:第三方脚本库文件夹。
		views:backbone视图脚本文件夹。
	Config:服务端启动使用到的配置信息。
	Dist:打包文件夹。
	Node_modules:nodejs使用的库文件夹。
server(express服务器端代码):
    api:express MVC controller
    config:express 服务器配置
    models:express MVC models
    routes:express MVC routes
    app.js:express 服务器启动脚本
    helper.js:commonJS 服务器常用函数
test 测试脚本文件夹。
.bowerrc:bower配置文件夹。
.editorconfig:编辑器IDE的通用编码规范。
.gitattributes:Git的属性配置文件。
.jshintrc:jshint javascript的编码规范检查配置文件。
.yo-rc.json:yoman生成工具的配置文件。
bower.json:bower的项目配置文件。
config.rb:compass 使用的ruby的项目配置文件。
gruntfile.js: grunt的自动执行脚本配置文件。
package.json:nodejs的项目配置文件。
karma.conf.js: karma 测试配置.