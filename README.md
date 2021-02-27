# Front tracker
![Иллюстрация к проекту](https://github.com/Victor1995fed/tracker-front/master/image/image.png)
### Системные требования:
- `docker >= 18.0` _(установка: `curl -fsSL get.docker.com | sudo sh`)_
-  `docker-compose >= 3` _([installing manual](https://docs.docker.com/compose/install/#install-compose))_


### Запуск:
- Для начала требуется установить [API](https://github.com/Victor1995fed/tracker)
- Далее ввести следующие команды в консоль: 
``` 
git clone https://github.com/Victor1995fed/tracker-front.git
cd  tracker-front
docker-compose up -d
docker-compose exec frontend make run 
```
- В файле ./src/settings.js указать URL для api:  ``` const ApiUrl = someurl ```
- Приложение будет доступно по [localhost:20088](http://localhost:20088)
- Тестовый пользователь указан в [API](https://github.com/Victor1995fed/tracker)

