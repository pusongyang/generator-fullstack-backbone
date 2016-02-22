/**
 * Created by ukyo on 2015/11/9.
 */

var when = require('when'),
    _=require('lodash');
var mongoose = require('mongoose');
var City = {};
var redisClient={};

/**
 * Author:ukyo.pu
 * DES:initHelper
 * @param redisCli redis instance
 */
exports.initHelper = function(redisCli){
    redisClient=redisCli;
};
/**
 * Author:ukyo.pu
 * DES:customCacheData cache data in redisKey
 * @param redisKey cache key in redis
 * @returns promise from when.js promise.
 */
exports.getCacheData = function(redisKey){
    var deferred=when.defer();
    redisClient.get(redisKey, function (err, data) {
        if (err||_.isEmpty(data)) {
            deferred.reject(err);
        }else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};
/**
 * Author:ukyo.pu
 * DES:customCacheData cache data in redisKey
 * @param redisKey cache key in redis
 * @param data cache value in redis
 * @param ttl time life of this record
 * @returns promise from when.js promise.
 */
exports.setCacheData = function(redisKey,data,ttl){
    var deferred=when.defer();
    redisClient.set(redisKey,JSON.stringify(data),function(err,rlt){
        if (err||_.isEmpty(rlt)) {
            deferred.reject(err);
        }else{
            redisClient.expire(redisKey, ttl);
            deferred.resolve(rlt);
        }
    });
    return deferred.promise;
};
