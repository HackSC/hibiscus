<div align="center">
    <img src="images/hibiscus-platform-logo.png">
</div>
<h2 align="center">Hibiscus</h2>
<h3 align="center" style="font-style: italic;">An all-in-one, plug-and-play hackathon platform</h3>
<hr/>

As a part of our 2023's effort to revamp the entire organization, Engineering moved forward with a robust multiplatforms approach to enhance the event and experience for Hackers. This repository is the main monorepo / source of truth for all platforms created for HackSC by the Engineering organizer team. Our hope is that by open-sourcing our work, other organizations can easily adopt our platforms as basic infrastructure to hold their own hackathons.

This monorepo is powered by [Nx](https://nx.dev), a smart, fast and extensible build system.

## Technologies

- Next.js
- React
- styled-components
- Node.js
- Express.js
- Supabase
- AWS (DynamoDB, ECS)
- Hashicorp Waypoint (on HCP)

## Features

(we will add more as we continue developing out features and add more apps)

### Applications

- `/apps/sso`: our own HackSC SSO that provides authorization and authentication for users to access various Hibiscus platforms.
- `/apps/dashboard`: a dashboard/portal for hackers (normal participants) to access various services.
  - **Hacker portal**: for participants to register for our events. Also for hackers to check battlepass leaderboard and evets calendar during events.
  - **Sponsor portal**: for sponsors/partners to check participants who have checked into their booths/events.
  - **Identity portal**: for volunteers/admins to check-in participants to events using RFID wristbands.
- `/apps/podium`: our judging portal for judges to rank hackathon projects using a drag-and-drop list.

### Libraries

- `/libs/env`: library to preprocess environment variables, re-exporting them as a Typescript object for type safety
- `/libs/analytics`: React/Javascript scripts for web analytics purposes, including a modular script to automatically add Google Analytics 4 onto any React app.
- `/libs/types`: Typescript types to be reusable across apps
- `/libs/hibiscus-supabase-client`: wrapper for Supabase client
- `/libs/hibiscus-supabase-context`: React Context wrapping `hibiscus-supabase-client`
- `/libs/sso-client`: helper functions for SSO capabilities, middleware templates
- `/libs/styles`: (deprecated) various styles we use in HackSC for our design systems + injectable `GlobalStyles` objects to apply global fonts and colors to a React app.
- `/libs/ui`: (deprecated) this composes of 2 things:
  1. General wrapper elements for text and headings
  2. **Themeless UI kit**: when the hackathon is over, we use this theme
- `/libs/ui-kit-2023`: (deprecated) UI kit for HackSC 2023

### Generators and tools

- `/tools/generators/hacksc-nextjs-application`: we host all of our React and Next.js apps on Vercel, and there are particular Vercel commands for building and ignoring builds on Github PRs that needs to be overriden for builds to trigger from this monorepo correctly and efficiently. This generator creates a Next.js application, automatically creates a Vercel project and hooks this app up to this Vercel project.
- `/tools/generators/hacksc-node-service`: a generator for a generic Express.js backend service, with config files setup such as Docker and HCL files to deploy to our Waypoint cluster on AWS.

## Generate an application

Run `yarn nx g @nrwl/next:application` to generate a NextJS application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `yarn nx generate @nrwl/node:library my-library_name` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@hibiscus/mylib`.

## Development server

Run `yarn nx serve my-app` for a dev server. Navigate to http://localhost:4200/ (or the port specified by the app). The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `yarn nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `yarn nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `yarn nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `yarn nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `yarn nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `yarn nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `yarn nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
