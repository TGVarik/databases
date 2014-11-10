/**
 * Created by tom on 10/3/14.
 */
var helpers = require('../db.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

describe('db helpers', function(){
  describe('findUserFromOAuth', function(){
    it('should return a user object when passed an oauth profile', function(){
      var profile = {"id":"302585943266417","displayName":"Tom G Varik","name":{"familyName":"Varik","givenName":"Tom","middleName":"G"},"gender":"male","profileUrl":"https://www.facebook.com/app_scoped_user_id/302585943266417/","emails":[{"value":"tgvarik@me.com"}],"photos":[{"value":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p50x50/1545781_272326976292314_1040761975717624410_n.jpg?oh=439667eec8dd6737c99b536286abc931&oe=54AEE86B&__gda__=1422259913_2fb1e356dfeb4dece76c625ab0f76647"}],"provider":"facebook","_raw":"{\"id\":\"302585943266417\",\"last_name\":\"Varik\",\"first_name\":\"Tom\",\"middle_name\":\"G\",\"name\":\"Tom G Varik\",\"picture\":{\"data\":{\"is_silhouette\":false,\"url\":\"https:\\/\\/fbcdn-profile-a.akamaihd.net\\/hprofile-ak-xap1\\/v\\/t1.0-1\\/p50x50\\/1545781_272326976292314_1040761975717624410_n.jpg?oh=439667eec8dd6737c99b536286abc931&oe=54AEE86B&__gda__=1422259913_2fb1e356dfeb4dece76c625ab0f76647\"}},\"gender\":\"male\",\"email\":\"tgvarik\\u0040me.com\",\"link\":\"https:\\/\\/www.facebook.com\\/app_scoped_user_id\\/302585943266417\\/\"}","_json":{"id":"302585943266417","last_name":"Varik","first_name":"Tom","middle_name":"G","name":"Tom G Varik","picture":{"data":{"is_silhouette":false,"url":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p50x50/1545781_272326976292314_1040761975717624410_n.jpg?oh=439667eec8dd6737c99b536286abc931&oe=54AEE86B&__gda__=1422259913_2fb1e356dfeb4dece76c625ab0f76647"}},"gender":"male","email":"tgvarik@me.com","link":"https://www.facebook.com/app_scoped_user_id/302585943266417/"}};
      return helpers.findUserFromOAuth(profile).should.be.fulfilled;
    });
  });
});