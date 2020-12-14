# 1.1 Обобщенная характеристика предметной области
## 1.1.1 Характеристика объекта исследования

Объектом исследования этой работы является абстрактная модель веб-сервиса предоставления IT-услуг.
Такой сервис обычно представляет из себя посредника между исполнителем и заказчиком.
На первый взгляд может показаться, что люди не любят посредников в вопросах товаров и услуг, т.к. посредники ничего не делают для результата, а только получают комиссию. Отчасти это действительно так, многие предпочтут напрямую договориться пусть не с лучшим специалистом, но зато "своим".
Однако, практика последнего десятилетия показывает, что в общественном сознании "договориться через сервис" стало нормой. Это удобно и заказчикам, и исполнителям.
Потребителям стало нравиться выбирать исполнителя по рейтингу, а заказ по нужным параметрам, смотреть отзывы и ставить оценки по итогу работы. Собственный рейтинг("звёзды", "оценка", "карма") стал цениться, как вложенное в его набор время, и как деньги, которые он будет приносить в будущем.
Система двухсторонних отзывов компенсирует традиционную несправедливость рынка: нечестный участник был в более выгодном положении, чем честный.
Мы воспринимаем веб-сервисы поиска исполнителей, как неодушевлённые помощники в повседневных делах или бизнесе, которые связывают нас с живым исполнителем, ведут формальный протокол и хранят историю. И это недалеко от истины, участие живого человека со стороны сервиса требуется только в спорных случаях.
Работа без участия человека важное условие, без которого не выйдет установить достаточно низкую комиссию.
Конкурентная комиссия не должна превышать психологический барьер, выше которого участникам будет проще самим заниматься поисками и оформлять договоры.

Рассмотрим типовой сценарий использования сервиса заказа IT услуг:  
* У заказчика есть потребность в услуге.
* Заказчик формулирует задание на услугу.
* Заказчик пополняет свой счёт в сервисе.
* Заказчик публикует задание с указанием ожидаемой стоимости выполнения, сроками.
* Исполнитель просматривает задание, оценивает его трудоёмкость и оставляет отклик с указанием стоимости исполнения.
* Заказчик видит отклики по заданию и может поручить его исполнителю, если согласен со стоимостью работы.
* После поручения задания стоимость выполнения и комиссия сервиса списывается со счета заказчика.
* Исполнитель выполняет задание.
* Исполнитель публикует результаты в сервисе.
* Заказчик получает результаты
* Если заказчика устраивает качество работы, то он подтверждает завершение задания. Стоимость работы переходит на счет исполнителя.
* Если заказчика не устраивает качество работы, то он открывает спор по заданию
* Споры разрешает арбитр сервиса
По такому сценарию работают многие фриланс сайты.

Еще каких-то 30 лет назад о веб-сервисах предоставления IT-услуг даже не мечтали. В конце 90-х годов в нашей стране только был запущен сайт Яндекс, и люди постепенно осваивали просторы сети для своих нужд. Но спектр услуг в этой области расширялся, заказчики и исполнители начинали коммуницировать через тематические гостевые книги, форумы и доски объявлений. Где, как не в сети, находить заказчиков и исполнителей в IT? Основными профилями работ на первых фриланс биржах начала 00-х годов были: разработка ПО и сайтов, веб-дизайн, верстка html, переводы текстов. Отправной точкой появления веб-сервисов предоставления IT-услуг в России можно обозначить принято считать сайт fl.ru. Это был первый сервис, который по-настоящему смог свести заказчика-исполнителя и реализовывать многие задумки. Идея этого сайта появилась у авторов в 2003. Сайт позволял расширить выбор задач и выбор исполнитей, что повышало конкуренцию, а значит и уровень выпускаемых работ. Сайт FL.ru, который позже переедет на домен Free-lance.ru, был опубликован 14-го мая 2005 года.Теперь 14-го мая отмечается день фрилансера.
В 2012 году идея фриланса вышла за рамки IT-услуг. На ряду с IT, теперь на "юду" можно заказать вообще всё что угодно. Например отвести собаку на груминг, или выкопать котлован для фундамента. Благодаря удобным налоговым сервисам исполнители не испытывают проблем с декларацией каждого выполненного заказа. На схеме 1 мы видим развитие сервисов по предосталению IT-услуг, от первого появления поисковиков до прогрессивных сайтов (например,kwork.ru), имеющих собственную политику, единицу внутренней валюты и строгие регламенты в отношениях заказчик-исполнитель. Так прослеживается пусть к надежным и защищенным сделкам.

<br/> 
<br/> 
<br/> 

![alt text](img/timeline.svg?raw=true)

<br/> 
<br/>

[источник](https://www.kommersant.ru/doc/1832981)
[источник](https://freelance.today/)
[источник](https://ru.wikipedia.org/wiki/Youdo)
[источник](https://vc.ru/promo/60905-kwork-interview)

Типовая архитектура веб-сервиса состоит из базы данных, бэкенда (сервера приложения), одного или нескольких фронтендов (клиентов приложения). Все данные (пользователи, заказы, отклики, история и т.д.) хранятся в базе данных в нормализованном виде без дублирования и аномалий. Бэкенд предоставляет API для клиентов в виде набора запросов с параметрами и форматом ответов на запросы (например запрос авторизации, или запрос создания отклика). При обработке запроса бэкенд может считывать или записывать данные в базу. Клиенты, как правило, двух видов: сайт и приложение для телефона. Они строятся на разных технологиях, но принцип один: предоставить пользователю удобный интерфейс для взаимодействия с приложением по API. Например, по клику на кнопку авторизации клиент валидирует поля формы и если проверка прошла, то передаёт значения полей в запрос авторизации.

<br/> 
<br/> 

![alt text](img/classic-app.svg?raw=true)

<br/> 
<br/> 

Применяемые технологии в разных компаниях сервисах могут отличаться, но архитектура почти всегда такая.  
Для написания бэкенда могут использоваться языки: C++, Java, Python, JS.  
Основные варианты БД: MySql, Oracle, Postgresql.  
Клиенты строятся на стэке HTML, CSS, JS с использованием фрэймворков React или Angular.  

Можно выделить основные группы пользователей, для которых будет полезен сервис заказа юзабилити аудита:  
* Владельцы бизнеса, заказчики ПО. Могут использовать сервис для оценки работы UI дизайнеров и ПО в целом.
* Фрилансеры, учащиеся, просто люди, которые хотят повлиять на тренды в пользовательских интерфейсах. Например, когда уже удалят неработающие формы связи с оператором? Когда клик по номеру телефона будет открывать приложение для звонка?
* Профильные фирмы по тестированию ПО. Иногда испытывают перебои в заказах, эти паузы могут заполнять заказами из сервиса.
* Дизайнеры и специалисты по юзабилити могут использовать сервис для анализа действий пользователей. Изначально идея этого сервиса появилась, чтобы дизайнер мог быстро предоставить заказчику аргументы почему его предложение неудобно для пользователей. Часто бывает, что специалисты в своей области заблуждаются, что покупатель мечтает изучить его предмет во время покупки товара, а просто слова дизайнера интерфейсов на него не действуют.

Чем плох штатный тестировщик?  
Тем, что он знает продукт со всеми особенностями. У него не будет проблем с пониманием интерфейса.  

Как влияет текущая мировая ситуация на веб-сервисы предоставления IT-услуг:
С одной стороны положительно - появилось, много удаленных работников, готовых брать заказы и стало больше потребителей. Если услуга может быть предоставлена и онлайн, и оффлайн, то в 2020-ом мы чаще выбираем онлайн.
С одной стороны отрицательно - из-за кризиса мало инвесторов готовых вкладывать в новые проекты. Некоторая часть удаленных работников только недавно потеряла основную работу и пока недостаточно переквалифицировалась.

В качестве темы работы была выбрана абстрактная модель, а не конкретный веб-сервис. Это позволит создать удобный инструмент без привязки к особенностям какого-либо бренда. Это значительно сокращает сроки реализации прототипа. При этом не мешает в будущем использовать исходный код прототипа с небольшими изменениями в известном работающем веб-сервисе предоставления услуг.


