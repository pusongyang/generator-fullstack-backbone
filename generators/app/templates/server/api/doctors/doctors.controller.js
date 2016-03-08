
var _ = require('underscore');
var mongoose = require('mongoose');
var Doctor = mongoose.model('Doctor');
exports.index = function(req, res){
    Doctor.getAll(function(err,docs){
        if (err||docs===null) {
            console.error( err );
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:docs});
        }
    });
};
exports.post = function(req, res){
    var doctorData=_.extend(req.body);
    var doctor = new Doctor(doctorData);
    doctor.updateSave(function (err,doc) {
        if (err||doc===null) {
            console.error( err );
            res.json({success:false,msg:err});
        }else{
            res.status(201).json({success:true,msg:doctor});
        }
    });
};
exports.put = function(req, res){
    Doctor.get(req.params.id, function (err, doc) {
        if (err) {
            console.error( err );
            res.json({success:false,msg:err});
        }else{
            member = _.extend(doc, req.body);
            member.updateSave(function (err,doc) {
                if (err) {
                    console.error( err );
                    res.json({success:false,msg:err});
                }else{
                    res.json({success:true,msg:doc});
                }
            });
        }
    });
};
exports.getById = function(req, res){
    Doctor.get(req.params.id, function (err, doc) {
        if (err) {
            console.error( err );
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:doc});
        }
    });
};
exports.rmById = function(req, res){
    Doctor.findByIdAndRemove({ _id: req.params.id },function(err,doc){
        if(err||doc===null){
            res.status(404).json({success:false});
        }else{
            res.status(204).json({success:true,msg:"remove by id"});
        }
    });
};