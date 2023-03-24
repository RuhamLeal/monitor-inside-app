
1.Na pasta backend criar arquivo .env da raiz com o conteudo que tem dentro do env.example

2.Rodar para criar os containers

	docker-compose up -d --build
	
	docker exec -it node_server sh
	
3.Dentro do container do servidor rode:
	
	npx prisma db push
	
	npm run seed

4.Abrir http://localhost:8081#/login

5.Usuarios para fazer login

	password: AdminPass,
	email: admin@admin.com

	password: user,
	email: user001@user.com,

 
