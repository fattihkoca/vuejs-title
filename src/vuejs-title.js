/**
 * VueTitle
 */
const VueTitle = {
    install: (Vue, options) => {
        Vue.mixin({
            mounted: function () {
                if (typeof options === "object" && typeof options.mounted === "function") {
                    return options.mounted();
                }
            }
        });

        // To ensure browser compatibility
        if (!HTMLElement.prototype.hasOwnProperty('offset')) {
            HTMLElement.prototype.offset = function () {
                const rect = this.getBoundingClientRect(),
                    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft
                };
            };
        }

        // Variable configurations
        let conf = {
                cssClass: "v-title",
                minPositionGap: 20,
                padding: "5px 10px",
                maxWidth: "250px",
                maxHeight: "50px",
                round: "4px",
                bgColor: "rgba(0,0,0,0.7)",
                textColor: "#FFF",
                fontSize: "14px",
                transitionDuration: 300,
                transitionDelay: 200,
            },
            timeout;

        const document = window.document,
            body = document.body,
            head = document.head,
            style = document.createElement("style"),
            // Ids of constants
            i = {
                title: "title",
                zIndex: 2147483647,
                px: "px",
                position: "position",
                block: "-block",
                fixed: "-fixed",
                upper: "-upper",
                contents: "-contents",
                arrow: "-arrow",
                show: "-show",
                mouseover: "mouseover",
                mouseout: "mouseout",
                click: "click",
                scroll: "scroll",
                arrowBorder: "8px solid",
                arrowMargin: "-0.32px",
                transparent: "transparent",
                supportsTouch: 'ontouchstart' in document.documentElement,
                opacity: "opacity"
            },
            fn = {
                createDiv() {
                    return document.createElement("div");
                },
                nodeExists(node) {
                    return node instanceof Element;
                },
                // The title bubble element
                bubble() {
                    return body.querySelector("." + conf.cssClass);
                },
                // Create the title bubble element
                add(el, value) {
                    clearTimeout(timeout);
                    let bubble = fn.bubble();

                    if (fn.nodeExists(bubble)) {
                        if (el !== bubble.vTitleOrigin) {
                            fn.toggle(el, value, bubble);
                        }
                        return;
                    }

                    bubble = fn.createDiv();
                    let contents = fn.createDiv(),
                        arrow = fn.createDiv();

                    bubble.classList.add(
                        conf.cssClass,
                        conf.cssClass + i.block,
                        conf.cssClass + i.fixed,
                        conf.cssClass + i.upper
                    );
                    bubble.setAttribute(i.position, "bottom");
                    contents.classList.add(
                        conf.cssClass + i.contents,
                        conf.cssClass + i.block
                    );
                    arrow.classList.add(
                        conf.cssClass + i.arrow,
                        conf.cssClass + i.block,
                        conf.cssClass + i.fixed,
                        conf.cssClass + i.upper
                    );
                    contents.innerHTML = value;

                    bubble.appendChild(contents);
                    bubble.appendChild(arrow);
                    body.appendChild(bubble);

                    fn.setPosition(el, bubble, arrow);
                    fn.setOriginData(el, bubble);
                },
                // Update the value of the title bubble element
                toggle(el, value, bubble) {
                    let contents = bubble.querySelector("." + conf.cssClass + i.contents),
                        arrow = bubble.querySelector("." + conf.cssClass + i.arrow);

                    if (fn.nodeExists(contents) && fn.nodeExists(arrow)) {
                        contents.innerHTML = value;

                        fn.setPosition(el, bubble, arrow, true);
                        fn.setOriginData(el, bubble);
                    }
                },
                // Remove the title bubble element
                destroy(e, target, bubble) {
                    let mouseout = e && e.type === i.mouseout,
                        origin = bubble.vTitleOrigin;

                    if (!fn.nodeExists(bubble) || (mouseout && target !== origin)) {
                        return;
                    }

                    bubble.parentNode ? bubble.parentNode.removeChild(bubble) : bubble.remove();
                },
                // On mouseout
                blur(e) {
                    let bubble = fn.bubble();

                    if (!fn.nodeExists(bubble)) {
                        return;
                    }

                    timeout = setTimeout(() => {
                        fn.destroy(e, this, bubble);
                    }, conf.transition + conf.transitionDelay);
                },
                // On mouseover
                focus(el, binding) {
                    binding.value = fn.getTitle(el, binding.value);

                    if (binding.value) {
                        fn.add(el, binding.value);
                    }
                },
                // Set the bubble's and arrow's positions
                setPosition(el, bubble, arrow, toggle = false) {
                    let elOffset = el.offset(),
                        top = elOffset.top,
                        left = elOffset.left,
                        width = el.offsetWidth,
                        height = el.offsetHeight,
                        winWidth = window.innerWidth,
                        winHeight = window.innerHeight,
                        docScrollTop = document.documentElement.scrollTop,
                        docScrollLeft = document.documentElement.scrollLeft,
                        arrowWidth = arrow.offsetWidth,
                        arrowHeight = arrow.offsetHeight,
                        bubbleWidth = bubble.offsetWidth,
                        bubbleHeight = bubble.offsetHeight,
                        bubbleLeft = left - docScrollLeft - ((bubbleWidth - width) / 2);

                    if (bubbleLeft < conf.minPositionGap) {
                        bubbleLeft = conf.minPositionGap;
                    }

                    if (bubbleLeft + bubbleWidth > winWidth) {
                        bubbleLeft = winWidth - bubbleWidth - conf.minPositionGap;
                    }

                    bubble.style.left = bubbleLeft + i.px;
                    arrow.style.left = (left - docScrollLeft + (width / 2) - (arrowWidth / 2)) + i.px;
                    bubble.style.top = top - docScrollTop + height + arrowHeight + i.px;
                    arrow.style.top = top - docScrollTop + height + i.px;

                    if (bubble.offset().top + bubbleHeight > docScrollTop + winHeight) {
                        bubble.setAttribute(i.position, "top");
                        bubble.style.top = (top - docScrollTop - bubbleHeight - arrowHeight) + i.px;
                        arrow.style.top = (bubble.offset().top - docScrollTop + bubbleHeight + 3) + i.px;
                    }

                    if (!toggle) {
                        setTimeout(() => {
                            bubble.classList.add(conf.cssClass + i.show);
                        }, 0);
                    }
                },
                // Origin data is held to control events
                setOriginData(el, bubble) {
                    bubble.vTitleOrigin = el;
                },
                getTitle(el, value) {
                    if (el.hasAttribute(i.title)) {
                        if (!value || value !== el.getAttribute(i.title)) {
                            value = el.getAttribute(i.title);
                        }

                        el.removeAttribute(i.title);
                    }

                    return value;
                },
                addEvents(el, binding) {
                    el.addEventListener(i.mouseover, () => {
                        fn.focus(el, binding);
                    });

                    el.addEventListener(i.mouseout, fn.blur);
                    window.addEventListener(i.click, fn.blur);
                    window.addEventListener(i.scroll, fn.blur);
                },
                removeEvents(el) {
                    el.removeEventListener(i.mouseover, fn.focus);
                    el.removeEventListener(i.mouseout, fn.blur);
                    window.removeEventListener(i.click, fn.blur);
                    window.removeEventListener(i.scroll, fn.blur);
                },
                // Convert milliseconds to seconds
                convertMS2Second(number) {
                    return number / 1000;
                },
                // Title bubble styles
                initStyles() {
                    let classSlc = "." + conf.cssClass,
                        classSlcParent = classSlc + " " + classSlc;

                    style.setAttribute('type', "text/css");
                    style.innerHTML = classSlc + i.block + "{display:block}"
                        + classSlc + i.fixed + "{position:fixed}"
                        + classSlc + i.upper + "{z-index:" + i.zIndex + "}"
                        + classSlc + classSlc + i.show + "{" + i.opacity + ":1}"
                        + classSlc + "{background:" + conf.bgColor + ";border-radius:" + conf.round + ";" + i.opacity + ":0;transition:" + i.opacity + " " + fn.convertMS2Second(conf.transitionDuration) + "s " + fn.convertMS2Second(conf.transitionDelay) + "s}"
                        + classSlcParent + i.contents + "{padding:" + conf.padding + ";max-width:" + conf.maxWidth + ";max-height:" + conf.maxHeight + ";color:" + conf.textColor + ";font-size:" + conf.fontSize + ";overflow:hidden;word-break:break-all}"
                        + classSlcParent + i.arrow + "{width:0;height:0;border-left:" + i.arrowBorder + " " + i.transparent + ";border-right:" + i.arrowBorder + " " + i.transparent + "}"
                        + classSlc + "[position=bottom] " + classSlc + i.arrow + "{border-bottom:" + i.arrowBorder + " " + conf.bgColor + ";margin-bottom:" + i.arrowMargin + "}"
                        + classSlc + "[position=top] " + classSlc + i.arrow + "{border-top:" + i.arrowBorder + " " + conf.bgColor + ";margin-top:" + i.arrowMargin + "}";

                    head.appendChild(style);
                },
            };

        // Update configurations
        if (typeof options === "object") {
            for (let k in conf) {
                if (options.hasOwnProperty(k)) {
                    conf[k] = options[k];
                }
            }
        }

        Vue.directive(i.title, {
            bind: (el, binding) => {
                if (!i.supportsTouch) {
                    fn.addEvents(el, binding);
                }
            },
            unbind: (el, binding) => {
                fn.blur();
                fn.removeEvents(el);
            },
            inserted: () => {
                if (!i.supportsTouch) {
                    fn.initStyles();
                }
            }
        });
    }
};
module.exports = VueTitle;