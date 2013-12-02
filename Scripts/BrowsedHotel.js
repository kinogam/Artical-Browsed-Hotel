/// <reference path="require.js" />

define([
    "kino.razor",
    "browserStore",
    "exports"
],
    function (razor, browserStore, exports) {
        "use strict";

        var hotelList,
            storeName = "browsed_hotel",
            container,
            templateFn;

        exports.save = function (item) {
            ///<summary>
            ///保存浏览过的酒店数据
            ///</summary>

            var itemIndex = getItemIndex(item);

            if (itemIndex === -1) {
                hotelList.push(item);
            }
            else {
                hotelList[itemIndex] = item;
            }

            updateStore();
            render();
        };

        exports.getDataCount = function () {
            return hotelList.length;
        };

        exports.init = function (options) {
            ///<summary>
            ///初始化
            ///</summary>            

            hotelList = [];
            var storeValue = browserStore.getItem(storeName);
            if (storeValue != null) {
                hotelList = JSON.parse(storeValue);
            }

            if (options != null) {
                container = options.container;
                templateFn = razor(options.template);
                render();
            }
        };

        function updateStore() {
            browserStore.setItem(storeName, JSON.stringify(hotelList));
        }

        function getItemIndex(item) {
            for (var i = 0, len = hotelList.length; i < len; i++) {
                if (hotelList[i].name === item.name) {
                    return i;
                }
            }
            return -1;
        }

        function render() {
            container.innerHTML = razor(templateFn, { data: hotelList })
        }
    });