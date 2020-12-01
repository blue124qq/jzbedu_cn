jQuery(function() {
    function c() {
        var b = a("meta[name\x3dARTICLE_NAME]").attr("content");
        null == b && (b = document.title, b.match(/^rspca.org.uk/) && (b = b.substring(b.indexOf("-") + 2)));
        return b;
    }

    var a = jQuery;
    a.noConflict();
    a(document).ready(function() {
        // null == document.getElementById("noPageTracking") && ga("require", "GTM-TM2W2H6");
        a("a[href*\x3d\"asset\x3ddocument\"], a[href*\x3d\"content.\"]").click(function() {
            ga("send", "event", "Document Download", c(), a(this).text().trim());
        });
        a("a[href^\x3d\"http\"]").not("a[href*\x3d\"rspca.org.uk\"]").click(function() {
            ga("send",
                "event", "External Links", c(), a(this).attr("href"));
        });
        a("a[href^\x3d\"https\"]").not("a[href*\x3d\"rspca.org.uk\"]").click(function() {
            ga("send", "event", "External Links", c(), a(this).attr("href"));
        });
        a.cookieBar && a.cookieBar({
            message: "This site uses cookies to provide a great user experience.",
            acceptButton: !0,
            acceptText: "Allow cookies",
            declineButton: !1,
            policyButton: !0,
            policyText: "how we use cookies.",
            policyURL: "https://www.rspca.org.uk/utilities/privacy",
            autoEnable: !0,
            acceptOnContinue: !1,
            forceShow: !1,
            effect: "fade",
            element: "#footerNav",
            append: !0,
            fixed: !0,
            bottom: !0,
            zindex: "100"
        });
        a("#footerSignUp").submit(function(b) {
            b = new Date;
            b.setTime(b.getTime() + 2E4);
            if ("" != a("#footer-emailsignup").val()) {
                var d = a("#footer-emailsignup").val().split("@");
                document.cookie = "cnst_eml\x3d" + d.join("#at#") + ";expires\x3d" + b.toUTCString() + ";path\x3d/";
            }
        });
        a("header.portlet-topper").each(function() {
            var b = a(this).outerHeight();
            a(this).css("margin-top", -5 - b);
            a(this).css("top", b);
        });
    });
});
