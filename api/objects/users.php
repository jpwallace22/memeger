<?php
class Users{
  
    // database connection and table name
    private $conn;
    private $table_name = 'users';
  
    // object properties
    public $user_id;
    public $email;
    public $username;
    public $password;
    public $profile_pic;
    public $bio;
    public $join_date;
    public $last_login;
    public $is_admin;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
    function read($id){
  
    // select all query
    $query = "SELECT *
                FROM $this->table_name 
                WHERE user_id = $id";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute();
    return $stmt;
    }

    /**
     * CHECKS IF USERNAME IS IN DATABASE
     */
    function check_username($username){
    // select all query
    
    $query = "SELECT *
                FROM $this->table_name
                WHERE username = :username ";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute(array( 'username' => $username ));
    return $stmt;
    }

    /**
     * CHECKS IF EMAIL IS IN DATABASE
     */
    function check_email($email){
    // select all query

    $query = "SELECT *
                FROM $this->table_name
                WHERE email = :email ";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute(array( 'email' => $email ));
    return $stmt;
    }
}