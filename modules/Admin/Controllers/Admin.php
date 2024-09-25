<?php

// This is Admin Module Controllers

namespace Modules\Admin\Controllers;

class Admin extends \CodeIgniter\Controller
{
public function index() {
    return view('Modules\Admin\Views\admin');
}
}