var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');

router.use(express.static(__dirname + '/views/css'));


router.get('/', function (req, res, next) {
	return res.render('home.ejs');
});


router.post('/signup', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password ){
		res.send();
	} else {
		

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							cities: "null",
							state: "null",
							interest: "null",
							pincode: 1,
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}
	}
);

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.get('/signup', function (req, res, next) {
	return res.render('signup.ejs');
});

router.post('/login', function (req, res, next) {
	
	User.findOne({username:req.body.username},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});



router.get('/profile', function (req, res, next) {
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log("data");
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		return res.render('data.ejs', {
		  "username": data.username,
		  "email": data.email,
		  "cities": data.cities,
		  "pincode": data.pincode,
		  "interest": data.interest,
		  "state": data.state
		});
	  }
	});
  });
  

router.get('/logout', function (req, res, next) {
	
	if (req.session) {

    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/main', function (req, res, next) {
    User.findOne({unique_id:req.session.userId},function(err,data){
		
		if(!data){
			res.redirect('/');
		}else{
			
			return res.render('main.ejs', {"name":data.username,"email":data.email,"interest":data.interest});
		}
	});
});



router.post('/profile', function (req, res, next) {
  const { interest, state, cities, pincode } = req.body;

  // Define the filter to find the user by username
  const filter = { unique_id:req.session.userId };

  // Define the update object with new data
  const update = {
	interest: interest,
	state: state,
	cities: cities,
	pincode: pincode,
  };
  

  // Use findOneAndUpdate to find the user by username and update their profile
  User.findOneAndUpdate(
    filter,
    update,
    { new: true }, // This option returns the updated document
    (err, updatedUser) => {
      if (err) {
        // Handle the error
        console.error(err);
        return next(err); // Pass the error to the next middleware
      }

      if (!updatedUser) {
        // Handle the case where the document is not found
        console.error('User not found.');
        res.send({"Success":"Wrong password!"});
      }else{
		res.send({"Success":"Success!"});
	  }
    }
  );
});



module.exports = router;