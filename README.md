### **README.md**

---

# **City Management API**

A backend project for managing a collection of cities, built with **Node.js** and **Next.js App Router**. This project includes a set of RESTful APIs to perform CRUD operations on city data, with features like pagination, filtering, sorting, and search.

---

## **Features**
- **Add a New City**: Create a new city with unique details.
- **Update City Details**: Modify existing city data by ID.
- **Delete a City**: Remove a city from the database by ID.
- **Retrieve All Cities**: Get a list of cities with advanced query capabilities (pagination, filters, sorting, and projection).
- **Get City by ID**: Fetch details of a specific city.

---

## **Tech Stack**
- **Backend Framework**: Node.js with Next.js App Router for API routes.
- **Database**: MongoDB with Mongoose ODM.
- **Environment Management**: dotenv for secure environment variables.

---

## **Project Setup**

### **1. Prerequisites**
- **Node.js**: v16 or higher ([Download Node.js](https://nodejs.org)).
- **MongoDB**: Install locally or use [MongoDB Atlas](https://www.mongodb.com/atlas/database).

---

### **2. Clone the Repository**
```bash
git clone <repository-url>
cd <project-directory>
```

---

### **3. Install Dependencies**
Run the following command to install all required dependencies:
```bash
npm install
```

---

### **4. Configure Environment Variables**
1. Create a `.env` file in the project root directory.
2. Add the following environment variable:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
   Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials.

---

### **5. Start the Server**
Start the development server by running:
```bash
npm run dev
```

The server will start at:
```
http://localhost:3000
```

---

## **How to Test the API**

You can test the API endpoints using **Postman** or similar tools.

### **1. Install Postman**
Download and install [Postman](https://www.postman.com/downloads/).

---

### **2. Test API Endpoints**

#### **Add City**
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/cities`
- **Body** (JSON):
  ```json
  {
    "name": "Tokyo",
    "population": 13929286,
    "country": "Japan",
    "latitude": 35.6895,
    "longitude": 139.6917
  }
  ```
- **Expected Response**:
  ```json
  {
    "message": "City added successfully",
    "city": {
      "id": "unique-id",
      "name": "Tokyo",
      "population": 13929286,
      "country": "Japan",
      "latitude": 35.6895,
      "longitude": 139.6917
    }
  }
  ```

---

#### **Retrieve All Cities**
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/cities?page=1&limit=5`
- **Expected Response**:
  ```json
  {
    "total": 100,
    "page": 1,
    "limit": 5,
    "cities": [
      {
        "id": "unique-id",
        "name": "Tokyo",
        "population": 13929286,
        "country": "Japan",
        "latitude": 35.6895,
        "longitude": 139.6917
      }
    ]
  }
  ```

---

#### **Get City by ID**
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/cities/<city_id>`
- **Expected Response**:
  ```json
  {
    "message": "City retrieved successfully",
    "city": {
      "id": "unique-id",
      "name": "Tokyo",
      "population": 13929286,
      "country": "Japan",
      "latitude": 35.6895,
      "longitude": 139.6917
    }
  }
  ```

---

#### **Update City**
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/cities/<city_id>`
- **Body** (JSON):
  ```json
  {
    "name": "Updated Tokyo",
    "population": 15000000,
    "country": "Japan",
    "latitude": 35.6895,
    "longitude": 139.6917
  }
  ```
- **Expected Response**:
  ```json
  {
    "message": "City updated successfully",
    "city": {
      "id": "unique-id",
      "name": "Updated Tokyo",
      "population": 15000000,
      "country": "Japan",
      "latitude": 35.6895,
      "longitude": 139.6917
    }
  }
  ```

---

#### **Delete City**
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/cities/<city_id>`
- **Expected Response**:
  ```json
  {
    "message": "City deleted successfully",
    "deletedCity": {
      "id": "unique-id",
      "name": "Tokyo",
      "population": 13929286,
      "country": "Japan",
      "latitude": 35.6895,
      "longitude": 139.6917
    }
  }
  ```

---

### **3. Save Requests in Postman**
To streamline testing:
1. Create a **Collection** in Postman for this project.
2. Save each API request in the collection for easy access.

---

## **Documentation**

For detailed documentation on all API endpoints, request formats, and response structures, refer to the `exelon.pdf` file included in this repository.

---

## **Deployment**

If you wish to deploy the project to production:
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

---

## **Troubleshooting**

1. **MongoDB Connection Issues**:
   - Verify the `MONGO_URI` in your `.env` file.
   - Ensure MongoDB is running or your Atlas cluster is accessible.

2. **Dependencies Missing**:
   - Run `npm install` to ensure all dependencies are installed.

3. **API Errors**:
   - Check the console logs for detailed error messages.

---

## **Contributing**

Feel free to submit issues or pull requests for improvements to this project.

---