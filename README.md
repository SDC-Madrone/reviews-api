### Reviews-api
Atelier API endpoint for product reviews

# Dependencies:
- express v4.17.1
- mysql2 v2.3.3


# List Reviews
Returns a list of reviews for a particular product. This list does not include any reported reviews.

`GET /reviews`

Query parameters:

Parameter	  Type	    Description
page	      integer	  Selects the page of results to return. Default 1.
count	      integer	  Specifies how many results per page to return. Default 5.
sort	      text	    Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
product_id	integer	  Specifies the product for which to retrieve reviews.

Response:
Status: 200 OK


# Add a Review
Adds a review for the given product.

`POST /reviews`

Body parameters:

Parameter	        Type	            Description
product_id	      integer	          Required ID of the product to post the review for
rating	          integer	          Integer (1-5) indicating the review rating
summary	          text	            (optional) Summary text of the review - if none, the empty string "" should be sent
body	            text	            Continued or full text of the review
recommend	        bool	            Value indicating if the reviewer recommends the product
name	            text	            Username for question asker
email	            text	            Email address for question asker
photos	          [ text ]	        Array of text urls that link to images to be shown
characteristics	  object literal	  Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}

Response:
Status: 201 CREATED
