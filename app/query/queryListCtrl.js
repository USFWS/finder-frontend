'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:QueryCtrl
 * @description
 * # QueryCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('QueryListCtrl', function ($scope) {
    $scope.queries = [
      {
        'name': 'Species by status',
        'description': 'Query the at risk species finder for species with a certain current status.  To select more than one species from the list hold down the Command button on a Mac or Control button on a PC and choose each of the statuses you would like to search with your mouse.  To print your query result press Command + P on your mac or Control + P on a PC, or select File... print.',
        'sref': 'query.status'
      },
      {
        'name': 'Endemic Species (range includes only one state)',
        'description': 'By default this query returns all species that are found in only one state. If you would like to limit your query to a specific state enter the full state name (not the abbreviation) into the input below. To retrieve any endemic species leave the field blank.',
        'sref': 'query.endemic'
      },
      {
        'name': 'Species that occur in more than one state',
        'description': 'By default this query returns all species that are found in more than one state. If you would like to limit your query to make sure that a specific state is included in the species range enter the state name (not the abbreviation) in the input below. To retrieve any endemic species leave the field blank.',
        'sref': 'query.non-endemic'
      },
      {
        'name': 'Species that will be addressed by a Region other than the Southeast',
        'description': 'By default this query returns all species that are found in more than one state. If you would like to limit your query to make sure that a specific state is included in the species range enter the state name (not the abbreviation) in the input below. To retrieve any endemic species leave the field blank.',
        'sref': 'query.non-southeast'
      },
      {
        'name': 'Custom Query',
        'description': 'Create your own query by combining different search criteria.',
        'sref': 'query.custom'
      }
    ];
  });
