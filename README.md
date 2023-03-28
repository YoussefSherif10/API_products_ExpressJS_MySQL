# Products API USING ExpressJS and MySQL

In this project, I developed a RESTful API for products in an E-Commerce app. that gives the client all the CRUD functionalities.
I used expressJS for routing the requests and MySQL database for storing the products and retrieving them.

the attributes of the Product Model are id which is a primary key, name, description, and price.
there is a functionality to retrieve the products that are above a threshold price too.

according to the single responsibility design principle, I constructed the project in different layers where each layer is responsible for just one task.

the app is the entry point of the project and it initializes the server. the config is to configure the host, the username, the password, and the database to be able to connect to the MySQL server.

for the products, the DAO(Data Object Layer) is used to interface with the D.B. by making queries. it can also create a new Product Model. The controller layer is used to abstract the DAO, abstract the DAO, and Validate the incoming requests and it is used as callbacks (Route Handlers) to be called by the route Layer. The Route layer is used to integrate a URL that comes with a certain HTTP method to a handler.


