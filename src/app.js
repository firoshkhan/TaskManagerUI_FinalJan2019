angular.module('sortApp', [])

.controller('mainController', function($scope) {
 // $scope.sortType     = 'name'; // set the default sort type
 // $scope.sortReverse  = false;  // set the default sort order
  //$scope.searchFish   = '';     // set the default search/filter term
  
  // create the list of sushi rolls 
  $scope.Tasks = [
    { Task: 'Cali Roll', ParentTask: 'Crab', Priority: 2 ,Start: 20/2/2018, End: 20/3/2018  },
    { Task: 'Philly', ParentTask: 'Tuna', Priority: 4 ,Start: 20/2/2018, End: 20/3/2018 },
    { Task: 'Tiger', ParentTask: 'Eel', Priority: 7,Start: 20/2/2018, End: 20/3/2018  },
    { Task: 'Rainbow', ParentTask: 'Variety', Priority: 6,Start: 20/2/2018, End: 20/3/2018  }
  ];
  
});