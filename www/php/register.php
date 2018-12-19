<?php
//==================================================================================
// This php registration script can handle an insert, an update and a delete
// if a session email is not present --> must be an insert (new registration)  
// if a session email is present     --> must be an update (update/delete profile)
//==================================================================================
    error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);      //all error but warnigns & notices

    include('io.inc');                          #function to perform DB input/output

        $host   = "localhost";                  #database connection info
        $DBuser = 'websysF184';
        $DBpwd  = 'websysF184!!';
        $DBname = 'websysF184';

    session_start();                            #get a handle to the session 
    
    if (! $_SESSION['userid'])                  #if no session for user
        $mode = 'new';                          #  it must be a 'new' registration
    else {                                      #otherwise
        $mode = 'upd';                          #  it must be an 'update' of profile
        read_data('repopulate');                #  read from DB and populate screen
    }

    if ($_POST)                                 #if 2nd & subsequent times
    {                                           
        validate();                             #validate form fields   

        if (! $msg) {                            #if all required fields are entered
            read_data('check_unique');          #check to make sure the email is unique
	}else{
	    header("Refresh: 0; url=http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/index.html");
	echo $msg;
	}
        if (! $msg ){          #if OK and mode=new
            insert_data();                      #  register a new user
            header("Location: http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/index.html");
         } else {
	header("Refresh: 0; url=http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/index.html");
	echo $msg;
}
    // header("Location: http://websys3.stern.nyu.edu/websysF18/websysF184/login.html");

    }
    
   // display();                                  #display the screen 

//=============================================================================
// Validate all required input fields
//=============================================================================
    function validate()
    {
        global $mode, $userid, $email, $pwd, $pwd2, $fname, $lname, $msg;
        global $email_error, $pwd_error, $fname_error, $lname_error;
        
        $email = $_POST['email'];                      //get HTML form entry data
        $pwd   = $_POST['pwd'];
        $pwd2  = $_POST['pwd2'];
        $fname = $_POST['fname']; 
        $lname = $_POST['lname'];

        if (! $email || preg_match('/^\s*$/',$email) )   //if field is null or all spaces
              $email_error = '*';
        if (! $pwd   || preg_match('/^\s*$/',$pwd) )
              $pwd_error = '*';
        if (! $pwd2  || preg_match('/^\s*$/',$pwd2) )
              $pwd_error = '*';
        if (! $fname || preg_match('/^\s*$/',$fname) )
              $fname_error = '*';
        if (! $lname || preg_match('/^\s*$/',$lname) )
              $lname_error = '*';

        if ($email_error || $pwd_error || $fname_error || $lname_error)
            $msg  = 'Please enter required field(s) above';

        if ($pwd != $pwd2) {
            $pwd_error = '*';
            $msg  = 'Passwords do not match';
        }
    }

//=============================================================================
// Read data from the database
// if purpose is to ensure unique email    --> validate email uniqueness
// if purpose is to repopulate the screen --> read all, and populate screen   
//=============================================================================
    function read_data($purpose)
    {
        global $host, $DBname, $DBuser, $DBpwd;   
        global $mode, $userid, $email, $pwd, $pwd2, $fname, $lname, $msg;   
 
        if ($purpose == 'check_unique')                 #check unique email id
        {
            $sql = "SELECT userid, email  
                    FROM user 
                    WHERE email = '$email'";
                      
            $result = ioProcess($host, $DBname, $DBuser, $DBpwd, $sql);
            $row    = $result[0];                       #get fname row

            if ($row && $row[userid] != $_SESSION[userid])
                $msg = "Email is already on file <br> Please choose another one";
        }

        if ($purpose == 'repopulate')                   #client requesting profile update
        {
            $sql = "SELECT userid, email, pwd, fname, lname, detail
                    FROM user 
                    WHERE userid = $_SESSION[userid]";

            $result = ioProcess($host, $DBname, $DBuser, $DBpwd, $sql);
            $row    = $result[0];                       #get fname row

            $email = $row['email'];                  #populate the screen
            $pwd   = $row['pwd'];                    #with data from database
            $pwd2  = $row['pwd'];
            $fname = $row['fname']; 
            $lname = $row['lname'];
        }
    }

//==============================================================================
// Display the HTML page  
// if there are errors, highlight those with an error message
//==============================================================================
    function display()
    {
        global $userid, $email, $pwd, $pwd2, $fname, $lname, $msg;
        global $email_error, $pwd_error, $fname_error, $lname_error;
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

        <form method=POST action=register.php>
        <div class="bg-text" style="font-size:25px">
              <label for="email"><b>Username</b></label>
              <input type="email" placeholder="Enter Email Address" name="email" required value='<?php print "$email'> $email_error " ?><br>

              <label for="pwd"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="pwd" required value='<?php print "$pwd' > $pwd_error "?><br>

              <label for="pwd2"><b>Comfirm Password</b></label>
              <input type="password" placeholder="Comfirm Password" name="pwd2" required value='<?php print "$pwd2' >  $pwd_error "?><br>

              <label for="fname"><b>First Name</b></label>
              <input type="fname" placeholder="Enter First Name" name="fname" required value='<?php print "$fname' >  $fname_error"?><br>

              <label for="lname"><b>Last Name</b></label>
              <input type="lname" placeholder="Enter Last Name" name="lname" required value='<?php print "$lname'  >  $lname_error "?><br>

            <input class="button" type="submit" value="Register">
            <br><font color=red style="font-size:15px"> <?php print $msg?> </font>
        </div>
        </form>
        <div class="bg-text" style="font-size:20px; width:40%; top:94%; border: none">
        <p> Already have an account? <a href="http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/index.html">Login here!</a></p></div>

        </body>
        </html>

<?php
    }

//=============================================================================
// Insert data in the database - for new registration
// retrieve the user id PK generation by the auto_increment
// save session variables 
//=============================================================================
    function insert_data()
    {
        global $host, $DBname, $DBuser, $DBpwd;   
        global $userid, $email, $pwd, $pwd2, $fname, $lname, $msg;   
 
        $connect = mysqli_connect($host, $DBuser, $DBpwd, $DBname);   #connect to db server 
        if (! $connect) 
            die('Could not connect: ' . mysqli_connect_error());

        $email2 = htmlentities($email);                  #replace < > ' " & characters; 
        $pwd2   = htmlentities($pwd);                    #with their html entities;              
        $fname2 = htmlentities($fname);                  # &lt; &gt; &apos; &quote; &amp;        
        $lname2 = htmlentities($lname);              

        $email2 = mysqli_real_escape_string($connect, $email2);    #escape all ' " \ newline 
        $pwd2   = mysqli_real_escape_string($connect, $pwd2);      #with another \, making them
        $fname2 = mysqli_real_escape_string($connect, $fname2);    # \' \" \\ \newline
        $lname2 = mysqli_real_escape_string($connect, $lname2);

        $insert = "INSERT INTO user 
                   VALUES('','$email2','$pwd2','$fname2','$lname2',NULL)";

        $result = mysqli_query($connect,$insert);                #issue the update                        
        if (! $result) 
            die('Could not execute insert: ' . mysqli_error($connect));
            
        $select = "SELECT LAST_INSERT_ID() as id";              #retrieve userid PK 
       
        $cursor = mysqli_query($connect,$select);               #issue the query                        
        if (! $cursor) 
            die('Could not execute query: ' . mysqli_error($connect));
       
        $row = mysqli_fetch_array($cursor);                     #get row as an array

        $userid = $row[id];                                    

        mysqli_free_result($cursor);                            #free result buffer
        mysqli_close($connect);                                 #close connection

        $_SESSION[userid] = $userid;                            #save session variable           
        $_SESSION[fname]  = $fname;
        $_SESSION[lname]  = $lname;

        $msg = 'Registration successful!<br>Please login';
    }

//===============================================================================

?>
</body>
</html>
