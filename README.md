<h1 align="center">AI Translator</h1>
<p align="center">A simple web translator powered by chatgpt</p>
<p align="center"><img height="400px" src="https://user-images.githubusercontent.com/70902862/229665512-d88882d3-e18b-4635-9cb8-30e0d72869bc.png"/></p>



## Table of contents:

- [Description](#description)
- [Installation guide](#installation-guide)
  - [Initialize server](#initialize-server)
  - [Initialize client](#initialize-client)


## Description
This app translates text between many languages. It's able to recognize images and audios, and offers you a set of tools to interact with translated texts.

You can see a demo here: [clipborad by Wiler Mariñez](https://www.youtube.com/watch?v=KmyHG7ZwuOI)

## Installation guide

In this repository we have two projects, one for the web client and another one to deploy a python server which serves an API REST.

1. Fork or clone this repository

### Initialize server
1. Execute the following commands in the root directory to install all dependencies.
```bash
cd server
pip install -r requirements.txt
```
2. Set these environment variables:
```
OPENAI_API_KEY=<openai_api_key>
```
3. Execute the following command to run the server in development mode the app.
```bash 
uvicorn app:app --reload
```

### Initialize client
1. Execute the following commands in the root directory to install all dependencies.
```bash
cd client
npm install
```
2. Set these environment variables:
```
API_HOST=<server_url_here>
```
3. Execute the following command to run the client in development mode the app.
```bash 
npm run dev
```
> It will run the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
