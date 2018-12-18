<?php
    $host   = "localhost";                  
    $DBuser = "websysF184";
    $DBpwd  = "websysF184!!";
    $DBname = "websysF184";
    $conn = mysqli_connect($host,$DBuser,$DBpwd,$DBname);    
    if (!$conn) {
    	die("Connection failed: " . mysqli_connect_error());
    }
    if(isset($_POST['save']))
    {  
        $detail = $_POST['payload'];
	$email = $_POST['username'];
	//$email = $_SESSION[email];
        $sql = "UPDATE `user` SET `detail`='$detail' WHERE email='$email'"; 
        
	if (mysqli_query($conn, $sql)) {
	 echo $detail;
	} else {
	 echo "failed: " . mysqli_error($conn);
	}
    } else if (isset($_GET['fetch'])) {
       	$email = $_GET['username'];
        //$email = $_SESSION[email];
        $sql = "SELECT detail FROM `user` WHERE email='$email' LIMIT 1";
       	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) > 0) {
    		// output data of each row
    		while($row = mysqli_fetch_assoc($result)) {
    		  echo $row["detail"];
		}
	} else {
    		echo "failed";
	}
    }
    mysqli_close($con);
?>
