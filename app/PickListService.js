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
      'Montana',
      'Nebraska',
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
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
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
      'Petitioned',
      'Petition Withdrawn',
      'Substantial 90-day Finding',
      'Not Substantial 90-day Finding',
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
      'Lawsuit to Challenge Not Warranted 12-month Finding',
      'Discretionary Status Review',
      'No Longer Considered a Listable Entity'
    ];

    var DOES_NOT_NEED_PROTECTION = [
      'Candidate Removal',
      'Petition Withdrawn',
      'Not Substantial 90-day Finding',
      'Not Warranted 12-month Finding',
    ];

    var PROTECTED = [
      'Final Listing as Threatened due to Similarity of Appearance',
      'Final Listing as Endangered due to Similarity of Appearance',
      'Final Listing as Threatened',
      'Final Listing as Endangered'
    ];

    var FINISHED = [
      'Final Listing as Threatened due to Similarity of Appearance',
      'Final Listing as Endangered due to Similarity of Appearance',
      'Final Listing as Threatened',
      'Final Listing as Endangered',
      'Candidate Removal',
      'Petition Withdrawn',
      'Not Substantial 90-day Finding',
      'Not Warranted 12-month Finding'
    ];

    var REGION_LIST = [
        'Pacific',
        'Southwest',
        'Midwest',
        'Southeast',
        'Northeast',
        'Mountain-Prairie',
        'Alaska',
        'Pacific Southwest',
        'National'
      ];

    var POPULATION_CODES = [
      {
        value: 'O+',
        description: 'A significant population occurs on the Refuge.'
      },
      {
        value: 'O',
        description: 'The species and its habitats occur on the Refuge.'
      },
      {
        value: 'P',
        description: 'The species possibly occurs on the Refuge.'
      },
      {
        value: 'U',
        description: 'Habitat is apparently present and the area is within the species\' range.'
      },
    ]

    return {
      TAXON_LIST: TAXON_LIST.sort(),
      STATUS_LIST: STATUS_LIST.sort(),
      REGION_LIST: REGION_LIST,
      STATE_LIST: STATE_LIST.sort(),
      PROTECTED: PROTECTED.sort(),
      DOES_NOT_NEED_PROTECTION: DOES_NOT_NEED_PROTECTION.sort(),
      FINISHED: FINISHED.sort(),
      POPULATION_CODES: POPULATION_CODES
    };

  });
})();
