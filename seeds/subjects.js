exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subjects').del()
    .then(function () {
      // Inserts seed entries
      return knex('subjects').insert([
        {
          name: 'Frątczak - Pawlikowski',
          localization: 'Lake Ninahaven 996 Stefaniak Place',
          creator_id: 2,
        },
        {
          name: 'Maj - Pietrzyk',
          localization: 'New Izajasz 4621 Błaszczyk Harbors',
          creator_id: 2,
        },
        {
          name: 'Zalewski - Niedzielski',
          localization: 'West Angelamouth 8631 Bąkowski Unions',
          creator_id: 2,
        },
        {
          name: 'Kłos, Łukasiewicz and Bednarczyk',
          localization: 'Antoninaberg 65341 Abraham Isle',
          creator_id: 1,
        },
        {
          name: 'Chojnacki, Zwoliński and Mikołajczak',
          localization: 'Przybyłburgh 62898 Lilia Throughway',
          creator_id: 1,
        },
        {
          name: 'Podgórski Inc',
          localization: 'East Cyrus 00099 Młynarczyk Oval',
          creator_id: 2,
        },
        {
          name: 'Sobieraj Group',
          localization: 'Lilianaton 9995 Agnieszka Summit',
          creator_id: 1,
        },
        {
          name: 'Czerniak, Wolny and Jędrzejewski',
          localization: 'Rudzińskitown 48131 Mateusz Run',
          creator_id: 1,
        },
        {
          name: 'Drozdowski Inc',
          localization: 'Jurkowskiburgh 7968 Rosa Extensions',
          creator_id: 2,
        },
        {
          name: 'Wojtkowiak, Łukasiewicz and Kopczyński',
          localization: 'West Randolf 60787 Kalistrat Villages',
          creator_id: 2,
        }
      ]);
    });
};
