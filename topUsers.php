<?php
  $method = $_SERVER['REQUEST_METHOD'];

  // Handle GET request to return all top players
  if ($method == 'GET') {
    $jsonData = file_get_contents('./scores.json');
    echo $jsonData;
  }

  // Handle PUT request
  if ($method = 'PUT') {
    // Get index of user to replace
    $index = $_SERVER['PHP_SELF'][strlen($_SERVER['PHP_SELF']) - 1];
  }
