
exports.index = function(req, res){
    res.json({success:true,msg:["get index"]});
};
exports.post = function(req, res){
    res.json({success:true,msg:"post"});
};
exports.put = function(req, res){
    res.json({success:true,msg:"update"});
};
exports.getById = function(req, res){
    res.json({success:true,msg:"get by id"});
};
exports.rmById = function(req, res){
    res.json({success:true,msg:"remove by id"});
};