define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {

  var EFFECTS = {
    '1': 'effect1',
    '2': 'effect2',
    '3': 'effect3',
  }

  function InkModal() {
    this.cfg = {
      width: 500,
      height: 'auto',
      title: '系统消息',
      content: '',
      effect: 1, //1: 平滑放大  2：从上滑落
      winType: null,  //弹窗类型
      hasCloseBtn: false,  //关闭按钮
      hasMask: true,  //遮罩
      isDraggable: true,  //是否可拖拽
      dragHandle: null,  //拖拽操控区域
      skinClassName: null,  //主题
      text4AlertBtn: '确定',  //alert 按钮文文字
      text4ConfirmBtn: '确定',  //confirm 主按钮文字
      text4CancelBtn: '取消',  //confirm 次按钮文字
      text4PromptBtn: '确定',  //prompt 主按钮文字
      isPromptInputPassword: false,  //prompt  文本框类型
      defaultValue4PromptInput: '',  //prompt  默认文本
      maxlength4PromptInput: 10,  //prompt  最大可输入数量
      handler4PromptBtn: null, //按钮回调
      handler4AlertBtn: null,
      handler4CloseBtn: null,
      handler4ConfirmBtn: null,
      handler4CancelBtn: null
    };
  }

  InkModal.prototype = $.extend({}, new widget.Widget(), {
    renderUI: function() {
      var footerContent = '';
      switch (this.cfg.winType) {
        case 'alert':
          footerContent = '<input type="button" value="' + this.cfg.text4AlertBtn + '" class="ink-modal-alertBtn">';
          break;
        case 'confirm':
          footerContent = '<input type="button" value="' + this.cfg.text4ConfirmBtn + '" class="ink-modal-confirmBtn"><input type="button" value="' + this.cfg.text4CancelBtn + '" class="ink-modal-cancelBtn">';
          break;
        case 'prompt':
          this.cfg.content += '<p class="ink-modal-promptInputWrapper"><input type="' + (this.cfg.isPromptInputPassword ? "password" : "text") + '" value="' + this.cfg.defaultValue4PromptInput + '" maxlength="' + this.cfg.maxlength4PromptInput + '" class="ink-modal-promptInput"></p>';
          footerContent = '<input type="button" value="' + this.cfg.text4PromptBtn + '" class="ink-modal-promptBtn"><input type="button" value="' + this.cfg.text4CancelBtn + '"  class="ink-modal-cancelBtn">';
          break;
      }

      this.boundingBox = $(
        '<div class="ink-modal-boundingBox"><div class="ink-modal-body"></div></div>'
      );

      if (this.cfg.title) {
        this.boundingBox.prepend('<div class="ink-modal-header">' + this.cfg.title + '</div>');
      }

      if (this.cfg.winType === 'common') {
        if (typeof this.cfg.content === 'object') {
          this.cfg.content.css('display', 'block');
          this.boundingBox.find('.ink-modal-body').html(this.cfg.content);
        } else {
          this.boundingBox.find('.ink-modal-body').html(this.cfg.content);
        }
      } else {
        this.boundingBox.find('.ink-modal-body').html(this.cfg.content);
        this.boundingBox.append('<div class="ink-modal-footer">' + footerContent + '</div>');
      }

      this._promptInput = this.boundingBox.find('.ink-modal-promptInput');      

      if (this.cfg.hasCloseBtn) {
        var closeBtn = $('<span class="ink-modal-closeBtn">X</span>');
        this.boundingBox.append(closeBtn);
      }

      this.boundingBox.appendTo(document.body);
      var $self = this;
      if (this.cfg.hasMask) {
        this._mask = $('<div class="ink-modal-mask"></div>');
        setTimeout(function () {
          $self._mask.appendTo('body');
        }, 10);
      }
    },

    bindUI: function() {
      var that = this;

      this.boundingBox.delegate('.ink-modal-alertBtn', 'click', function() {
        that.fire('alert');
        that.destroy();
      }).delegate('.ink-modal-closeBtn', 'click', function() {
        that.fire('close');
        that.destroy();
      }).delegate('.ink-modal-confirmBtn', 'click', function() {
        that.fire('confirm');
        that.destroy();
      }).delegate('.ink-modal-cancelBtn', 'click', function() {
        that.fire('cancel');
        that.destroy();
      }).delegate('.ink-modal-promptBtn', 'click', function() {
        that.fire('prompt', that._promptInput.val());
        that.destroy();
      });

      if (this.cfg.handler4AlertBtn) {
        this.on('alert', this.cfg.handler4AlertBtn);
      }

      if (this.cfg.handler4CloseBtn) {
        this.on('close', this.cfg.handler4CloseBtn);
      }

      if (this.cfg.handler4PromptBtn) {
        this.on('prompt', this.cfg.handler4PromptBtn);
      }
    },

    syncUI: function() {
      this.boundingBox.css({
        width: this.cfg.width + 'px',
        height: this.cfg.height + 'px',
        left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
        top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
      });

      if (this.cfg.skinClassName) {
        this.boundingBox.addClass(this.cfg.skinClassName);
      }

      var effect = this.cfg.effect,
          $self  = this;

      if (effect) {
        this.boundingBox.addClass(EFFECTS[effect]);
        window.setTimeout(function () {
          $self.boundingBox.addClass('ink-modal-show');
        }, 100);
      }

      // jquery UI 拖拽
      if (this.cfg.isDraggable) {
        $('.ink-modal-header').addClass('move');
        if (this.cfg.dragHandle) {
          this.boundingBox.draggable({
            handle: this.cfg.dragHandle
          });
        } else {
          this.boundingBox.draggable();
        }
      }
    },
    
    destructor: function(cb) {
      var effect = this.cfg.effect;

      if (effect) {
        this.boundingBox.removeClass('ink-modal-show');
      }

      if (typeof this.cfg.content === 'object') {
        this.cfg.content.css('display', 'none');
        this.cfg.content.appendTo(document.body);
      }

      this._mask && this._mask.remove();


      cb && window.setTimeout(cb, 100);
    },

    animate: function () {

    },

    alert: function(cfg) {
      $.extend(this.cfg, cfg, { winType: 'alert' });
      this.render();
      return this;
    },
    confirm: function(cfg) {
      $.extend(this.cfg, cfg, { winType: 'confirm' });
      this.render();
      return this;
    },
    prompt: function(cfg) {
      $.extend(this.cfg, cfg, { winType: 'prompt' });
      this.render();
      this._promptInput.focus();
      return this;
    },
    common: function(cfg) {
      $.extend(this.cfg, cfg, { winType: 'common' });
      this.render();
      return this;
    }
  });
  
  window.InkModal = InkModal;  //暴露给全局

  return {
    InkModal: InkModal
  }
});