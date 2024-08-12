# biz_link

## Overview

**biz_link** is a dynamic QR code generator for virtual business cards (vCards). The application allows users to create, manage, and order NFC-enabled business cards with embedded QR codes. The QR codes link to a dynamically updated vCard profile that can be accessed via NFC technology or by scanning the code.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Application Structure](#application-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dynamic QR Code Generation**: Automatically generates QR codes that link to a dynamic vCard URL.
- **NFC Compatibility**: Supports NFC-enabled business cards for easy data transfer.
- **User Authentication**: Provides user login and registration functionalities.
- **Admin Panel**: Allows administrators to manage card orders and user profiles.
- **Order Form**: Users can order custom business cards through a comprehensive form.

## Technologies Used

- **Frontend**: React, MUI (Material-UI), Axios
- **Backend**: Node.js, Express, MongoDB
- **QR Code Generation**: QRCode library

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Frontend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/lebogangolifant/biz_link.git
   cd biz_link
   ```

2. **Install Dependencies**
   ```bash
   cd src
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` File**
   Copy the `.env.example` file to `.env` and configure your API base URL:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the Frontend**
   ```bash
   npm start
   # or
   yarn start
   ```

### Backend Setup

For backend setup, refer to the [backend README](https://github.com/lebogangolifant/biz_link_server/blob/main/README.md).

## Application Structure

### Frontend

- **`src/App.js`**: Main application component with routing and theme configuration.
- **`src/components/Home.js`**: Home page with dynamic QR code functionality and order form.
- **`src/components/CardDetails.js`**: Displays detailed information about a specific card.
- **`src/components/auth`**: Contains login, registration, and password management components.
- **`src/components/admin`**: Admin panel components for managing cards and users.
- **`src/api.js`**: Configures Axios for API requests with authorization tokens.

### Backend

For backend application structure, refer to the [backend README](https://github.com/lebogangolifant/biz_link_server/blob/main/README.md).

## Usage

1. **Visit the Home Page**: Access the main page at `http://localhost:3000/` to view and interact with the QR code generator and order form.
2. **Login/Register**: Navigate to `/login` or `/register` to authenticate.
3. **Admin Panel**: Access the admin panel at `/admin` to manage card orders and user profiles.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
