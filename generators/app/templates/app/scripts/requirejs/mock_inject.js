/*global TrdBoss, $*/
Mock.mock('/doctors', 'get',function(url,type,body) {
    //return
    var data=Mock.mock({'array|1-10': [{
        '_id|+1': 1,
        'email': '@EMAIL',
        'name':'@CNAME',
        'image':'@IMAGE'
    }]});
    return data.array;
});