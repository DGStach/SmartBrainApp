Zapraszam do korzystania z aplikacji pod linkiem: 
https://dgstach.github.io/smartBrainAppFrontend/

Aplikacja służy do wykrywania i zaznaczania twarzy na zdjęciach. 

Użytkowanik po zalogowaniu może załadować zdjęcie: 
- z pliku
- używając linku http
- używając gotowych przykładów, klikając na przycisk "use link"
- robiąc je aparatem po wybraniu przycisku  "chose png/jpg file".
  
Po naciśnięciu przycisku "DETECT" aplikacja komunikuje się z Servisem Clarifai i uzyskuje koordynaty wykrytych twarzy za pomocą wytrenowanego modelu w serwisie. Następnie aplikacja zaznacza twarze i zwiększa licznik wykorzystania aplikacji przez aktualnego użytkownika. 

Do zalet typu User Friendly należy:
- pamięć sesji użytkownika
- możliwość podglądnięcia hasła podczas jego wprowadzania
- wskazówki podczas tworzenia konta użytkownika w formularzu rejestracyjnym
- spinner
- responsywny wygląd dla różnych rozdzielczości

Do zalet typu seciurity należy:
- brak klucza oraz Id użytkownika z Servisu Califarii na froncie 
- haszowanie hasła na backendzie za pomocą bcrypt hashSync
- wymagania stawiane użytkownikowi dotyczące jakości wprowadzanego hasła 
