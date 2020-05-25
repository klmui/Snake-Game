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

    $data = file_get_contents('./scores.json');
     // Decode json to associative array
     $json_arr = json_decode($data, true);

     parse_str(file_get_contents("php://input"), $putVars); // Get data sent in
     // Update scoreboard
     if (isset($putVars['name']) && isset($putVars['score'])) {
       $json_arr[$index]['name'] = $putVars['name'];
       $json_arr[$index]['score'] = $putVars['score'];
     }

     // Update json file
     $json_arr = array_values($json_arr);
     file_put_contents('scores.json', json_encode($json_arr, JSON_PRETTY_PRINT));
  }
