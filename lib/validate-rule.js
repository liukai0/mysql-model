/**
 * Created by gg on 2016/1/11.
 */

var debug = require('debug')('model:rules');

exports['unique'] = function(req){

  debug(req.key,'---validate--unique');

  var str  =`select * from ${this.table} where ${req.key}=${req.value}`;

  debug(str);

  this.query(str,(err,rows,field)=>{
    if(err){
      //req.throw_error( `数据库错误-->${err.stack}`);
      return req.reject(req)
    }

    if(rows && rows.length>0){
      req.reject(req)
    }else{
      req.resolve(req)
    }
  });

};

exports['length'] = function(req){

  debug(req.key,'---validate--length');

  var rule = req.rule;

  var ret = false;
  var str = rule[2].split(',');
  if(str.length == 2){
    if(req.value.length<=parseInt(str[1]) && req.value.length>=parseInt(str[0])){
      ret = true;
    }
  }else{
    if(req.value.length ==parseInt(str[0])){
      ret =true;
    }
  }

  if(ret==false){
    req.reject(req)
  }else{
    req.resolve(req)
  }


};

exports['require'] = function(req){

  debug(req.key,'---validate--require');

  if(req.value == undefined){
    req.reject(req)
  }else{
    req.resolve(req)
  }
};


exports['equal'] = function(req){
  debug(req.key,' ---validate--equal');

  if(req.value != this.data[req.rule[2]]){
    req.reject(req)
  }else{
    req.resolve(req)
  }
};


exports['regex'] = function(req){
  debug(req.key,' ---validate--type');

  var regex = req.rule;

  if(req.value.match(regex)!=null){
    req.reject(req)
  }else{
    req.resolve(req)
  }
};