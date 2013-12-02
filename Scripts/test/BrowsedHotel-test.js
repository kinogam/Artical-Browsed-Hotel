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
            BrowsedHotel.init({container: document.createElement("div"), template: ''});
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

    test("初始化时从存储读取数据", function () {
        BrowsedHotel.save({ name: '酒店1', price: 234, url: 'http://hoteltest.clt198.com' });
        BrowsedHotel.save({ name: '酒店2', price: 345, url: 'http://hoteltest.clt198.com' });
        BrowsedHotel.init({ container: document.createElement("div"), template: '' });
        equal(BrowsedHotel.getDataCount(), 2);
    });

    test("初始化时，根据模版和数据对容器进行渲染", function () {
        BrowsedHotel.save({ name: '酒店1', price: 234, url: 'http://hoteltest.clt198.com' });
        BrowsedHotel.save({ name: '酒店2', price: 345, url: 'http://hoteltest.clt198.com' });
        var testEl = document.createElement("div");
        BrowsedHotel.init({
            container: testEl,
            template: "@for(var i = 0; i < data.length; i++){<p>@data[i].name</p>}"
        });
        equal(testEl.innerHTML.toLowerCase(), "<p>酒店1</p><p>酒店2</p>");
    });

});