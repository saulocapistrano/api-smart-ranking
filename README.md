<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A tennis management application built with the <a href="http://nodejs.org" target="_blank">Node.js</a> <b>NestJS</b> framework, featuring players, categories, challenges, matches, and ranking functionalities.
</p>

<p align="center">
<a href="https://github.com/nestjs/nest" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NestJS Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Twitter" /></a>
</p>

---

## About this project

This application is designed to help a tennis instructor manage resources and matches. Players can be assigned to categories, send and respond to challenges, record match results, and view ranking points. It leverages **NestJS** for a structured, modular approach and **MongoDB** as a database.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) (or npm if you prefer)
- A running instance of [MongoDB](https://www.mongodb.com/) (local or cloud)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tennis-app.git
   ```
2. **Navigate into the project directory**:
   ```bash
   cd tennis-app
   ```
3. **Install dependencies**:
   ```bash
   yarn install
   ```

## Running the Project

```bash
# Development
yarn run start

# Watch mode (auto-reload on file changes)
yarn run start:dev

# Production build
yarn run build
yarn run start:prod
```

## Testing

```bash
# Unit tests
yarn run test

# End-to-end tests
yarn run test:e2e

# Test coverage
yarn run test:cov
```

## Project Modules

- **Players**: Create, update, and list tennis players, including personal details.  
- **Categories**: Manage categories like A, B, etc., including assigned players and scoring events.  
- **Challenges**: Handle match challenges between players, acceptance/rejection, and scheduling.  
- **Matches**: Record match results, update statuses, and generate ranking data.  
- **Rankings**: Calculate and display player rankings based on match outcomes.

## Deployment

When you’re ready for production, you can deploy to any environment that supports Node.js. For detailed steps, refer to NestJS’s [deployment documentation](https://docs.nestjs.com/deployment).

If you’d like a cloud-based solution specifically for NestJS, consider checking out [NestJS Mau](https://mau.nestjs.com).

## Contributing

1. **Fork** the repository.  
2. **Create** a new branch for your feature or fix.  
3. **Commit** your changes with clear messages.  
4. **Open** a Pull Request explaining your changes.

## Further Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Discord Community](https://discord.gg/G7Qnnhy)
- [Courses](https://courses.nestjs.com/)
- [Twitter @nestframework](https://twitter.com/nestframework)

## License

This project is [MIT licensed](LICENSE). NestJS is also [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).