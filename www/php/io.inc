<?php
//-----------------------------------------------------------------------------------
// ioProcess: a method to process the enclosed sql statement
//      args: host      - the host where the DB server is running
//            DBname    - the database name
//            DBuser    - the userid
//            DBpwd    - the password
//            sql       - the sql statement
//            port      - an optional port number
//   return:  either the number of rows affected (if insert/update/delete/ddl), or
//            a 2 dimensional array which contains the result of a SELECT query 
//-----------------------------------------------------------------------------------
function ioProcess($host,$DBname,$DBuser,$DBpwd,$sql,$port)
{	 
        $connect = mysqli_connect($host,$DBuser,$DBpwd,$DBname);   #connect to db server 
        if (! $connect) 
            die('Could not connect: ' . mysqli_connect_error());

	$cursor = mysqli_query($connect,$sql);			#execute sql			
	if (! $cursor) 
	    die('Could not execute sql: ' . mysqli_error($connect));
     
	if (is_object($cursor))					#must be SELECT statement
	{	
	    $i=0;
            while ($row = mysqli_fetch_array($cursor))  	#get each row as an array
		$data[$i++] = $row; 				#store row in 2 dim array    

	    mysqli_free_result($cursor);			#free result buffer
	}
	else
	    $data = mysqli_affected_rows($connect);		#number of rows affected 

        mysqli_close($connect);					#close connection

	return($data);
}
//-------------------------------------------------------------------------------------- 
?>
