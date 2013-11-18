/// <reference path="require.js" />

define([
    "kino.razor",
    "browserStore",
    "exports"
],
    function (razor, browserStore, exports) {
        var hotelList,
            hasInit = false,
            storeName = "browsed_hotel";

        exports.save = function (item) {
            ///<summary>
            ///保存浏览过的酒店数据
            ///</summary>

            if (!hasInit) {
                expots.init();
            }

            var itemIndex = getItemIndex(item);

            if (itemIndex === -1) {
                hotelList.push(item);
            }
            else {
                hotelList[itemIndex] = item;
            }

            updateStore();
        };

        exports.getDataCount = function () {
            return hotelList.length;
        };

        exports.init = function () {
            ///<summary>
            ///初始化
            ///</summary>

            hotelList = [];
            var storeValue = browserStore.getItem(storeName);
            if (storeValue != null) {
                hotelList = JSON.parse(storeValue);
            }
            hasInit = true;
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
    });