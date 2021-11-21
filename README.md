### Reviews-api
Atelier API endpoint for product reviews

# Dependencies:
- express v4.17.1
- mysql2 v2.3.3


# List Reviews
Returns a list of reviews for a particular product. This list does not include any reported reviews.

`GET /reviews/`

Query parameters:

Parameter	  Type	    Description
page	      integer	  Selects the page of results to return. Default 1.
count	      integer	  Specifies how many results per page to return. Default 5.
sort	      text	    Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
product_id	integer	  Specifies the product for which to retrieve reviews.

Response:
Status: 200 OK


# Get Review Metadata
Returns review metadata for a given product.

`GET /reviews/meta`

Query parameters:

Parameter	    Type	    Description
product_id	  integer	  Required ID of the product for which data should be returned

Response:
Status: 200 OK


# Add a Review
Adds a review for the given product.

`POST /reviews`

Body parameters:

Parameter	        Type	            Description
product_id	      integer	          Required ID of the product to post the review for
rating	          integer	          Integer (1-5) indicating the review rating
summary	          text	            (optional) Summary text of the review
body	            text	            Continued or full text of the review
recommend	        bool	            Value indicating if the reviewer recommends the product
name	            text	            Username for question asker
email	            text	            Email address for question asker
photos	          [ text ]	        Array of text urls that link to images to be shown
characteristics	  object literal	  Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}

Response:
Status: 201 CREATED


# Mark Review as Helpful
Updates a review to show it was found helpful.

`PUT /reviews/:review_id/helpful`

Request parameters:

Parameter 	Type	    Description
reveiw_id	  integer	  Required ID of the review to update

Response:
Status: 204 NO CONTENT


# Report Review
Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.

`PUT /reviews/:review_id/report`

Request parameters:

Parameter	  Type	    Description
review_id 	integer 	Required ID of the review to update

Response:
Status: 204 NO CONTENT
