angular.module('Twitter', ['ngResource']);

function aReload() {
  window.location.reload()
}

function startReload() {
  setTimeout("aReload()", 1000);
}

function TwitterCtrl($scope, $resource) {

  $scope.twitter = $resource('http://search.twitter.com/:action',
      {action:'search.json', callback:'JSON_CALLBACK'},
      {get:{method:'JSONP', params: {rpp: 4}}});

  $scope.twitterResult = $scope.twitter.get({q:"i"}, function() {
    $scope.tweets = $scope.twitterResult.results;

    $scope.shuffled_tweets = _.shuffle($scope.tweets);

    $scope.selected_tweet_text = $scope.tweets[0].text;

    $scope.selected_tweet_user = $scope.tweets[0].from_user;
  });

  $scope.revealAnswer = function() {
    $scope.answer = "answer";
    startReload();
  };
}
