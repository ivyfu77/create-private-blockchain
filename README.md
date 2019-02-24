# Project #3. RESTful API for Blockchain

This is Project 3, RESTful API for Blockchain, in this project I created the classes to manage RESTful APIs, to be able to get & post block from & to blockchain stored in LevelDB.

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node app.js__ in the root directory.

## Testing the API

#### GET endpoint:
"localhost:8000/api/block/{height}"
*_height_*: number, the height of the block you want to get.

#### POST endpoint:
"localhost:8000/api/block"
*_payload: { 'body': 'the block body you want to add' }_*



