# Setup Prisma

### Install required dependencies
```shell
    npm install prisma @types/node @types/pg --save-dev 
    npm install @prisma/client @prisma/adapter-pg pg dotenv
```

Here's what each package does:

`prisma` - The Prisma CLI for running commands like prisma init, prisma migrate, and prisma generate
`@prisma/client` - The Prisma Client library for querying your database
`@prisma/adapter-pg` - The node-postgres driver adapter that connects Prisma Client to your database
`pg` - The node-postgres database driver
`@types/pg` - TypeScript type definitions for node-postgres
`dotenv` - Loads environment variables from your .env file

###  Initialize Prisma ORM

```shell

    npx prisma

    # Next, set up your Prisma ORM project by creating your Prisma Schema file with the following command:

    npx prisma init --datasource-provider postgresql --output ../generated/prisma
```

Update your .env file with your PostgreSQL connection string:

```shell
    DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

Replace the placeholders with your actual database credentials:
-`username`: Your PostgreSQL username
-`password`: Your PostgreSQL password
-`localhost:5432`: Your PostgreSQL host and port
`mydb`: Your database name


### Define your data model

```prisma
    generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}

```


### Create and apply your first migration
```shell
# This command creates the database tables based on your schema.
    npx prisma migrate dev --name init

    # Now run the following command to generate the Prisma Client
    npx prisma generate
```


### Instantiate Prisma Client

```typescript
//  lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
```