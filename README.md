# Blogging Platform with AWS S3 Image Upload

## About

A robust blogging platform built with Node.js, Express, PostgreSQL, and React, featuring AWS S3 image uploads, user roles, and OTP support for enhanced security.

## Features

- **User Authentication and Authorization**: Secure authentication with JWT and role-based access control for admin, editor, and user roles.
- **Post Creation and Management**: Users can create, edit, and delete blog posts. Each post includes a title, content (HTML), cover photo, and tags.
- **AWS S3 Image Upload**: Seamless integration with AWS S3 for uploading and storing cover photos, ensuring efficient and scalable image management.
- **Responsive UI**: User-friendly interface built with React, providing a responsive and intuitive experience across different devices.
- **One-Time Password (OTP) Support**: Enhanced security with OTP verification for critical actions like password resets, powered by SendGrid.

## Technologies Used

- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: React
- **File Upload**: AWS S3, multer, multer-s3
- **Authentication**: JWT, bcrypt
- **Email**: SendGrid

## Installation and Setup

1. **Clone the repository**:

   ```sh
   git clone https://github.com/itsandrewm/users-node.git
   ```

2. **Install dependencies**:

   ```sh
   cd your-repo-name
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your environment variables:

   ```env
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=your_aws_region
   AWS_BUCKET_NAME=your_s3_bucket_name
   SENDGRID_API_KEY=your_sendgrid_api_key
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=your_frontend_url
   ```

4. **Run the application**:
   ```sh
   yarn start
   ```

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements, bug fixes, or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
