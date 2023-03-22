
1.Rodar para criar os containers

	docker-compose up -d --build
	
	docker exec -it node_server sh
	
2.Dentro do container do servidor rode:
	
	npx prisma db push
	
	npm run seed

3.Abrir http://localhost:8080/#/login

Usuarios para fazer login

	"password": "user",
	"email": "user001@user.com",

	"password": "AdminPass",
	"email": "admin@admin.com"
