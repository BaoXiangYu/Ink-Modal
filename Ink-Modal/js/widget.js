/**
 * widget.js: 与UI有关的，如calendar、rich text box、animation等
 */
define(function () {
	function Widget () {
		// 组件容器
		this.boundingBox = null;
	}

	Widget.prototype = {
		/**
		 *	自定义事件
					1.本质：观察者模式
					2.优点：跳出原生事件的限制，提高封装的抽象层级
		 */
		
		//监听自定义事件
		on: function (type, handler) {
			if (typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		//触发自定义事件
		fire: function (type, param) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];

				for (var i = 0; i < handlers.length; i++) {
					handlers[i](param);
				}
			}
		},

		// 接口 渲染组件
		render: function (container) {
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},
		// 接口 销毁组件  
		destroy: function () {
			var $self = this;
			this.destructor(function () {
				//此处是为了先执行完子类的销毁处理函数，再销毁组件
				$self.boundingBox.off();
				$self.boundingBox.remove();
			});
			
		},

		// 新增4个方法,需要由具体的子类来实现
		// 初始化组件结构
		renderUI: function(){
			throw new Error('子类必须重写此方法');
		},
		// 事件监听
		bindUI: function(){
			throw new Error('子类必须重写此方法');
		},
		// 初始化组件属性
		syncUI: function(){
			throw new Error('子类必须重写此方法');
		},
		// 组件销毁前的处理函数
		destructor: function(){
			throw new Error('子类必须重写此方法');
		}
	};

	return {
		Widget: Widget
	};
});