/**
 * ajax-view.js v0.1.4
 * author: Yoshiya Hinosawa ( http://github.com/kt3k )
 * license: MIT
 */

(function ($, qwest, dust) {
    'use strict';

    var CLASS = 'ajax-view';
    var CLASS_INIT = 'ajax-view-initialized';
    var SELECTOR = '.' + CLASS + ':not(.' + CLASS_INIT + ')';

    var EVENT_INIT = 'init.ajax-view';
    var EVENT_LOADED = 'loaded.ajax-view';
    var EVENT_ERROR = 'error.ajax-view';

    var getDataParams = function ($dom) {

        var result = {};

        $.each($dom[0].attributes, function (attr) {

            result[attr.name] = attr.value;

        });

        return result;
    };

    var initAjaxView = function () {

        $(SELECTOR).each(function () {

            var $dom = $(this);

            $dom.addClass(CLASS_INIT);

            var api = $dom.attr('data-api');
            var method = $dom.attr('data-method') || 'get';
            var params = getDataParams($dom);
            var template = $dom.attr('data-template');
            var responseType = $dom.attr('data-response-type') || 'json';


            if (!api) {

                throw new Error('api is not specified: ' + api);

            }

            if (!/^(get|post|put|delete)$/.test(method)) {

                throw new Error('unknown method: ' + method);

            }

            // makes a request
            qwest[method](api, params, {responseType: responseType}).then(function (resp) {

                var templateString = $(template).text().replace(/^\s*|\s*$/g, '');

                dust.renderSource(templateString, resp, function (err, html) {

                    $dom.html(html);

                    $dom.trigger(EVENT_LOADED);

                });

            }).catch(function (e) {

                $dom.trigger(EVENT_ERROR, [e]);

                console.log(e);

            });

        });

    };


    $(document).on(EVENT_INIT, initAjaxView);

    $(document).ready(function () {

        $(document).trigger(EVENT_INIT);

    });

}(window.jQuery, window.qwest, window.dust));
