"document" in self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || function (e) {
	"use strict";
	if ("Element" in e) {
		var t = "classList",
			o = "prototype",
			a = e.Element[o],
			s = Object,
			r = String[o].trim || function () {
				return this.replace(/^\s+|\s+$/g, "")
			},
			n = Array[o].indexOf || function (e) {
				for (var t = 0, o = this.length; t < o; t++)
					if (t in this && this[t] === e) return t;
				return -1
			},
			i = function (e, t) {
				this.name = e, this.code = DOMException[e], this.message = t
			},
			d = function (e, t) {
				if ("" === t) throw new i("SYNTAX_ERR", "The token must not be empty.");
				if (/\s/.test(t)) throw new i("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
				return n.call(e, t)
			},
			l = function (e) {
				for (var t = r.call(e.getAttribute("class") || ""), o = t ? t.split(/\s+/) : [], a = 0, s = o.length; a < s; a++) this.push(o[a]);
				this._updateClassName = function () {
					e.setAttribute("class", this.toString())
				}
			},
			c = l[o] = [],
			u = function () {
				return new l(this)
			};
		if (i[o] = Error[o], c.item = function (e) {
				return this[e] || null
			}, c.contains = function (e) {
				return ~d(this, e + "")
			}, c.add = function () {
				var e, t = arguments,
					o = 0,
					a = t.length,
					s = !1;
				do {
					e = t[o] + "", ~d(this, e) || (this.push(e), s = !0)
				} while (++o < a);
				s && this._updateClassName()
			}, c.remove = function () {
				var e, t, o = arguments,
					a = 0,
					s = o.length,
					r = !1;
				do {
					for (e = o[a] + "", t = d(this, e); ~t;) this.splice(t, 1), r = !0, t = d(this, e)
				} while (++a < s);
				r && this._updateClassName()
			}, c.toggle = function (e, t) {
				var o = this.contains(e),
					a = o ? !0 !== t && "remove" : !1 !== t && "add";
				return a && this[a](e), !0 === t || !1 === t ? t : !o
			}, c.replace = function (e, t) {
				var o = d(e + "");
				~o && (this.splice(o, 1, t), this._updateClassName())
			}, c.toString = function () {
				return this.join(" ")
			}, s.defineProperty) {
			var h = {
				get: u,
				enumerable: !0,
				configurable: !0
			};
			try {
				s.defineProperty(a, t, h)
			} catch (e) {
				void 0 !== e.number && -2146823252 !== e.number || (h.enumerable = !1, s.defineProperty(a, t, h))
			}
		} else s[o].__defineGetter__ && a.__defineGetter__(t, u)
	}
}(self), function () {
	"use strict";
	var e = document.createElement("_");
	if (e.classList.add("c1", "c2"), !e.classList.contains("c2")) {
		var t = function (e) {
			var t = DOMTokenList.prototype[e];
			DOMTokenList.prototype[e] = function (e) {
				var o, a = arguments.length;
				for (o = 0; o < a; o++) e = arguments[o], t.call(this, e)
			}
		};
		t("add"), t("remove")
	}
	if (e.classList.toggle("c3", !1), e.classList.contains("c3")) {
		var o = DOMTokenList.prototype.toggle;
		DOMTokenList.prototype.toggle = function (e, t) {
			return 1 in arguments && !this.contains(e) == !t ? t : o.call(this, e)
		}
	}
	"replace" in document.createElement("_").classList || (DOMTokenList.prototype.replace = function (e, t) {
		var o = this.toString().split(" "),
			a = o.indexOf(e + "");
		~a && (o = o.slice(a), this.remove.apply(this, o), this.add(t), this.add.apply(this, o.slice(1)))
	}), e = null
}());
var rspcaGarden = {
	init: function () {
		rspcaGarden.responsive.init(), rspcaGarden.dom.init(), rspcaGarden.journey.init(), rspcaGarden.seasons.init(), rspcaGarden.zoompan.init()
	}
};
rspcaGarden.event = {
	trigger: function (e, t) {
		if (window.CustomEvent) var o = new CustomEvent(t);
		else(o = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, {});
		window.dispatchEvent(o)
	}
}, rspcaGarden.dom = {
	init: function () {
		this.canvas = document.querySelector("#garden-widget #main-canvas"), this.allCanvas = document.querySelectorAll(".canvas"), this.canvasbg = this.canvas.querySelectorAll(".canvas-background")[0], this.intros = document.querySelectorAll(".intro"), this.seasonText = document.querySelectorAll(".js-insertSeason"), this.seasonTipTotal = document.querySelectorAll(".js-star-tip-total"), this.header = document.querySelectorAll(".canvas-header")[0], this.headerSeassonStarIndicators = document.querySelectorAll(".canvas-header .star-indicators"), this.headerSeassonHiddenStarIndicators = document.querySelectorAll(".canvas-header .hidden-star-indicators"), this.nextIntros = document.querySelectorAll(".js-intro-next"), this.loadSeasonStars = document.querySelectorAll(".js-load-season-stars"), this.stars = document.querySelector("#garden-widget #stars"), this.hiddenStars = document.querySelector("#garden-widget #hidden-stars"), this.starTip = document.querySelector("#garden-widget #star-tip"), this.starTipText = document.querySelector("#garden-widget #star-tip-text"), this.interimScreen = document.querySelector("#garden-widget #interim-screen"), this.endScreen = document.querySelector("#garden-widget #end-screen"), this.allSeasonsBtn = document.querySelector(".all-seasons-btn"), this.msgAllFound = document.querySelector(".js-message-all-found"), this.msgNotAllFound = document.querySelector(".js-message-not-all-found"), this.breadcrumb = document.querySelector(".breadcrumb"), this.zoomButtons = document.querySelector(".zoom-buttons"), this.starTipsFound = document.querySelectorAll(".js-star-tip-found"), this.footer = document.querySelector("#garden-widget footer")
	},
	getCurrentStarIndicators: function () {
		return document.querySelectorAll(".star-indicators--" + rspcaGarden.seasons.getSeason())
	},
	getCurrentHiddenStarIndicators: function () {
		return document.querySelectorAll(".hidden-star-indicators--" + rspcaGarden.seasons.getSeason())
	},
	getCurrentSeasonGoToButtons: function () {
		return document.querySelectorAll('a.btn[href="#' + rspcaGarden.seasons.getSeason() + '"]')
	},
	getCurrentAnimationSet: function () {
		return document.getElementById("animations-" + rspcaGarden.seasons.getSeason())
	},
	getSeasonTipFound: function () {
		return document.querySelectorAll(".js-star-tip-found-" + rspcaGarden.seasons.getSeason())
	},
	getAncestor: function (e, t) {
		for (;
			(e = e.parentElement) && !e.classList.contains(t););
		return e
	}
}, rspcaGarden.responsive = {
	xsmall: window.matchMedia("(max-width: 694px)"),
	small: window.matchMedia("(min-width: 695px)"),
	large: window.matchMedia("(min-width: 855px)"),
	isXSmall: function () {
		return this.xsmall.matches
	},
	isSmall: function () {
		return this.small.matches
	},
	isLarge: function () {
		return this.large.matches
	},
	isWhat: function () {
		return this.isXSmall() ? "XSMALL" : this.isLarge() ? "LARGE" : "SMALL"
	},
	init: function () {
		this.xsmall.addListener(function (e) {
			e.matches ? (console.log("enter xsmall"), rspcaGarden.dom.starTip.style = "") : (console.log("exit xsmall"), rspcaGarden.zoompan.reset(), rspcaGarden.dom.starTip.style = "")
		}), this.small.addListener(function (e) {
			e.matches ? console.log("enter small") : console.log("exit small")
		}), this.large.addListener(function (e) {
			e.matches ? console.log("enter large") : console.log("exit large")
		})
	}
}, rspcaGarden.journey = {
	init: function () {
		this.currentIntro = 0, Array.prototype.forEach.call(rspcaGarden.dom.nextIntros, function (e) {
			e.addEventListener("click", function () {
				rspcaGarden.journey.goToNextIntro()
			})
		}), Array.prototype.forEach.call(rspcaGarden.dom.loadSeasonStars, function (e) {
			e.addEventListener("click", function () {
				rspcaGarden.seasons.loadSeasonStars()
			})
		})
	},
	goToIntro: function (e) {
		Array.prototype.forEach.call(rspcaGarden.dom.intros, function (e) {
			e.classList.remove("ds-b")
		}), rspcaGarden.dom.intros[e].classList.add("ds-b"), this.currentIntro = e
	},
	goToNextIntro: function () {
		this.goToIntro(this.currentIntro + 1)
	},
	hideAllIntros: function () {
		rspcaGarden.data.seenIntro = !0, Array.prototype.forEach.call(rspcaGarden.dom.intros, function (e) {
			e.classList.remove("ds-b")
		})
	},
	goToInterimScreen: function () {
		rspcaGarden.seasons.areAllSeasonsComplete() ? this.goToEndScreen() : (location.hash = "progressGarden", rspcaGarden.seasons.closeStarTip(!0), rspcaGarden.seasons.checkAndShowHiddenStars(), rspcaGarden.journey.hideAllIntros(), rspcaGarden.zoompan.reset(), rspcaGarden.dom.footer.classList.add("ds-n"), rspcaGarden.seasons.data.complete ? (rspcaGarden.dom.msgAllFound.classList.remove("ds-n"), rspcaGarden.dom.msgNotAllFound.classList.add("ds-n"), Array.prototype.forEach.call(rspcaGarden.dom.getCurrentSeasonGoToButtons(), function (e) {
			e.classList.add("btn--pink")
		})) : (rspcaGarden.dom.msgAllFound.classList.add("ds-n"), rspcaGarden.dom.msgNotAllFound.classList.remove("ds-n")), rspcaGarden.dom.stars.classList.remove("ds-b"), rspcaGarden.dom.interimScreen.classList.remove("ds-n"), rspcaGarden.dom.canvas.classList.add("canvas--blurred", "canvas--force-aspect-sm"), rspcaGarden.dom.canvas.classList.remove("canvas--force-aspect"), rspcaGarden.dom.allSeasonsBtn.classList.remove("ds-b-sm"), rspcaGarden.dom.header.classList.add("ds-n"), rspcaGarden.dom.header.classList.remove("ds-b"), rspcaGarden.dom.zoomButtons.classList.remove("ds-b-xs"), rspcaGarden.dom.getCurrentAnimationSet().classList.add("ds-n"))
	},
	goToEndScreen: function () {
		location.hash = "complete", rspcaGarden.seasons.closeStarTip(!0), rspcaGarden.seasons.checkAndShowHiddenStars(), rspcaGarden.journey.hideAllIntros(), rspcaGarden.zoompan.reset(), Array.prototype.forEach.call(rspcaGarden.dom.getCurrentSeasonGoToButtons(), function (e) {
			e.classList.add("btn--pink")
		}), rspcaGarden.dom.footer.classList.add("ds-n"), rspcaGarden.dom.stars.classList.remove("ds-b"), rspcaGarden.dom.endScreen.classList.remove("ds-n"), rspcaGarden.dom.canvas.classList.add("canvas--blurred", "canvas--force-aspect-sm"), rspcaGarden.dom.canvas.classList.remove("canvas--force-aspect"), rspcaGarden.dom.allSeasonsBtn.classList.remove("ds-b-sm"), rspcaGarden.dom.header.classList.add("ds-n"), rspcaGarden.dom.header.classList.remove("ds-b"), rspcaGarden.dom.zoomButtons.classList.remove("ds-b-xs"), rspcaGarden.dom.getCurrentAnimationSet().classList.add("ds-n")
	}
}, rspcaGarden.seasons = {
	init: function () {
		location.hash = "", this.preloadImages(), this.changeSeasonOnHash(), this.addStarClickEvents()
	},
	preloadImages: function () {
		if (document.images) {
			var e = new Image,
				t = new Image,
				o = new Image,
				a = new Image,
				s = new Image;
			e.src = "https://www.rspca.org.uk/webContent/interactiveInfographics/WildlifeInfographic/web/assets/img/spring.jpg", t.src = "https://www.rspca.org.uk/webContent/interactiveInfographics/WildlifeInfographic/web/assets/img/summer.jpg", o.src = "https://www.rspca.org.uk/webContent/interactiveInfographics/WildlifeInfographic/web/assets/img/autumn.jpg", a.src = "https://www.rspca.org.uk/webContent/interactiveInfographics/WildlifeInfographic/web/assets/img/winter.jpg", s.src = "https://www.rspca.org.uk/webContent/interactiveInfographics/WildlifeInfographic/web/assets/img/dusk.jpg"
		}
	},
	changeSeasonOnHash: function () {
		rspcaGarden.seasons.onChangeHash(), window.addEventListener("hashchange", function () {
			rspcaGarden.seasons.onChangeHash()
		}, !1)
	},
	onChangeHash: function () {
		switch (location.hash) {
			case "#summer":
				rspcaGarden.seasons.setSeason("summer");
				break;
			case "#autumn":
				rspcaGarden.seasons.setSeason("autumn");
				break;
			case "#winter":
				rspcaGarden.seasons.setSeason("winter");
				break;
			case "#spring":
				rspcaGarden.seasons.setSeason("spring");
				break;
			case "#dusk":
				rspcaGarden.seasons.setSeason("dusk");
				break;
			case "#all-seasons":
				console.log("go-to-intermin"), rspcaGarden.journey.goToInterimScreen()
		}
	},
	setSeason: function (e) {
		rspcaGarden.dom.interimScreen.classList.add("ds-n"), rspcaGarden.dom.endScreen.classList.add("ds-n"), rspcaGarden.dom.stars.classList.remove("ds-b"), this.closeStarTip(!0), Array.prototype.forEach.call(document.querySelectorAll("#animations div"), function (e) {
			e.classList.add("ds-n")
		}), this.season = e, this.data = rspcaGarden.data[this.season], this.switchBg(), this.setSeasonText(), this.loadSeasonIndicatorStars(), this.updateBreadcrumb(), rspcaGarden.data.seenIntro ? this.loadSeasonStars() : rspcaGarden.journey.goToIntro(1)
	},
	getSeason: function () {
		return this.season
	},
	switchBg: function () {
		Array.prototype.forEach.call(rspcaGarden.dom.allCanvas, function (e) {
			e.classList.remove("canvas--summer", "canvas--autumn", "canvas--winter", "canvas--spring", "canvas--dusk"), e.classList.add("canvas--" + rspcaGarden.seasons.getSeason(), "canvas--blurred")
		}), rspcaGarden.dom.footer.classList.remove("footer--spring", "footer--summer", "footer--autumn", "footer--winter", "footer--dusk"), rspcaGarden.dom.footer.classList.add("footer--" + rspcaGarden.seasons.getSeason())
	},
	loadSeasonIndicatorStars: function () {
		rspcaGarden.dom.headerSeassonStarIndicators[0].classList.add("star-indicators--" + this.getSeason()), rspcaGarden.dom.headerSeassonHiddenStarIndicators[0].classList.add("hidden-star-indicators--" + this.getSeason());
		var e = "";
		Array.prototype.forEach.call(this.data.stars, function (t) {
			e += '<svg class="icon-star ' + (t.found ? " icon-star--solid" : "") + '"><use xlink:href="#star" /></svg>'
		}), Array.prototype.forEach.call(rspcaGarden.dom.getCurrentStarIndicators(), function (t) {
			t.innerHTML = e
		});
		var t = "";
		Array.prototype.forEach.call(this.data.hiddenStars, function (e) {
			t += '<svg class="icon-star ' + (e.found ? " icon-star--solid" : "") + '"><use xlink:href="#star" /></svg>'
		}), Array.prototype.forEach.call(rspcaGarden.dom.getCurrentHiddenStarIndicators(), function (e) {
			e.innerHTML = t
		})
	},
	setSeasonText: function () {
		Array.prototype.forEach.call(rspcaGarden.dom.seasonText, function (e) {
			e.innerHTML = rspcaGarden.seasons.getSeason()
		}), Array.prototype.forEach.call(rspcaGarden.dom.seasonTipTotal, function (e) {
			e.innerHTML = rspcaGarden.seasons.data.stars.length + rspcaGarden.seasons.data.hiddenStars.length
		})
	},
	loadSeasonStars: function () {
		rspcaGarden.journey.hideAllIntros(), rspcaGarden.dom.allSeasonsBtn.classList.add("ds-b-sm"), rspcaGarden.dom.canvas.classList.remove("canvas--blurred", "canvas--force-aspect-sm"), rspcaGarden.dom.canvas.classList.add("canvas--force-aspect"), rspcaGarden.dom.header.classList.remove("ds-n"), rspcaGarden.dom.header.classList.add("ds-b"), rspcaGarden.dom.footer.classList.remove("ds-n");
		var e = "";
		Array.prototype.forEach.call(this.data.stars, function (t, o) {
			e += rspcaGarden.seasons.returnStarHTML(t, o, !1)
		}), Array.prototype.forEach.call(this.data.hiddenStars, function (t, o) {
			e += rspcaGarden.seasons.returnStarHTML(t, o, !0)
		}), rspcaGarden.dom.stars.innerHTML = e, rspcaGarden.dom.stars.classList.add("ds-b"), rspcaGarden.dom.zoomButtons.classList.add("ds-b-xs"), rspcaGarden.dom.breadcrumb.classList.add("ds-b"), rspcaGarden.dom.getCurrentAnimationSet().classList.remove("ds-n")
	},
	returnStarHTML: function (e, t, o) {
		return '<span  class="star' + (o ? " star--hidden" : "") + (o && e.showable ? " star--has-been-found" : "") + ' " style="margin-top:' + this.posnItem(e.top) + ";margin-left:" + this.posnItem(e.left) + ';" data-popup-text="' + e.text + '"data-index="' + t + '" data-flyout-x="' + e.flyoutX + '" data-flyout-y="' + e.flyoutY + '" ><b class="st-overlay"></b><svg class="icon-star-circle' + (e.found ? " icon-star-circle--found" : "") + '"><use xlink:href="#star-circle"></use></svg></span>'
	},
	addStarClickEvents: function () {
		rspcaGarden.dom.stars.addEventListener("click", function (e) {
			console.log(e.target), "stars" != e.target.id && ("SPAN" === e.target.tagName ? rspcaGarden.seasons.populatePositionAndOpenStarTip(e.target) : "DIV" === e.target.tagName ? rspcaGarden.seasons.closeStarTip() : rspcaGarden.seasons.populatePositionAndOpenStarTip(rspcaGarden.dom.getAncestor(e.target, "star")))
		}), rspcaGarden.dom.starTip.querySelectorAll(".icon-cross")[0].addEventListener("click", function () {
			rspcaGarden.seasons.closeStarTip()
		})
	},
	populatePositionAndOpenStarTip: function (e) {
		Array.prototype.forEach.call(document.querySelectorAll("#garden-widget #stars .star"), function (e) {
			e.style.display = "block"
		}), this.starToReshow = e, this.starToReshow.style.display = "none", e.querySelectorAll("svg")[0].classList.add("icon-star-circle--found");
		var t = e.classList.contains("star--hidden"),
			o = Math.ceil(e.getAttribute("data-index"));
		rspcaGarden.dom.starTipText.innerHTML = t ? "<b>Secret Star Tip</b><br />" + e.getAttribute("data-popup-text") : "<b>Star tip " + (o + 1) + "/" + rspcaGarden.seasons.data.stars.length + "</b><br />" + e.getAttribute("data-popup-text"), rspcaGarden.dom.starTip.style.display = "block", rspcaGarden.responsive.isSmall() && (rspcaGarden.dom.starTip.style.marginTop = e.style.marginTop, rspcaGarden.dom.starTip.style.marginLeft = e.style.marginLeft, rspcaGarden.dom.starTip.setAttribute("class", ""), rspcaGarden.dom.starTip.classList.add("flyout-x-" + e.getAttribute("data-flyout-x")), rspcaGarden.dom.starTip.classList.add("flyout-y-" + e.getAttribute("data-flyout-y"))), t ? this.hiddenStarTipIsFound(o) : this.starTipIsFound(o), rspcaGarden.seasons.checkAndShowHiddenStars()
	},
	closeStarTip: function (e) {
		null == e && (e = !1), rspcaGarden.dom.starTip.style.display = "none", void 0 !== this.starToReshow && (this.starToReshow.style.display = "block"), e || this.bothStarTypesFound && !this.data.complete && (this.data.complete = !0, rspcaGarden.journey.goToInterimScreen())
	},
	starTipIsFound: function (e) {
		Array.prototype.forEach.call(rspcaGarden.dom.getCurrentStarIndicators(), function (t) {
			t.querySelectorAll("svg")[e].classList.add("icon-star--solid")
		}), this.data.stars[e].found = !0, this.updateTotalStarsFound()
	},
	hiddenStarTipIsFound: function (e) {
		Array.prototype.forEach.call(rspcaGarden.dom.getCurrentHiddenStarIndicators(), function (t) {
			t.querySelectorAll("svg")[e].classList.add("icon-star--solid")
		}), this.data.hiddenStars[e].found = !0, this.updateTotalStarsFound()
	},
	updateTotalStarsFound: function () {
		var e = Array.prototype.filter.call(this.data.stars, function (e) {
				return e.found
			}),
			t = Array.prototype.filter.call(this.data.hiddenStars, function (e) {
				return e.found
			});
		Array.prototype.forEach.call(rspcaGarden.dom.starTipsFound, function (o) {
			o.innerHTML = e.length + t.length
		}), Array.prototype.forEach.call(rspcaGarden.dom.getSeasonTipFound(), function (o) {
			o.innerHTML = e.length + t.length
		})
	},
	checkAndShowHiddenStars: function () {
		var e = rspcaGarden.seasons.haveAllStarsBeenFound(),
			t = rspcaGarden.seasons.haveAllStarsBeenFound(!0);
		this.bothStarTypesFound = e && t, this.bothStarTypesFound || e && Array.prototype.forEach.call(rspcaGarden.dom.stars.querySelectorAll(".star--hidden"), function (e, t) {
			e.classList.add("star--has-been-found"), rspcaGarden.seasons.data.hiddenStars[t].showable = !0
		})
	},
	haveAllStarsBeenFound: function (e) {
		void 0 === e && (e = !1);
		var t = this.data.stars;
		return e && (t = this.data.hiddenStars), Array.prototype.filter.call(t, function (e) {
			return e.found
		}).length === t.length
	},
	areAllSeasonsComplete: function () {
		return complete = rspcaGarden.data.spring.complete && rspcaGarden.data.summer.complete && rspcaGarden.data.autumn.complete && rspcaGarden.data.winter.complete && rspcaGarden.data.dusk.complete, complete
	},
	updateBreadcrumb: function () {
		Array.prototype.forEach.call(rspcaGarden.dom.breadcrumb.querySelectorAll("a"), function (e) {
			e.classList.remove("active"), e.href.split("#")[1] === rspcaGarden.seasons.getSeason() && e.classList.add("active")
		})
	},
	posnItem: function (e) {
		return e / 990 * 100 + "%"
	}
}, rspcaGarden.data = {
	seenIntro: !1,
	spring: {
		complete: !1,
		stars: [{
			top: 142,
			left: 633,
			flyoutX: "left",
			flyoutY: "top",
			text: "Ideally nest boxes should be facing away from the bird feeders and out of the reach of any cats that may come into the garden.",
			found: !1
		}, {
			top: 390,
			left: 735,
			flyoutX: "left",
			flyoutY: "top",
			text: "Garden birds will be grateful for the food you provide as they raise their young. If offering peanuts, make sure they are aflatoxin-free and the birds can't take whole peanuts from a feeder. They may try and feed them to their young, which could cause the younger bird to choke.",
			found: !1
		}, {
			top: 460,
			left: 190,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Don't forget to shut shed doors - you may end up with unexpected guests who struggle to find their way back out again.",
			found: !1
		}, {
			top: 690,
			left: 191,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Leaving a pile of logs is a great way to attract insects while also providing shelter - they'll also provide a natural food source for birds and other wildlife.",
			found: !1
		}, {
			top: 380,
			left: 448,
			flyoutX: "right",
			flyoutY: "top",
			text: "Bug hotels are another great way to encourage more insects into your garden - they can be as big or small as you have room for! You can buy one or have a go at making your own.",
			found: !1
		}, {
			top: 666,
			left: 900,
			flyoutX: "left",
			flyoutY: "bottom",
			text: "If you have a pond in your garden make sure you have a gentle slope or ramp coming from it to ensure young frogs, toads and mammals can get out easily.",
			found: !1
		}],
		hiddenStars: [{
			top: 460,
			left: 110,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "It's not unusual to find fox cubs left alone in your garden - don't worry the mum (vixen) isn't far away. Keep your eye on them from a distance.",
			found: !1
		}]
	},
	summer: {
		complete: !1,
		stars: [{
			top: 396,
			left: 640,
			flyoutX: "left",
			flyoutY: "top",
			text: "Every day ensure there is fresh water available for garden wildlife and clean bird baths.",
			found: !1
		}, {
			top: 593,
			left: 682,
			flyoutX: "left",
			flyoutY: "bottom",
			text: "If hot weather persists, top up the levels on your pond - preferably with water stored in a water butt rather than from the tap. It is advised to use a misting nozzle on a garden hose to do this, letting it waft over the pond as this cools the air above the surface and aids oxygen absorption.",
			found: !1
		}, {
			top: 710,
			left: 850,
			flyoutX: "left",
			flyoutY: "bottom",
			text: "Plant native wildflowers to encourage bees and butterflies into your garden. If you only have limited space you could plant them in a window box or flower pot. Foxglove, birdsfoot trefoil and musk mallow are great for attracting pollinators.",
			found: !1
		}, {
			top: 572,
			left: 860,
			flyoutX: "left",
			flyoutY: "bottom",
			text: "Snakes are most active at this time of year. June is the breeding season for grass snakes, but don't worry if you see one - leave them alone and they will leave you alone.",
			found: !1
		}, {
			top: 490,
			left: 190,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Don't forget to shut shed doors - you may end up with unexpected guests who struggle to find their way back out again.",
			found: !1
		}, {
			top: 690,
			left: 191,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Leaving a pile of logs is a great way to attract insects while also providing shelter - they'll also provide a natural food source for birds and other wildlife.",
			found: !1
		}, {
			top: 380,
			left: 448,
			flyoutX: "right",
			flyoutY: "top",
			text: "Bug hotels are another great way to encourage more insects into your garden - they can be as big or small as you have room for! You can buy one or have a go at making your own.",
			found: !1
		}],
		hiddenStars: [{
			top: 450,
			left: 58,
			flyoutX: "right",
			flyoutY: "top",
			text: "Support your local hedgehog population by creating a hedgehog highway - leave a gap in your fences to ensure hedgehogs can pass freely from one garden to another. The recommended size for a hedgehog highway hole is 13cm x 13cm.",
			found: !1
		}]
	},
	autumn: {
		complete: !1,
		stars: [{
			top: 550,
			left: 270,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Leave a pile of leaves at the back of flowerbeds or in a corner of your lawn to allow worms to dispose of the leaves. Insects use leaves as shelter - they then become a source of food for the birds. Hedgehogs may also make home in the piles.",
			found: !1
		}, {
			top: 494,
			left: 74,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Hedgehogs will be looking for shelter - consider getting or building a hedgehog house for your garden.",
			found: !1
		}, {
			top: 676,
			left: 678,
			flyoutX: "left",
			flyoutY: "bottom",
			text: "Clear debris from your pond. Leave any vegetation cuttings at the side of the pond for a day or two to allow creatures to escape back into the water.",
			found: !1
		}, {
			top: 530,
			left: 890,
			flyoutX: "left",
			flyoutY: "bottom",
			text: "If you're having a bonfire make sure you check for hedgehogs and other wildlife before lighting it. If you can, build it immediately prior to lighting it to make sure it is clear.",
			found: !1
		}, {
			top: 490,
			left: 190,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Don't forget to shut shed doors - you may end up with unexpected guests who struggle to find their way back out again.",
			found: !1
		}, {
			top: 690,
			left: 191,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Leaving a pile of logs is a great way to attract insects while also providing shelter - they'll also provide a natural food source for birds and other wildlife.",
			found: !1
		}, {
			top: 380,
			left: 448,
			flyoutX: "right",
			flyoutY: "top",
			text: "Bug hotels are another great way to encourage more insects into your garden - they can be as big or small as you have room for! You can buy one or have a go at making your own.",
			found: !1
		}],
		hiddenStars: [{
			top: 150,
			left: 630,
			flyoutX: "left",
			flyoutY: "top",
			text: "As the nights grow longer and colder, some bird species (such as members of the tit family, tawny owls and woodpeckers) will look for nest boxes to roost in for the night.",
			found: !1
		}]
	},
	winter: {
		complete: !1,
		stars: [{
			top: 531,
			left: 410,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Birds rely on our help to feed in the winter months. Offer a variety of food to attract a variety of birds. Some birds such as blackbirds and robins prefer to feed from the ground - if you have a cat-free garden consider using a ground feeding tray. Otherwise offer them food from a shallow dish. Ground feeding can also attract species like wood pigeon (which may discourage other birds) and some rodents too.",
			found: !1
		}, {
			top: 344,
			left: 340,
			flyoutX: "right",
			flyoutY: "top",
			text: "If you have suet balls for birds make sure they are net free. You could have a go at making your own 'homemade bird pudding'.",
			found: !1
		}, {
			top: 150,
			left: 632,
			flyoutX: "right",
			flyoutY: "top",
			text: "Make sure you've got your nest boxes up - many bird species will be grateful to use them as a roosting site during the cold winter nights.",
			found: !1
		}, {
			top: 519,
			left: 890,
			flyoutX: "left",
			flyoutY: "top",
			text: "If you're having a bonfire make sure you check for hedgehogs and other wildlife before lighting it. If you can, build it immediately prior to lighting it to make sure it is clear.",
			found: !1
		}, {
			top: 633,
			left: 740,
			flyoutX: "left",
			flyoutY: "bottom",
			text: "Check your pond every day for ice - toxic gases can build up in a frozen pond and may kill fish or frogs hibernating at the bottom. If a pond freezes over, carefully place a saucepan of hot water on the surface to melt a hole. Never tip boiling water onto ice or break ice with force, as this can harm fish.",
			found: !1
		}, {
			top: 426,
			left: 510,
			flyoutX: "right",
			flyoutY: "left",
			text: "Although badgers stay below ground most of the winter (they don't hibernate), this time of year they have a hard time finding food, particularly their favourite snack, earthworms. Try leaving badgers a little cheese, cooked meat, peanuts or fruit - they will really appreciate it!",
			found: !1
		}, {
			top: 490,
			left: 190,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Don't forget to shut shed doors - you may end up with unexpected guests who struggle to find their way back out again.",
			found: !1
		}, {
			top: 690,
			left: 191,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Leaving a pile of logs is a great way to attract insects while also providing shelter - they'll also provide a natural food source for birds and other wildlife.",
			found: !1
		}, {
			top: 380,
			left: 448,
			flyoutX: "right",
			flyoutY: "top",
			text: "Bug hotels are another great way to encourage more insects into your garden - they can be as big or small as you have room for! You can buy one or have a go at making your own.",
			found: !1
		}],
		hiddenStars: [{
			top: 459,
			left: 630,
			flyoutX: "left",
			flyoutY: "bottom",
			text: "As well as food, birds and other garden wildlife need access to fresh water. If there has been an overnight frost  make sure the water is not frozen. Never put salt or antifreeze in the water.",
			found: !1
		}]
	},
	dusk: {
		complete: !1,
		stars: [{
			top: 160,
			left: 210,
			flyoutX: "right",
			flyoutY: "top",
			text: "As dusk falls bats will come out to feed on insects (especially mosquitos, beetles and moths). All species of bat in the UK hibernate and will be mostly dormant from the first frosts in October or November through to the late frosts of March or April.",
			found: !1
		}, {
			top: 436,
			left: 659,
			flyoutX: "right",
			flyoutY: "top",
			text: "If you have badgers or foxes visiting your garden you may want to leave a small amount of food to attract them in. They love peanuts, cooked meat or perhaps some cheese. Only leave enough to give them a small treat, not enough to replace their natural diet.",
			found: !1
		}, {
			top: 760,
			left: 370,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Hedgehogs will usually only hibernate when the temperature drops. If the weather is mild you may still see them out late into November or December.",
			found: !1
		}, {
			top: 690,
			left: 191,
			flyoutX: "right",
			flyoutY: "bottom",
			text: "Leaving a pile of logs is a great way to attract insects while also providing shelter - they'll also provide a natural food source for birds and other wildlife.",
			found: !1
		}, {
			top: 380,
			left: 448,
			flyoutX: "right",
			flyoutY: "top",
			text: "Bug hotels are another great way to encourage more insects into your garden - they can be as big or small as you have room for! You can buy one or have a go at making your own.",
			found: !1
		}, {
			top: 490,
			left: 190,
			flyoutX: "right",
			flyoutY: "top",
			text: "Don't forget to shut shed doors - you may end up with unexpected guests who struggle to find their way back out again.",
			found: !1
		}],
		hiddenStars: [{
			top: 270,
			left: 830,
			flyoutX: "left",
			flyoutY: "top",
			text: "Owls are predominantly nocturnal. If you are lucky enough to have them where you live look out for them from dusk. However if food is hard to come by, they may be spotted in daylight too.",
			found: !1
		}]
	}
}, rspcaGarden.zoompan = {
	init: function () {
		this.zoomLevel = 1, this.minZoomLevel = 1, this.maxZoomLevel = 3, this.zoomIncrement = .5, document.querySelector(".js-zoom-in").addEventListener("click", function () {
			rspcaGarden.zoompan.zoomIn()
		}), document.querySelector(".js-zoom-out").addEventListener("click", function () {
			rspcaGarden.zoompan.zoomOut()
		}), rspcaGarden.dom.canvas.addEventListener("scroll", function (e) {
			console.log(e)
		})
	},
	zoomIn: function () {
		this.zoomLevel < this.maxZoomLevel && (this.zoomLevel += .5, this.zoom())
	},
	zoomOut: function () {
		this.zoomLevel > this.minZoomLevel && (this.zoomLevel -= .5, this.zoom())
	},
	zoom: function () {
		rspcaGarden.dom.canvasbg.style.width = 100 * this.zoomLevel + "%", rspcaGarden.dom.canvasbg.style.paddingTop = 80 * this.zoomLevel + "%", this.zoomLevel > 1 ? rspcaGarden.dom.canvas.style.overflow = "scroll" : rspcaGarden.dom.canvas.style.overflow = "hidden"
	},
	reset: function () {
		this.zoomLevel = 1, this.zoom()
	}
}, (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? rspcaGarden.init() : document.addEventListener("DOMContentLoaded", rspcaGarden.init);
//# sourceMappingURL=rspcaGarden.js.map