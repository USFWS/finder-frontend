(function () {
  'use strict';

  angular.module('frontendApp').service('PickList', function () {

    var STATE_LIST = [
      'Alabama',
      'Alaska ',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming'
    ];

    var TAXON_LIST = [
      'Amphibian',
      'Amphipod',
      'Bee',
      'Beetle',
      'Bird',
      'Butterfly',
      'Caddisfly',
      'Crayfish',
      'Crustacean',
      'Dragonfly',
      'Fly',
      'Fish',
      'Isopod',
      'Mammal',
      'Moth',
      'Mussel',
      'Non-Vascular Plant',
      'Reptile',
      'Snail',
      'Stonefly',
      'Vascular Plant'
    ];

    var STATUS_LIST = [
      'Candidate',
      'Candidate Removal',
      'Petitioned',
      'Petition Withdrawn',
      'Substantial 90-day Finding',
      'Not Substantial 90-day Finding',
      'Warranted 12-month Finding',
      'Not Warranted 12-month Finding',
      'Proposed for Listing as Threatened',
      'Final Listing as Threatened',
      'Proposed for Listing as Endangered',
      'Final Listing as Endangered',
      'Proposed for Listing as Threatened due to Similarity of Appearance',
      'Final Listing as Threatened due to Similarity of Appearance',
      'Proposed for Listing as Endangered due to Similarity of Appearance',
      'Final Listing as Endangered due to Similarity of Appearance',
      'Lawsuit to Challenge Not Substantial 90-day Finding',
      'Lawsuit to Challenge Not Warranted 12-month Finding'
    ];

    var OFFICE_LIST = [

    ];

    return {
      TAXON_LIST: TAXON_LIST,
      STATUS_LIST: STATUS_LIST,
      OFFICE_LIST: OFFICE_LIST,
      STATE_LIST: STATE_LIST
    };

  });
})();
