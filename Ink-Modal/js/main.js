require.config({
  paths: {
    jquery: 'jquery',
    InkModal: 'ink-modal',
    jqueryUI: 'http://code.jquery.com/ui/1.10.4/jquery-ui'
  }
});

require(['jquery', 'InkModal'], function($, md) {
  var InkModal = md.InkModal;

  $('#a').click(function(){
    var modal = new InkModal();
    modal.alert({
      title: '提示',
      content: 'welcome!',
      width: 300,
      height: 150,
      y: 50,
      hasCloseBtn: true, 
      text4AlertBtn: 'OK',
      dragHandle: '.ink-modal-header',
      handler4AlertBtn: function() {
        console.log('you click the alert button');
      },
      handler4CloseBtn: function() {
        console.log('you click the close button');
      }
    }).on('alert', function(){  console.log('点击弹窗主按钮1！')});

    modal.on('alert', function() {
      console.log('点击弹窗主按钮2！');
    });
    modal.on('alert', function() {
      console.log('点击弹窗主按钮3！');
    });
    modal.on('close', function() {
      console.log('点击弹窗关闭按钮1！');
    });
  });
  
  $('#b').click(function(){
    var modal = new InkModal();

    modal.confirm({
      title: '系统消息',
      content: '您确定要删除这个文件吗?',
      width: 300,
      height: 150,
      y: 50,
      text4ConfirmBtn: '是',
      text4CancelBtn: '否',
      dragHandle: '.ink-modal-header'
    }).on('confirm', function(){
      console.log('确定');
    }).on('cancel', function(){
      console.log('取消');
    });
  });

  $('#c').click(function(){
    var modal = new InkModal();

    modal.prompt({
      title: '请输入您的名字',
      content: '我们将会为您保存您输入的的信息',
      width: 300,
      height: 150,
      y: 50,
      text4PromptBtn: '输入',
      text4CancelBtn: '取消',
      defaultValue4PromptInput: '张三',
      dragHandle: '.ink-modal-header',
      handler4PromptBtn: function(inputValue){
        console.log('您输入的内容是: ' + inputValue);
      },
      handler4CancelBtn: function(){
        console.log('取消');
      }
    });
  });

  $('#d').click(function(){
    modal = new InkModal();   //全局方式调用

    modal.common({
      content: $('#commonBox'),
      width: 400,
      effect: 2,
      y: 50,
      hasCloseBtn: true
    });
  });
  $('#closeCommon').on('click', function () {
    modal.destroy();
  })
  $('#confirmBtn').on('click', function () {
    var modal2 = new InkModal();  //全局方式调用
    modal2.alert({
      title: '提示',
      content: 'welcome!',
      width: 300,
      height: 150,
      y: 100,
      hasCloseBtn: true,
      text4AlertBtn: 'OK',
      dragHandle: '.ink-modal-header',
      skinClassName: 'ink-modal-skin-a',
      handler4AlertBtn: function() {
        console.log('you click the alert button');
      },
      handler4CloseBtn: function() {
        console.log('you click the close button');
      }
    }).on('alert', function(){  console.log('点击弹窗主按钮1！')});
  });

  
});