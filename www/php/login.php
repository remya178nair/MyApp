<?php
//=============================================================================================
// This php scripts allows a user to login. (It validates against (table: user)
// if user logs in with proper user/pwd --> redirect to home page 
// if user clicks on register button     --> redirect to registration page
//=============================================================================================
    error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);      //all error but warnigns & notices

                                #if 2nd or subsequent time
     if(isset($_GET['login']))
     {                                           
        #$_GET = '';                             #erase any $_GET variables 

        validate_form();                        #validate entry of user & pwd  

        if (! $msg) {                             #if both user & pwd were entered 
            read_pwd();                        #read and validate user pwd 
	    if (! $msg)                             #if pwd matches what was entered
           {
            session_start();                    #start a session
            $_SESSION[email] = $email;          #save session variables
            $_SESSION[fname] = $fname;
            $_SESSION[lname] = $lname;

            if (SID)                            #must be using URL rewrite
                $sid = "?". SID;                #append ? and the SID           

	   echo "success";
            //header("Location: http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/index.html");  
                                                #redirect to home page, with session id (if any)
           } else{
		echo $msg;
 	   }
        } else {
                echo $msg;
          }
    }


    // if ($_GET['out'])                           #if logout was requested
    // {
    //     session_start();                        #obtain handle to the session
    //     session_destroy();                      #delete session
    //     $msg = 'You have logged out successfully';
    // }
    
    //display();

//=============================================================================
// Validate all required input fields
//=============================================================================
    function validate_form()
    {
        global $email, $pwd, $msg;

        $email = $_GET["email"];                        #get HTML form entry fields 
        $pwd   = $_GET["pwd"];

        $msg;

        if (! $email or ! $pwd) {
            $msg = 'Please enter email and/or password';
            return;
        }
}

//=============================================================================
// Read pwd from the database
// validates to make sure email exists, and pwd is validate for email
//=============================================================================
    function read_pwd()
    {
        global $userid, $email, $pwd, $fname, $lname, $msg, $detail;

        $host   = "localhost";
        $DBuser = 'websysF184';
        $DBpwd  = 'websysF184!!';
        $DBname = 'websysF184';
 
        $connect = mysqli_connect($host,$DBuser,$DBpwd,$DBname);   #connect to db server
 
        if (! $connect) 
            die('Could not connect: ' . mysqli_connect_error());

        $query = "SELECT userid, email, pwd, fname, lname, detail
                  FROM user 
                  WHERE lower(email) = '$email'";               #not case sensitive

        $cursor = mysqli_query($connect,$query);                #execute the query                      

        if (! $cursor) 
            die('Could not execute query: ' . mysqli_error($connect));
       
        $row = mysqli_fetch_array($cursor);                     #get each row as an array

        if (! $row)
            $msg  = "Email does not exist <br> Please register first";

        if ($row && $row[pwd] != $pwd)
            $msg  = "Password is invalid <br> Please try again";

        $userid = $row[userid];
        $fname  = $row[fname];
        $lname  = $row[lname];
        $detail = $row[detail];
        $email = $row[email];

        mysqli_free_result($cursor);                            #free result buffer

        mysqli_close($connect);                                 #close connection
    }

//==============================================================================
// Display the HTML page  
// if there are errors, display message
//==============================================================================
        function display()
        {
            global $email, $pwd, $save, $msg, $detail;
    ?>
            <html>
            <head>
            <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="login.css">
            </head>
            <body>

            <div class="bg-image img1"></div>
            <div class="bg-image img2"></div>
            <div class="bg-image img3"></div>
            <div class="bg-image img4"></div>
            <div class="bg-image img5"></div>
            <div class="bg-image img6"></div>

            <div class="bg-text" style="font-size:40px; width:100%; top:10%; border: none">
                <p>Travel Tracker</p> </div>

            <form method=POST action=login.php>
            <div class="bg-text" style="font-size:40px">
                  <label for="email"><b>Username</b></label>
                  <input type="text" placeholder="Enter Username" name="email" value="<?php print $email?>" required><br>

                  <label for="pwd"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" name="pwd" value="<?php print $pwd?>" required><br>

                <input class="button" type="submit" value="Log In">
                <br><font color=red style="font-size:15px"> <?php echo $msg?> </font>
            </div>
            </form>
            <div class="bg-text" style="font-size:20px; width:40%; top:94%; border: none">
            <p> Don't have an account? <a href="register.html">Create one here!</a></p></div>
            <script>
                localStorage.clear();
                var details = JSON.parse('<?php echo $detail  ?>');
                details.forEach(function (d) {
                    localStorage.setItem(d.key, d.value);
                });
                  localStorage.setItem("username", $email);
                // location.href = "http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/index.html";
            </script>
            </body>
            </html>
<?php
    }
//=============================================================================
?>
