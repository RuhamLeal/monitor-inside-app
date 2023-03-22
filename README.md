
Rodar para criar os containers

	docker-compose up -d --build
	
	docker exec -it node_server sh
	
Dentro do container do servidor rode:
	
	npx prisma db push
	
	npm run seed


Usuarios para fazer login

	"password": "user",
	"email": "user001@user.com",

	"password": "AdminPass",
	"email": "admin@admin.com"
