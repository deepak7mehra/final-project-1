
# This is a Turborepo project , which contains implementation of PAYTM wallet . 


## Using this example

Run the following command to run locally

```sh
npx create-turbo@latest
```

## What's inside?

- src/app/user-app : contains user wallet , thorugh which user can make transcation
- src/app/bank-webhook : replicated webhook service 

-packages/db : contains primsa implementation 
-packages/store : contains recoil implementation 
-packages/ui : contains sharable ui components 




### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

