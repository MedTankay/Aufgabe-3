<?php
    class Database{

        const servername = "localhost";
        const  username = "root";
        const  password = "";
        public $conn = null;

        public function connect()
        {
            try {
                $this->conn = new PDO("mysql:host=".self::servername.";dbname=calendar_db", self::username, self::password);
              
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   
            
            } catch(PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }

    }
?>