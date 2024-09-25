<?php


namespace App\Models;

use CodeIgniter\Model;

class DeviceDataModel extends Model
{
    protected $table = 'temp_data';
    protected $allowedFields = ['device', 'start_time', 'data_extra', 'mbrt'];

public function getDailyAverageMBRT($filter , $startDate = null, $endDate = null)
{
    $builder = $this->db->table('temp_data');

    if ($filter == 'day') {
        // Custom date range for daily data
        if ($startDate && $endDate) {
            $builder->select("DATE(TIMESTAMP 'epoch' + start_time * INTERVAL '1 second') as time_period, AVG(mbrt) as avg_mbrt")
                ->where("TIMESTAMP 'epoch' + start_time * INTERVAL '1 second' BETWEEN '$startDate' AND '$endDate'")
                ->groupBy("DATE(TIMESTAMP 'epoch' + start_time * INTERVAL '1 second')");
        } else {
            // Default to the last 15 days
            $builder->select("DATE(TIMESTAMP 'epoch' + start_time * INTERVAL '1 second') as time_period, AVG(mbrt) as avg_mbrt")
                ->where("TIMESTAMP 'epoch' + start_time * INTERVAL '1 second' >= NOW() - INTERVAL '15 days'")
                ->groupBy("DATE(TIMESTAMP 'epoch' + start_time * INTERVAL '1 second')");
        }
    } elseif ($filter == 'week') {
        // Custom date range for weekly data
        if ($startDate && $endDate) {
            $builder->select("TO_CHAR(DATE_TRUNC('week', TIMESTAMP 'epoch' + start_time * INTERVAL '1 second'), 'YYYY-WW') as time_period, AVG(mbrt) as avg_mbrt")
                ->where("TIMESTAMP 'epoch' + start_time * INTERVAL '1 second' BETWEEN '$startDate' AND '$endDate'")
                ->groupBy("TO_CHAR(DATE_TRUNC('week', TIMESTAMP 'epoch' + start_time * INTERVAL '1 second'), 'YYYY-WW')");
        } else {
            // Default to the last 5 weeks
            $builder->select("TO_CHAR(DATE_TRUNC('week', TIMESTAMP 'epoch' + start_time * INTERVAL '1 second'), 'YYYY-WW') as time_period, AVG(mbrt) as avg_mbrt")
                ->where("TIMESTAMP 'epoch' + start_time * INTERVAL '1 second' >= NOW() - INTERVAL '5 weeks'")
                ->groupBy("TO_CHAR(DATE_TRUNC('week', TIMESTAMP 'epoch' + start_time * INTERVAL '1 second'), 'YYYY-WW')");
        }
    } elseif ($filter == 'month') {
        // Custom date range for monthly data
        if ($startDate && $endDate) {
            $builder->select("TO_CHAR(DATE_TRUNC('month', TIMESTAMP 'epoch' + start_time * INTERVAL '1 second'), 'YYYY-MM') as time_period, AVG(mbrt) as avg_mbrt")
                ->where("TIMESTAMP 'epoch' + start_time * INTERVAL '1 second' BETWEEN '$startDate' AND '$endDate'")
                ->groupBy("TO_CHAR(DATE_TRUNC('month', TIMESTAMP 'epoch' + start_time * INTERVAL '1 second'), 'YYYY-MM')");
        } else {
            // Default to the last 5 months
            $builder->select("TO_CHAR(DATE_TRUNC('month', TIMESTAMP 'epoch' + start_time * INTERVAL '1 second'), 'YYYY-MM') as time_period, AVG(mbrt) as avg_mbrt")
                ->where("TIMESTAMP 'epoch' + start_time * INTERVAL '1 second' >= NOW() - INTERVAL '6 months'")
                ->groupBy("TO_CHAR(DATE_TRUNC('month', TIMESTAMP 'epoch' + start_time * INTERVAL '1 second'), 'YYYY-MM')");
        }
    }

    // Order by time_period (ascending)
    $builder->orderBy("time_period", "ASC");

    // Execute the query and return the results
    $query = $builder->get();
    return $query->getResult();
}
}

