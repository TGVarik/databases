module.exports = function(){
  var Promise = require('bluebird');
  var _ = require('underscore');
  var mysql = require('mysql');
  var knex = require('knex')({
    client    : 'mysql',
    debug: false,
    connection: {
      host    : 'localhost',
      user    : 'chatterbox',
      password: 'chatterbox',
      database: 'chat'
    }
  });




  var findAllMessages = function(cb){
  };

  var findUser = function(username, cb){
  };



  var findUserFromOAuth = function(userObj){
    return knex
        .select('userId')
        .from('oauth')
        .where({
          provider: userObj['provider'],
          providerId: userObj['id']
        })
        .then(function(rows){
          if (rows.length < 1){
            return knex
                .select('userId')
                .from('emails')
                .whereIn('email', _.pluck(userObj['emails'], 'value'))
                .then(function(rows){
                  if(rows.length < 1){
                    return knex
                        .transaction(function(trx){
                          return trx
                              .insert({
                                displayName: userObj['name']['givenName'] + ' ' + userObj['name']['familyName'].slice(0,1) + '.'
                              }, 'userId')
                              .into('users')
                              .then(function(userId){
                                return trx
                                    .insert({
                                      userId: userId[0],
                                      familyName: userObj['name']['familyName'],
                                      givenName: userObj['name']['givenName'],
                                      middleName: userObj['name']['middleName'],
                                      displayName: userObj['displayName'],
                                      gender: userObj['gender'],
                                      provider: userObj['provider'],
                                      providerId: userObj['id'],
                                      profileUrl: userObj['profileUrl'],
                                      photoUrl: userObj['photos'][0]['value']
                                    }, 'oauthId')
                                    .into('oauth')
                                    .then(function(oauthId){
                                      return {oauthId: oauthId[0], userId: userId[0]};
                                    });
                              })
                              .then(function(ids){
                                return Promise.map(userObj['emails'], function(email){
                                  return trx
                                      .insert({
                                        email: email['value'],
                                        userId: ids['userId'],
                                        oauthId: ids['oauthId']
                                      }, 'userId')
                                      .into('emails')
                                });
                              });
                        })
                        .catch(function(err){
                          throw err;
                        });
                  } else {
                    return rows[0]['userId'];
                  }
                });
          } else {
            return rows[0]['userId'];
          }
        }).then(function(userId){
          return knex
              .select()
              .from('users')
              .where('userId', userId)
              .then(function(rows){
                console.log(rows[0]);
                return rows[0];
              });
        })
        .catch(function(err){
          throw err;
        });
  };

  var saveUser = function(username, cb){
  };

  var saveMessage = function(message, userid, roomname, cb){
  };

  return {
    findAllMessages: findAllMessages,
    findUser: findUser,
    findUserFromOAuth: findUserFromOAuth,
    saveUser: saveUser,
    saveMessage: saveMessage
  };
}();