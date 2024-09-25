# Device Data Dashboard - MBRT Visualization

## Overview
This project is a **Device Data Dashboard** built using **CodeIgniter 4**, which allows users to visualize **(MBRT)** data. The project provides functionality to view MBRT averages over daily, weekly, and monthly intervals, as well as custom date ranges. The dashboard is responsive and includes interactive bar charts to represent the data.

## Implementation

### First Implement 
Make an default page or rendering page using Atlantis Lite(BS4) dashboard-1

### Second Implement 
Implement HMVC architecture in Modules folder which have an User and Admin for testing purpose.

### Import csv data in Database
Using PGadmin3 run query to make an table (temp_data) and relevant columns with appropriate DataTypes then use import tool to direct import data from csv with the header.

### Implement Bar Graph using Chart.js

### Add Function for Custom Date Range Selection
Users can select a custom start and end date. Upon selection, the data is fetched and the chart is updated accordingly.





## Features
- **Daily, Weekly, Monthly Views**: View MBRT data for specific time periods.
- **Custom Date Range**: Select a custom start and end date to view MBRT data.
- **Responsive Design**: Fully responsive design using Bootstrap 5.
- **Interactive Charts**: Bar charts to visualize MBRT data interactively.

## Technologies Used
- **Backend**: CodeIgniter 4 (PHP)
- **Frontend**: HTML, CSS (Bootstrap 5), JavaScript
- **Database**: PostgreSQL
- **API Requests**: Fetch API, AJAX
- **Version Control**: Git

## System Architecture
The system consists of:
1. **Frontend**: User interface for displaying interactive MBRT data charts.
2. **Backend**: CodeIgniter 4 APIs that fetch MBRT data from the PostgreSQL database.
3. **Database**: PostgreSQL stores device data with timestamps and MBRT values.

## Installation and Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    ```

2. **Install Composer Dependencies**:
    ```bash
    composer install
    ```

3. **Database Configuration**:
   - Set up PostgreSQL and update your `.env` file with database credentials.

4. **Run Migrations**:
    ```bash
    php spark migrate
    ```

5. **Start the Server**:
    ```bash
    php spark serve
    ```
