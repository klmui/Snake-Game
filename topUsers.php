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
     if (isset($putVars['name']) && isset($putVars['score']) && isset($putVars['mode'])) {
      // Shift scoreboard down starting from $index if they got 1st or 2nd place
      if (!($index + 1 % 3 == 0)) {
        $endOfMode = 0;
        for ($i = count($json_arr); $i >= 0; $i--) {
          if ($json_arr[$i]['mode'] == $putVars['mode']) {
            $endOfMode = $i;
            break;
          }
        }

        // Only shift one over to the right
        if ($endOfMode - 1 == $index) {
          $json_arr[$endOfMode] = $json_arr[$endOfMode - 1];
        } else {
          // Shift over twice
          $json_arr[$endOfMode] = $json_arr[$endOfMode - 1];
          $json_arr[$endOfMode - 1] = $json_arr[$endOfMode - 2];
        }
      } 

       // Update array here
       $json_arr[$index]['name'] = $putVars['name'];
       $json_arr[$index]['score'] = $putVars['score'];
     }

     // Update json file
     $json_arr = array_values($json_arr);
     file_put_contents('scores.json', json_encode($json_arr, JSON_PRETTY_PRINT));
  }
