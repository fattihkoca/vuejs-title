/**
 * VueTitle
 */
const VueTitle = {
    install: (Vue, options) => {
        Vue.mixin({
            mounted: function() {
                if (typeof options === "object" && typeof options.mounted === "function") {
                    return options.mounted();
                }
            }
        });

        HTMLElement.prototype.offset = function () {
            const rect = this.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        };

        let conf = {
            cssClass: "title",
            blurDelay: 10,
            minPositionGap: 20,
            focusDelay: 10,
        };

        const utils = {
            blur() {
                let el = document.body.querySelector("." + conf.cssClass);

                if (el != null && el instanceof Element) {
                    el.style.opacity = "0";
                }

                setTimeout(() => {
                    if (el) {
                        if (el.parentNode) {
                            el.parentNode.removeChild(el);
                        } else {
                            el.remove();
                        }
                    }
                }, conf.blurDelay);
            },
            setPosition(el, item, itemArrow) {
                let elOffset = el.offset(),
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

                if (itemLeft < conf.minPositionGap) {
                    itemLeft = conf.minPositionGap;
                }

                if (itemLeft + itemWidth > winWidth) {
                    itemLeft = winWidth - itemWidth - conf.minPositionGap;
                }

                item.style.left = itemLeft + "px";
                itemArrow.style.left = (left - docScrollLeft + (width / 2) - (arrowWidth / 2)) + "px";
                item.style.top = top - docScrollTop + height + arrowHeight + "px";
                itemArrow.style.top = top - docScrollTop + height + "px";

                if (item.offset().top + itemHeight > docScrollTop + winHeight) {
                    item.setAttribute("position", "top");
                    item.style.top = (top - docScrollTop - itemHeight - arrowHeight) + "px";
                    itemArrow.style.top = (item.offset().top - docScrollTop + itemHeight + 3) + "px";
                }

                item.style.opacity = "1";
            },
            create(el, value) {
                utils.blur();

                let item = document.createElement("div"),
                    itemContents = document.createElement("div"),
                    itemArrow = document.createElement("div");

                item.style.position = itemArrow.style.position = "fixed";
                item.style.opacity = "0";
                item.classList.add(conf.cssClass);
                item.setAttribute("position", "bottom");
                itemContents.classList.add(conf.cssClass + "-contents");
                itemArrow.classList.add(conf.cssClass + "-arrow");
                itemContents.innerHTML = value;
                item.style.zIndex = itemArrow.style.zIndex = "2147483647";

                item.appendChild(itemContents);
                item.appendChild(itemArrow);
                document.body.appendChild(item);

                utils.setPosition(el, item, itemArrow);
            },
            catchValue(el, value) {
                if (el.hasAttribute("title")) {
                    if (!value || value !== el.getAttribute("title")) {
                        value = el.getAttribute("title");
                    }

                    el.removeAttribute("title");
                }

                return value;
            },
            exec(el, binding) {
                utils.blur();

                binding.value = utils.catchValue(el, binding.value);

                if(binding.value) {
                    utils.create(el, binding.value);
                }
            },
            addEvents(el, binding) {
                el.addEventListener("mouseover", () => {
                    utils.exec(el, binding);
                });

                el.addEventListener("mouseout", utils.blur);
                window.addEventListener("click", utils.blur);
                window.addEventListener("scroll", utils.blur);
            },
            removeEvents(el, binding) {
                el.removeEventListener("mouseover", utils.exec);
                window.removeEventListener("click", utils.blur);
                window.removeEventListener("scroll", utils.blur);
            },
        };

        if (typeof options === "object") {
            if (options.hasOwnProperty("cssClass")) {
                conf.cssClass = options.cssClass;
            }

            if (options.hasOwnProperty("blurDelay")) {
                conf.blurDelay = options.blurDelay;
            }

            if (options.hasOwnProperty("focusDelay")) {
                conf.focusDelay = options.focusDelay;
            }
        }

        Vue.directive("title", {
            bind: (el, binding) => {
                utils.addEvents(el, binding);
            },
            unbind: (el, binding) => {
                utils.blur();
                setTimeout(() => {
                    utils.removeEvents(el, binding);
                }, (conf.blurDelay + 1));
            }
        });
    }
};

module.exports = VueTitle;