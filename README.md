# Atelier Reviews API
Endpoint for product reviews

# Dependencies:
- express v4.17.1
- mysql2 v2.3.3
- nodemon v2.0.15
- dotenv v10.0.0

### List Reviews:
Returns a list of reviews for a particular product. This list does not include any reported reviews.

`GET /reviews` <br />
Query parameters:
| Parameter | Type | Description |
| :---: | :---: | :--- |
| `page` | integer | Selects the page of results to return - default 1 |
| `count`	| integer	| Specifies how many results per page to return - default 5. |
| `sort` | string | Changes the sort order of reviews to be based on "newest", "helpful", or "relevant" |
| `product_id` | integer | Specifies the product for which to retrieve reviews. |

Response: <br />
Status: `200 OK`
<br />
<br />

### Add a Review:
Adds a review for the given product.

`POST /reviews` <br />
Body parameters:
| Parameter | Type | Description |
| :---: | :---: | :--- |
| `product_id` | integer | Required ID of the product to post the review for |
| `rating` | integer | 1-5 indicating the review rating |
| `summary` | string | (optional) Summary text of the review - if none, the empty string "" should be sent |
| `body` | string | Continued or full text of the review |
| `recommend` | boolean | Value indicating if the reviewer recommends the product |
| `name` | string | Username for question asker |
| `email` | string | Email address for question asker |
| `photos` | JSON array | Array of string urls that link to images to be shown |
| `characteristics` | JSON object | Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...} |

Response: <br />
Status: `201 CREATED`
