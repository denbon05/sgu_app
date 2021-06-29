export default {
  translation: {
    appName: 'SGU App',
    flash: {
      users: {
        create: {
          error: 'Dane są nieprawidłowe',
          success: 'Użytkownik został utworzony pomyślnie',
        },
        delete: {
          success: 'Użytkownik został pomyślnie usunięty',
          error: 'Nie można usunąć użytkownika',
        },
      },
      session: {
        create: {
          success: 'Jesteś zalogowany',
          error: 'Nieprawidłowy e-mail lub hasło',
        },
        delete: {
          success: 'Jesteś wylogowany',
        },
      },
      subjects: {
        create: {
          success: 'Obiekt został pomyślnie utworzony',
          error: 'Nie udało się stworzyć obiektu',
        },
      },
      permissionError: 'Brak dostępu',
    },

    navBar: {
      mainPage: 'Stronia główna',
      signIn: 'Zaloguj się',
      signUp: 'Zapisz się',
      signOut: 'Wyloguj się',
      subjects: 'Obiekty',
      management: 'Zarządzanie',
    },

    views: {
      welcome: 'Witaj',
      users: {
        title: 'Uzytkownicy',
        email: 'Email',
        nickname: 'Login',
        id: 'ID',
        actions: 'Akcja',
        create: 'Stwórz użytkownika',
      },
      form: {
        users: {
          new: {
            title: 'Formularz rejestracji',
            create: 'Zatwierdz',
          },
          nickname: 'Login',
          password: 'Hasło',
          email: 'Email',
          isAdmin: 'Admin',
        },
        subjects: {
          name: 'Nazwa',
          localization: 'Lokalizacja',
        },
      },
      session: {
        new: {
          title: 'Formularz logowania',
        },
        signIn: 'Zaloguj się',
        signUp: 'Zapisz się',
        createAccount: 'Załóż konto',
      },
      subjects: {
        title: 'Obiekty',
        new: {
          title: 'Dodawanie obiektu',
        },
        create: 'Dodaj obiekt',
        id: 'ID',
        name: 'Nazwa',
        creator: 'Twórca',
        localization: 'Lokalizacja',
        nobody: 'Wygenerowane automatycznie',
      },
      manage: {
        submit: 'Stworzyć obiekt',
        delete: 'Kasować',
      },
    },

    errors: {
      minLength: 'Minimalna liczba znaków {{count}}',
      format: 'Nieprawidłowy format',
      requests: {
        404: 'Strona nie znaleziona',
      },
    },
  },
};
