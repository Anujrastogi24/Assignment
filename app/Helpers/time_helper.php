<?php

if (!function_exists('convert_to_ist')) {
    /**
     * Convert Unix timestamp to IST.
     *
     * @param int $unixTimestamp Unix timestamp.
     * @return string DateTime in IST format (Y-m-d H:i:s).
     */
    function convert_to_ist($unixTimestamp)
    {
        // Create a DateTime object from the Unix timestamp
        $dateTime = new DateTime('@' . $unixTimestamp);

        // Set the timezone to UTC (the base timezone of Unix timestamps)
        $dateTime->setTimezone(new DateTimeZone('UTC'));

        // Change the timezone to IST (Indian Standard Time)
        $dateTime->setTimezone(new DateTimeZone('Asia/Kolkata'));

        // Return the date in 'Y-m-d H:i:s' format
        return $dateTime->format('Y-m-d H:i:s');
    }
}
