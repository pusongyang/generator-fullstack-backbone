/*global TrdBoss, $*/
require(['mock'], function(Mock){
    Mock.mock('/doctors', 'get',function(url,type,body) {
        //return
        var data=Mock.mock({'array|5': [{
            '_id|+1': 1,
            'email': '@EMAIL',
            'name':'@CNAME',
            'image':'@IMAGE'
        }]});
        return data.array;
    });
});