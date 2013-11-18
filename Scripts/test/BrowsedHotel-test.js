/// <reference path="qunit/qunit.js" />
require.config({
    baseUrl: './../',
    paths: {
        "kino.razor": "https://raw.github.com/kinogam/kino.razor/master/lib/kino.razor",
        "browserStore": "https://raw.github.com/kinogam/itour/master/lib/util/itour.util.localStorage"
    }
});


var stubBrowseStore = {};

define("browserStore", function () {
    return { getItem: function (itemName) { return stubBrowseStore[itemName]; }, setItem: function (itemName, itemValue) { stubBrowseStore[itemName] = itemValue; } }
});

require(["BrowsedHotel"], function (BrowsedHotel) {

    module("我浏览过的酒店", {
        setup: function () {
            stubBrowseStore = {};
            BrowsedHotel.init();
        }
    })

    test("保存浏览过的酒店数据", function () {
        equal(BrowsedHotel.getDataCount(), 0);
        BrowsedHotel.save({ name: '广州有色金属酒店', price: 234, url: 'http://hoteltest.clt198.com' });
        equal(BrowsedHotel.getDataCount(), 1);
    });

    test("浏览同一家酒店不会增加浏览记录", function () {
        BrowsedHotel.save({ name: '广州有色金属酒店', price: 234, url: 'http://hoteltest.clt198.com' });
        equal(BrowsedHotel.getDataCount(), 1);
        BrowsedHotel.save({ name: '广州有色金属酒店', price: 234, url: 'http://hoteltest.clt198.com' });
        equal(BrowsedHotel.getDataCount(), 1);
    });

    test("浏览同一家酒店会更新相应的酒店数据", function () {
        BrowsedHotel.save({ name: '广州有色金属酒店', price: 234, url: 'http://hoteltest.clt198.com' });

        BrowsedHotel.save({ name: '广州有色金属酒店', price: 345, url: 'http://hoteltest.clt198.com' });
        equal(JSON.parse(stubBrowseStore["browsed_hotel"])[0].price, 345);
    });

});