/*
 * Copyright (c) 2012 Nathan Firth <nathan@firthusa.com>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

//https://github.com/nathanfirth/jQuery-Selectable-Table-Rows


(function($) {
	$.fn.tableSelect = function(options) {
		
		if (!options) {
			var options = {};
		}
	
		var table = $(this);
		var tableRows = $(table).find('tr');
		
		$(table).addClass('tableSelect');

		var clickedClass = 'is-selected';
		var tableFocus = 'focused';
		var lastSelected;
		var originalRow;
		var currentRow;
		
		$(table).click(function() {
			$(table).focus();
		});
					
		$(table).focusin(function() {
			$('table.' + tableFocus).removeClass(tableFocus);
			$(table).addClass(tableFocus);
		});
			
		$.each(tableRows, function() {
			// $(this).children('td').attr('class', '');
			// $(this).children('td').attr('unselectable', 'on');
			$(this).click(function(ev) {
						
				if (ev.shiftKey) {
					var last = tableRows.index(lastSelected);
					var first = tableRows.index(this);
					var start = Math.min(first, last);
					var end = Math.max(first, last)+1;
					if (ev.ctrlKey) {
						// do nothing
					} else {
						$.each(tableRows, function() {
							$(this).removeClass(clickedClass);
						});
					}
					for (var i = start; i < end; i++) {
						if ($(tableRows[i]).hasClass('disabled') === false) {
							$(tableRows[i]).addClass(clickedClass);
						}
					}
					originalRow = lastSelected;
					currentRow = this;					
				}
				else if (ev.ctrlKey) {
					if (this.className.search(clickedClass) > -1) {
						$(this).removeClass(clickedClass);
					} else {
						if ($(this).hasClass('disabled') === false) {
							$(this).addClass(clickedClass);
						}
					}
					lastSelected = this;
					currentRow = this;
					originalRow = this;
				}
				else {
					$.each(tableRows, function() {
						$(this).removeClass(clickedClass);
					});
					if ($(this).hasClass('disabled') === false) {
						$(this).addClass(clickedClass);
						lastSelected = this;
						originalRow = this;
						currentRow = this;
					}
					if (options.onClick) {
						options.onClick(this);
					}
				}
				
				if (options.onChange) {
					options.onChange(this);
				}
				
			});
			$(this).dblclick(function() {
				if (options.onDoubleClick) {
					var thisRow = {};
					thisRow.row = [];
					thisRow.row.push(this);
					options.onDoubleClick(thisRow.row);
				}
			});
		});
		$(table).on('keydown',function(ev){
			
			switch(ev.keyCode) { 
			
				case 16: // User pressed "shift" key
				break;
			
				case 13: // User pressed "enter" key
					if (options.onDoubleClick) {
						var selectedRows = $('tr.is-selected');
						options.onDoubleClick(selectedRows);
					}
				break;
			
				case 38: // User pressed "up" arrow
					navigate('up', ev);
					ev.preventDefault();
				break;
				
				case 40: // User pressed "down" arrow
					navigate('down', ev);
					ev.preventDefault();
				break;

			}
		});

		function navigate(direction, ev) {
		
			if (!lastSelected) {
				lastSelected = $(tableRows[0]);
			}
			
			if (!originalRow) {
				originalRow = $(tableRows[0]);
			}
		
			if (direction === "down") {
				if ($(currentRow).next('tr').length !== 0) {
					newRow = $(currentRow).next('tr');
					currentRow = newRow;
				} else {
					newRow = currentRow;
				}
			}
			else if (direction === "up") {
				if ($(currentRow).prev('tr').length !== 0) {
					newRow = $(currentRow).prev('tr');
					currentRow = newRow;
				} else {
					newRow = currentRow;
				}
			}

			if (!ev.shiftKey) {
				$.each(tableRows, function() {
					$(this).removeClass(clickedClass);
				});
				if ($(newRow).hasClass('disabled') === false) {
					$(newRow).addClass(clickedClass);
					lastSelected = currentRow;
					originalRow = currentRow;
				}
			} else {
				$.each(tableRows, function() {
					$(this).removeClass(clickedClass);
				});
				var last = tableRows.index(newRow);
				var first = tableRows.index(originalRow);
				var start = Math.min(first, last);
				var end = Math.max(first, last)+1;
				for (var i = start; i < end; i++) {
					if ($(tableRows[i]).hasClass('disabled') === false) {
						$(tableRows[i]).addClass(clickedClass);
					}
				}
			}
			
			if (options.onChange) {
				options.onChange(currentRow);
			}
			
		}
		
	};
	
})(jQuery);
