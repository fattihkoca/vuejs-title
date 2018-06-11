/**
 * VueTitle
 */
var VueTitle = {
    install: function(Vue, options) {
        Vue.mixin({
            /**
             * mounted: Called after the instance has been mounted
             */
            mounted: function() {
                if (typeof options == 'object' && typeof options.mounted == 'function') {
                    return options.mounted();
                }
            }
        });

        HTMLElement.prototype.offset = function () {
            var rect = this.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        };

        var setBlur = function () {
                var item = document.body.querySelector('.' + cssClass);
                if (item) {
                    item.style.opacity = 0;
                }

                setTimeout(function () {
                    if (item) {
                        if (item.parentNode) {
                            item.parentNode.removeChild(item);
                        } else {
                            item.remove();
                        }
                    }
                }, blurDelay);
            },
            setPosition = function (el, item, itemArrow) {
                var elOffset = el.offset(),
                    top = elOffset.top,
                    left = elOffset.left,
                    width = el.offsetWidth,
                    height = el.offsetHeight,
                    winWidth = window.innerWidth,
                    winHeight = window.innerHeight,
                    docScrollTop = document.documentElement.scrollTop,
                    docScrollLeft = document.documentElement.scrollLeft,

                    arrowWidth = itemArrow.offsetWidth,
                    arrowHeight = itemArrow.offsetHeight,
                    itemWidth = item.offsetWidth,
                    itemHeight = item.offsetHeight,
                    itemLeft = left - docScrollLeft - ((itemWidth - width) / 2);

                if (itemLeft < minPositionGap) {
                    itemLeft = minPositionGap;
                }

                if (itemLeft + itemWidth > winWidth) {
                    itemLeft = winWidth - itemWidth - minPositionGap;
                }

                item.style.left = itemLeft + 'px';
                itemArrow.style.left = (left - docScrollLeft + (width / 2) - (arrowWidth / 2)) + 'px';
                item.style.top = top - docScrollTop + height + arrowHeight + 'px';
                itemArrow.style.top = top - docScrollTop + height + 'px';

                if (item.offset().top + itemHeight > docScrollTop + winHeight) {
                    item.setAttribute('position', 'top');
                    item.style.top = (top - docScrollTop - itemHeight - arrowHeight) + 'px';
                    itemArrow.style.top = (item.offset().top - docScrollTop + itemHeight + 3) + 'px';
                }

                item.style.opacity = 1;
            };

        var cssClass = 'title',
            blurDelay = 10,
            minPositionGap = 20;

        if (typeof options == 'object') {
            if (options.hasOwnProperty('cssClass')) {
                cssClass = options.cssClass;
            }

            if (options.hasOwnProperty('blurDelay')) {
                blurDelay = options.blurDelay;
            }

            if (options.hasOwnProperty('focusDelay')) {
                focusDelay = options.focusDelay;
            }
        }

        Vue.directive('title', {
            bind: function (el, binding) {
                el.onmouseover = function () {
                    var value = binding.value;

                    setBlur();

                    if (el.hasAttribute('title')) {
                        if (!value) {
                            value = binding.value = el.getAttribute('title');
                        }

                        el.removeAttribute('title');
                    }

                    var item = document.createElement("div"),
                        itemContents = document.createElement("div"),
                        itemArrow = document.createElement("div");

                    item.style.position = itemArrow.style.position = 'fixed';
                    item.style.opacity = 0;
                    item.classList.add(cssClass);
                    item.setAttribute('position', 'bottom');
                    itemContents.classList.add(cssClass + '-contents');
                    itemArrow.classList.add(cssClass + '-arrow');
                    itemContents.innerHTML = value;
                    item.style.zIndex = itemArrow.style.zIndex = 2147483647;

                    item.appendChild(itemContents);
                    item.appendChild(itemArrow);
                    document.body.appendChild(item);

                    setPosition(el, item, itemArrow);
                };

                document.body.onscroll = function () {
                    setBlur();
                };

                el.addEventListener("mouseout", setBlur);
                el.addEventListener("click", setBlur);
            },
            unbind: function() {
                setBlur();
            }
        });
    }
};

module.exports = VueTitle;