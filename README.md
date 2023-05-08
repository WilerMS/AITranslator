<h1 align="center">AI Translator</h1>
<p align="center">A simple web translator powered by chatgpt</p>
<p align="center">
  <img height="300px" src="https://user-images.githubusercontent.com/70902862/230276406-5133c1b4-c9f8-4ef9-8944-e7e4824c4648.png"/>
  <img height="300px" src="https://user-images.githubusercontent.com/70902862/230276156-0bb4151c-7a6f-482a-9376-9877600e26b1.png"/>


</p>



## Table of contents:

- [Description](#description)
- [Installation guide](#installation-guide)
  - [Initialize server](#initialize-server)
  - [Initialize client](#initialize-client)


## Description
This app translates text between many languages. It's able to recognize images and audios, and offers you a set of tools to interact with translated texts.

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
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
