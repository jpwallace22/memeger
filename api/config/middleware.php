<?php

/**
 * ## https://phpdelusions.net/pdo/whitelisting_helper_function ##
 * Returns the value if is in array of allowed values
 * @param mixed     $value     [value to be evaluated]
 * @param array     $allowed  [values to be evaluated against]
 * @param string    $message  [displayed message for errors]
 */
function white_list( $value, $allowed, $message) {
    if ($value === null) {
        return $allowed[0];
    }
    $key = array_search($value, $allowed, true);
    if ($key === false) { 
        throw new InvalidArgumentException($message); 
    } else {
        return $value;
    }
}

/**
 * check to see if the viewer is logged in
 * @return array|bool false if not logged in, array of all user data if they are logged in
 */

function check_login(){
    //if the cookie is valid, turn it into session data
    if(isset($_COOKIE['access_token']) AND isset($_COOKIE['user_id'])){
        $_SESSION['access_token'] = $_COOKIE['access_token'];
        $_SESSION['user_id'] = $_COOKIE['user_id'];
    }
    
   //if the session is valid, check their credentials
   if( isset($_SESSION['access_token']) AND isset($_SESSION['user_id']) ){
        //check to see if these keys match the DB     

       $data = array(
       	'id' => $_SESSION['user_id'],
       	'access_token' =>$_SESSION['access_token'],
       );
       include_once '../objects/users.php';

        // instantiate database and product object
        $database = new Database();
        $db = $database->getConnection();
        
        // initialize object
        $users = new Users($db);

        $stmt = $users->check_if_logged($_SESSION['access_token']);
        $num = $stmt->rowCount();
       
        if($num > 0){
            //success! return all the info about the logged in user
            return $stmt->fetch();
        }else{
            return false;
        }
    }else{
        //not logged in
        return false;
    }
}

/**
 * SANITIZE FUNCTIONS
 */
function clean_string( $string ){
    return trim( strip_tags( $string ) );
};
function clean_email( $email ){
    return filter_var( $email, FILTER_SANITIZE_EMAIL);
}
function clean_int( $int ){
    return filter_var( $int, FILTER_SANITIZE_NUMBER_INT);
}

/**
* displays sql query information including the computed parameters.
* Silent unless DEBUG MODE is set to 1 in config.php
* @param [statement handler] $sth -  any PDO statement handler that needs troubleshooting
*/
function debug_statement($sth){
    if( DEBUG_MODE ){
        echo '<pre>';
        $info = debug_backtrace();
        echo '<b>Debugger ran from ' . $info[0]['file'] . ' on line ' . $info[0]['line'] . '</b><br><br>';
        $sth->debugDumpParams();
        echo '</pre>';
    }
}