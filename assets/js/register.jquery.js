$(document).ready(function(){
  $('#registerId').validate({
    rules:{
      'uname':{
        'required':true,
        'minlength':5
      },
      'first_name':{
        'required':true,
        'minlength':4
      },
      'email':{
        'required':true,
        'email':true,
        'remote':'checkemail'
      },
        'package_name':{
        'required':true,
        'minlength':4,
        'remote':'checkpackage'
      },
      
      'form_name':{
        'required':true,
        'remote':'checkform'
      },
      'name':{
        'required':true,
        'minlength':4,
        'maxlength':8
      },
      'password':{
        'required':true,
        'minlength':6
      },
      'cpassword':{
        'required':true,
        'equalTo':'#password'
      },
      'gender':{
        'required':true
      },
      'username':{
        'required':true,
        'remote':'checkusername'
      },
      'language':{
        'required':true,
      },
      'status':{
        'required':true
      },
      'role_id':{
        'required':true
      },
      'days':{
        'required':true,
        'number' :true
      },
      'price':{
        'required':true,
        'number' :true
      },
      'avatar':{
        'required':true,
        'accept':'jpg|jpeg|png|ini'
      },
      'package_tittle':{
        'required':true,
        'minlength':6 
      },
      'agree':{
        'required':true 
      },
    },

  messages: {
    'fisrt_name':{
      required: "First Name is required.",
      minlength: "First Name should be 4 char long.",
    },
    'email':{
      'required':'Email should not be blank',
      'email':'Please enter valid email Id',
      'remote':'Email already taken'
    },
    
      'email':{
      'required':'Email should not be blank',
      'email':'Please enter valid email Id',
      'remote':'Email already taken'
    },
    'form_name':{
      'remote':'Form Name already taken'
    },
      'package_name':{
      'required':'Package should not be blank',
      'remote':'Already Exist Please try Diffrent'
    },
    'days':{
      'number':'Please enter valid duration in Days'
    },
    'price':{
      'number':'Please enter valid price in Rupees',
    },
    'password':{
      'required':'Password should not be blank',
      'minlength':"Passowrd should be 6 char long."
    },
    'cpassword':{
      'required':'Re-Password should not be blank',
      'equalTo':'Password not matched'
    },
    'username':{
        'required':'Username is required',
        'remote':'Username already taken'
    },
    'avatar':{
      'required':'Please upload Avatar',
      'accept':"Please upload file with 2 extn."
    },
  }

  });
  
  
    $('#SubscriptionForm').validate({
    rules:{
      'title':{
        'required':true,
        'minlength':4
      },     
    },

  messages: {
    'title':{
      required: "Title is required.",
      minlength: "Title should be 4 char long.",
    },
  }

  });

});
