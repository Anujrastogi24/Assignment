<?php

namespace App\Controllers;

use App\Models\DeviceDataModel;

class Home extends BaseController
{
    public function index(): string
    {
        return view('index'); 
    }

  
    public function getDailyAverageMBRT($filter = 'day')
{
    $startDate = $this->request->getGet('startDate');
    $endDate = $this->request->getGet('endDate');
    
    $model = new DeviceDataModel();
    $data = $model->getDailyAverageMBRT($filter, $startDate, $endDate); 
    return $this->response->setJSON($data);
}

}
