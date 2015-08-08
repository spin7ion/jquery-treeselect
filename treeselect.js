(function($) {
  (function(treeselect) {
    var defaults = {
	options:null,
	loadUrl: null,
	loadUrlData: null,
    };
      
    $.fn.treeselect = function(options) {
      options = $.extend(true, {}, defaults, options);
            

      return this.each(function() {
        var elem = this,
            $elem = $(elem);
	
	if(options.loadUrl!=null){
		/* TODO: make */
	}

	var tree='<ul class="tree"></ul>';

	function insertToTree(node,treeRoot){
		for (var key in node) {
			//console.log(node[key]);
			if('children' in node[key]){
				var optgroup=$('<li class="optgroup">'+key+'</li>');
				var optUl=insertToTree(node[key].children,$('<ul></ul>'));
				optgroup.append(optUl);
				treeRoot.append(optgroup);
			}else{
				var li=$('<li class="option" data-value='+node[key].value+'>'+key+'</li>');
				treeRoot.append(li);
			}
		}
		return treeRoot;
	}

	tree=insertToTree(options.options,$(tree));

	
	var placeholder=$elem.attr('placeholder'),
	    name=$elem.attr('name');
	if(!placeholder){
		placeholder='&nbsp;';
	}

	var $html=$('<div class="treeselect"><span class="holder placeholder" data-placeholder="'+placeholder+'">'+placeholder+'</span><span class="droparrow down">▼</span><input name="'+name+'" type="hidden" class="hiddeninput"/></div>');
	$html.append(tree);
	$elem.replaceWith( $html );	
	$elem=$html;
	
        $holder=$elem.find('.holder'),
        $tree=$elem.find('.tree'),
        $options=$elem.find('.option'),
        $input=$elem.find('.hiddeninput');
          
        $holder.click(function(){
            $tree.stop().slideToggle(200);
        });
        
	$options.click(function(){
            $holder.html($(this).html());
            $holder.removeClass('placeholder');
            $tree.stop().slideUp(200);
            $input.val($(this).attr('data-value'));
        });
	
	$(document).mouseup(function (e){
    		if (!$tree.is(e.target) && $tree.has(e.target).length === 0){
	            $tree.stop().slideUp(200);
    		}
	});



      });
    };
    $.fn[treeselect].defaults = defaults;
  })('treeselect');
})(jQuery);
