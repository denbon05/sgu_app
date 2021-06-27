exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subjects').del()
    .then(function () {
      // Inserts seed entries
      return knex('subjects').insert([
        {
          name: 'Frątczak - Pawlikowski',
          localization: 'Lake Ninahaven 996 Stefaniak Place',
        },
        {
          name: 'Maj - Pietrzyk',
          localization: 'New Izajasz 4621 Błaszczyk Harbors',
        },
        {
          name: 'Zalewski - Niedzielski',
          localization: 'West Angelamouth 8631 Bąkowski Unions',
        },
        {
          name: 'Kłos, Łukasiewicz and Bednarczyk',
          localization: 'Antoninaberg 65341 Abraham Isle',
        },
        {
          name: 'Chojnacki, Zwoliński and Mikołajczak',
          localization: 'Przybyłburgh 62898 Lilia Throughway',

        },
        {
          name: 'Podgórski Inc',
          localization: 'East Cyrus 00099 Młynarczyk Oval',
        },
        {
          name: 'Sobieraj Group',
          localization: 'Lilianaton 9995 Agnieszka Summit',
        },
        {
          name: 'Czerniak, Wolny and Jędrzejewski',
          localization: 'Rudzińskitown 48131 Mateusz Run',
        },
        {
          name: 'Drozdowski Inc',
          localization: 'Jurkowskiburgh 7968 Rosa Extensions',
        },
        {
          name: 'Wojtkowiak, Łukasiewicz and Kopczyński',
          localization: 'West Randolf 60787 Kalistrat Villages',
        }
      ]);
    });
};
