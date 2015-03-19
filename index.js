

(function ($) {
    'use strict';

    var getDataParams = function ($dom) {

        var result = {};

        $.each($dom[0].attributes, function (attr) {

            result[attr.name] = attr.value;

        });

        return result;
    };

    var initAjaxView = function () {

        $('.ajax-view:not(.ajax-view-started)').each(function () {

            var $dom = $(this);

            $dom.addClass('ajax-view-started');

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

                });

            }).catch(function (e) {

                console.log(e);

            });

        });

    };


    $(document).on('init.ajax-view', initAjaxView);

    $(document).ready(function () {

        $(document).trigger('init.ajax-view');

    });

}(window.jQuery));
