# Nornex AS API Documentation

Complete REST API documentation for the Nornex AS IT Services Platform.

## Base URL

```
Development: http://localhost:4000/api
Production: https://api.nornex.no/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Headers

```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@nornex.no",
  "password": "admin123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "admin@nornex.no",
    "firstName": "Admin",
    "lastName": "Nornex",
    "role": "ADMIN"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.no",
  "password": "password123",
  "firstName": "Ola",
  "lastName": "Nordmann"
}
```

#### Get Profile (Protected)

```http
GET /auth/profile
Authorization: Bearer <token>
```

---

## Services

### Get All Services

```http
GET /services?lang=no&category=MANAGED_IT
```

**Query Parameters:**
- `lang` (optional): `no` or `en` (default: `no`)
- `category` (optional): `MANAGED_IT`, `PRODUCT_STUDIO`, or `SECURITY`

**Response:**
```json
[
  {
    "id": "uuid",
    "slug": "managed-endpoints",
    "category": "MANAGED_IT",
    "icon": "Monitor",
    "imageUrl": null,
    "title": "Administrerte Endepunkter & Servere",
    "description": "Proaktiv overvåking og administrasjon...",
    "features": [
      "Automatisk patching og oppdateringer",
      "24/7 overvåking med varsler"
    ]
  }
]
```

### Get Service by Slug

```http
GET /services/:slug?lang=no
```

### Get Service Categories

```http
GET /services/categories
```

**Response:**
```json
[
  { "key": "MANAGED_IT", "labelNo": "Managed IT & Reparasjon", "labelEn": "Managed IT & Repair" },
  { "key": "PRODUCT_STUDIO", "labelNo": "Produktstudio", "labelEn": "Product Studio" },
  { "key": "SECURITY", "labelNo": "Sikkerhet & Compliance", "labelEn": "Security & Compliance" }
]
```

### Get Services by Category

```http
GET /services/category/:category?lang=no
```

---

## Packages

### Get All Packages

```http
GET /packages?lang=no
```

**Response:**
```json
[
  {
    "id": "uuid",
    "slug": "core-it-care",
    "priceMonthly": 299,
    "isFeatured": false,
    "name": "Core IT Care",
    "description": "Grunnleggende IT-støtte for små bedrifter",
    "features": [
      "Helpdesk 8×5",
      "Automatisk patching",
      "Antivirus/EDR"
    ]
  }
]
```

### Get Package by Slug

```http
GET /packages/:slug?lang=no
```

---

## Inquiries (Contact Form)

### Submit Inquiry (Public)

```http
POST /inquiries
Content-Type: application/json

{
  "type": "GENERAL",
  "firstName": "Ola",
  "lastName": "Nordmann",
  "email": "ola@bedrift.no",
  "phone": "+47 123 45 678",
  "company": "Bedrift AS",
  "subject": "Forespørsel om Managed IT",
  "message": "Vi er interessert i deres tjenester...",
  "serviceSlug": "managed-endpoints",
  "packageSlug": "it-care-plus",
  "language": "no"
}
```

**Inquiry Types:**
- `GENERAL`
- `SERVICE`
- `SUPPORT`
- `QUOTE`
- `PARTNERSHIP`

### Get All Inquiries (Protected - Admin/Editor)

```http
GET /inquiries?page=1&limit=10&status=NEW
Authorization: Bearer <token>
```

**Inquiry Status:**
- `NEW`
- `IN_PROGRESS`
- `RESOLVED`
- `CLOSED`

### Get Inquiry Statistics (Protected)

```http
GET /inquiries/stats
Authorization: Bearer <token>
```

### Update Inquiry Status (Protected)

```http
PATCH /inquiries/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

### Assign Inquiry (Protected - Admin)

```http
PATCH /inquiries/:id/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-uuid"
}
```

---

## Testimonials

### Get All Testimonials

```http
GET /testimonials?lang=no&featured=true
```

**Response:**
```json
[
  {
    "id": "uuid",
    "authorName": "Kristian Nilsen",
    "authorRole": "Daglig leder",
    "company": "Bergen Bygg AS",
    "avatarUrl": null,
    "rating": 5,
    "isFeatured": true,
    "content": "Nornex har transformert måten vi jobber på..."
  }
]
```

### Get Featured Testimonials

```http
GET /testimonials/featured?lang=no&limit=3
```

### Get Testimonial by ID

```http
GET /testimonials/:id?lang=no
```

---

## Blog

### Get All Posts

```http
GET /blog/posts?lang=no&page=1&limit=10&tag=sikkerhet
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "slug": "5-tegn-du-trenger-managed-it",
      "imageUrl": null,
      "publishedAt": "2024-01-15T00:00:00.000Z",
      "author": {
        "id": "uuid",
        "name": "Erik Hansen"
      },
      "tags": [
        { "id": "uuid", "slug": "msp", "name": "Managed Services" }
      ],
      "title": "5 Tegn På At Bedriften Din Trenger Managed IT",
      "excerpt": "Hvordan vet du når det er på tide...",
      "content": "## Innledning\n\nIT-infrastrukturen...",
      "metaTitle": "5 Tegn På At Bedriften Din Trenger Managed IT | Nornex AS",
      "metaDesc": "Lær å gjenkjenne tegnene..."
    }
  ],
  "meta": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### Get Recent Posts

```http
GET /blog/posts/recent?lang=no&limit=3
```

### Get Post by Slug

```http
GET /blog/posts/:slug?lang=no
```

### Get All Tags

```http
GET /blog/tags?lang=no
```

**Response:**
```json
[
  { "id": "uuid", "slug": "sikkerhet", "name": "Sikkerhet" },
  { "id": "uuid", "slug": "gdpr", "name": "GDPR" },
  { "id": "uuid", "slug": "msp", "name": "Managed Services" }
]
```

---

## Users (Protected - Admin Only)

### Get All Users

```http
GET /users?page=1&limit=10
Authorization: Bearer <token>
```

### Get User by ID

```http
GET /users/:id
Authorization: Bearer <token>
```

### Update User

```http
PATCH /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "Name"
}
```

### Update User Role

```http
PATCH /users/:id/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "EDITOR"
}
```

**User Roles:**
- `ADMIN` - Full access
- `EDITOR` - Can manage content
- `USER` - Basic access

### Deactivate User

```http
PATCH /users/:id/deactivate
Authorization: Bearer <token>
```

### Delete User

```http
DELETE /users/:id
Authorization: Bearer <token>
```

---

## Settings

### Get All Settings

```http
GET /settings?lang=no
```

**Response:**
```json
{
  "company_name": "Nornex AS",
  "company_tagline": "Din IT-partner i Bergen",
  "company_description": "Nornex AS leverer profesjonelle IT-tjenester...",
  "contact_email": "post@nornex.no",
  "contact_phone": "+47 55 55 55 55",
  "address": "Strandgaten 123, 5004 Bergen, Norge",
  "org_number": "123 456 789 MVA",
  "hero_title": "IT-løsninger som driver din bedrift fremover",
  "hero_subtitle": "Fra proaktiv IT-drift til skreddersydde digitale løsninger..."
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden

```json
{
  "statusCode": 403,
  "message": "You do not have permission to perform this action"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 409 Conflict

```json
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

---

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 30 requests per minute for unauthenticated users

---

## Swagger UI

Interactive API documentation is available at:
```
http://localhost:4000/api/docs
```

Features:
- Try out all endpoints
- View request/response schemas
- Test authentication
- Download OpenAPI specification
