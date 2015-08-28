$( document ).ready(function() {




    $("#saveUserBtn").click(function(){

        console.log("enter saveUserBtn.click");

        var user = new UserDto();
        user.firstName = $("#firstName").val();
        user.lastName = $("#lastName").val();
        user.email = $("#email").val();
        user.userName = $("#userName").val();
        user.password = $("#password").val();
        user.id = $("#id").val();

        var errors = UserValidation.validateUser(user);
        if(errors.length){
            alert("there were errors with your submission:\n"+errors.join("\n * "));
        }
        else{
            $.ajax({
                method: "POST",
                contentType: 'application/json',
                dataType: 'json',
                url: "saveProfile",
                data: JSON.stringify(user),
                success : function(data){
                    alert("saved successfully, user id is: " + data.user.id);
                    $("#id").val(data.user.id);
                },
                error : function(error){
                    alert("There was an error processing your submission: " + error);
                }
            });

        }
    });
});
