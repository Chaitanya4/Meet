<!--- STARTEXCLUDE --->
# Astra MeetDocs

MeetDocs meeting app for hearing impaired people.
Meeting website running on AstraDB that leverages the Document API.
<!--- ENDEXCLUDE --->

## Objectives
* Leverage Netlify and DataStax AstraDB
  
## How this works
We're using Create-React-App and the AstraDB Document API to create a simple website helping hearing impaired for attending online/offline meeting/conferences.  

## Prerequisites
Let's do some initial setup.

### DataStax Astra
1. Create a [DataStax Astra account](https://astra.datastax.com/register?utm_source=github&utm_medium=referral&utm_campaign=astra-tik-tok) if you don't 
already have one:
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-register-basic-auth.png)

2. On the home page. Locate the button **`Add Database`**
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-dashboard.png)

3. Pick **free plan** and a **region** close to you, click configure.
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-create-db-1-top.png)
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-create-db-1-bottom.png)

4. Define a **database name**, **keyspace name** and **credentials** (Take note of the DB Password)
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-create-db-2.png)

5. Your Astra DB will be ready when the status will change from *`Pending`* to **`Active`** 💥💥💥 
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-db-active.png)

6. After your database is provisioned, head to the `Connect` screen and copy your connection 
information (we'll need this later!):
![image](https://raw.githubusercontent.com/DataStax-Examples/sample-app-template/master/screenshots/astra-connect.png)


## 🚀 Getting Started Paths:
*Make sure you've completed the [prerequisites](#prerequisites) before starting this step*
  - [Running on your local machine](#running-on-your-local-machine)

### Running on your local machine
1. Create a `.env` file and fill it with values from the `.env.sample` file.

2. Make sure the package dependencies are installed
```sh
# install dependencies
npm install
```

3. Then, start the app in dev mode. Changes in the `src` or `functions` directories will trigger reloads.
```sh
# start in dev mode
npm run dev
```
<!--- ENDEXCLUDE --->