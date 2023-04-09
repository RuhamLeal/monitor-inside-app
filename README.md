<a name="readme-top"></a>

<h1 align="center">Monitor Inside 💻</h1>

<details>
  <summary>Summary</summary><br />
  <ol>
    <li><a href="#about-the-project">About the Project</a></li>
    <li><a href="#technologies">Technologies</a></li>a
    <li><a href="#features">Features</a></li>
    <li><a href="#how-to-xecute-the-project">How to Execute the Project</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#about-trybe">About Trybe</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About the Project

Monitor Inside is a fullstack application that provides real-time information about your server and where you can manage your users

<details>
  <summary><strong>Details</strong></summary><br />

1️⃣ **Databases:**

- The mysql database saves the user data (password, name, email...) 
- The mongo database saves the server status every 5 seconds
- Docker MySQL container already configured in `docker-compose` with a service defined as `mysql`.
- Docker Mongo container already configured in `docker-compose` with a service defined as `mongo`.

2️⃣ **Back-end:**

- It runs on port `3001`.
- Nodejs Docker container already configured in `docker-compose` with a service defined as `node-server`.

3️⃣ **Front-end:**

- It runs on port `8081`.
- Nodejs (Vue) connected in Nginx Web server and container already configured in `docker-compose` with a service defined as `vue_client`.

</details>

<br/>

## Technologies
<details>
  <summary><strong>✨ Front-end</strong></summary><br />

- [HTML5][html5-url]
- [CSS3][css3-url]
- [Typescript][typescript-url]
- [Vue.js][vue-url]
- [Vuex][vuex-url]
- [Axios][axios-url]
- [dotenv][dotenv-url]
- [Joi][joi-url]

---

</details>

<details>
  <summary><strong>⚙️ Back-end</strong></summary><br />

- [Node.js][node-url]
- [Typescript][typescript-url]
- [MySQL][mysql-url]
- [Express][express-url]
- [Prisma][prisma-url]
- [JWT][jwt-url]
- [Bcryptjs][bcryptjs-url]
- [dotenv][dotenv-url]
- [Socket.io][socketio-url]

---

</details>
<br/>

## Features

<ul>
  <li>User login, both for common users and administrators.</li>
  <li>Real time visualization (one second delay) of the server state that is running the application</li>
  <li>Register, edit and remove users. Only available for administrator users</li>
</ul>

<br/>

## How to Execute the Project

To run the project locally, follow the steps below.

1. Check that your machine has the minimum configuration for the project to run;

- Unix Distribution Operating System;
- Docker;
- Docker-compose version equal to or greater than `1.29.2`.

2. Clone the repository;

```
git clone https://github.com/RuhamLeal/monitor-inside-app.git
```

3. Navigate to the root of the project;

```
cd ./monitor-inside-app
```

4. In the ./backend folder create an .env file from scratch with the contents of env.example

5. Run command to create the containers

```
docker-compose up -d --build
	
docker exec -it node_server sh
```

6. Inside the server container run:
```
npx prisma db push

npm run seed
```

7. Open your browser and paste the url http://localhost:8081#/login

8. Log in with:

```
password: AdminPass,
email: admin@admin.com

password: user,
email: user001@user.com,
```

<br/>

## Skills

<ul>
  <li>Data modeling with Prisma and Typescript.</li>
  <li>Application of the MSC (Model-Service-Controller) and DDD (Domain Driven Design) software architecture concept.</li>
  <li>Configuring Dockerfiles for back-end and front-end.</li>
  <li>Application of Object Oriented Paradigm (OOP) principles.</li>
  <li>Applying SOLID principles.</li>
</ul>

<br/>

## Contact

[![Linkedin][linkedin-badge]][linkedin-url]

<p align="right"><a href="#readme-top">Voltar ao topo</a></p>

<!-- MARKDOWN LINKS & IMAGES -->

[axios-url]: https://axios-http.com/docs/intro
[bcryptjs-url]: https://www.npmjs.com/package/bcryptjs
[cors-url]: https://www.npmjs.com/package/cors
[css3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[docker-url]: https://www.docker.com/
[dotenv-url]: https://www.dotenv.org/
[eslint-url]: https://eslint.org/
[express-url]: https://expressjs.com/
[html5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[jwt-url]: https://jwt.io/
[mysql-url]: https://www.mysql.com/
[vue-url]: https://vuejs.org/
[joi-url]: https://joi.dev/
[vuex-url]: https://vuex.vuejs.org/
[node-url]: https://nodejs.org/en/
[prisma-url]: https://www.prisma.io/
[socketio-url]: https://socket.io/
[typescript-url]: https://www.typescriptlang.org/
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/ruham-leal/
