<?php
class Category {

    // Properties
    private $idCategory;
    private $categoryName;
    private $categoryColor;

    function __construct($idCategory, $categoryName, $categoryColor) {
        $this->idCategory = $idCategory;
        $this->categoryName = $categoryName;
        $this->categoryColor = $categoryColor;
    }

    // Methods
    public function set_idCategory($idCategory) {
        $this->idCategory = $idCategory;
    }
    public function get_idCategory() {
        return $this->idCategory;
    }

    public function set_categoryName($categoryName) {
        $this->categoryName = $categoryName;
    }
    public function get_categoryName() {
        return $this->categoryName;
    }

    public function set_categoryColor($categoryColor) {
        $this->categoryName = $categoryColor;
    }
    public function get_categoryColor() {
        return $this->categoryColor;
    }
}
?>