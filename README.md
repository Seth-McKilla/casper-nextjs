This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Welcome to the Casper & Next JS Demo!

![image](https://user-images.githubusercontent.com/63591760/136881496-fbc5f9f3-2e84-4fed-a0e2-934675685e85.png)

The site itself actually serves as a walkthrough of the demo. The main goal of the project is to try to make it as seamless as possible to start creating dApps on the Casper blockchain. The demo currently walks through the key-value storage tutorial found within the [casper documentation](https://docs.casperlabs.io/en/latest/dapp-dev-guide/tutorials/kv-storage-tutorial.html). For the sake of brevity, three simple types have been included in the example: booleans, numbers, and strings.

### Navigate to the demo by visiting [casper-nextjs.vercel.app](https://casper-nextjs.vercel.app)

To get up and running with the project on your own machine, first add a set of your private and public keys in the root directory within a folder called "casper_keys" (the gitignore already includes this folder)

Then simply run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Future plans for the project

#### ☐ QA/QC bugs with the update functionality
  Running the project on your local machine with the "casper_key" folder correctly updates all values on the contract, but the production site has problems fetching the keys.
#### ☐ Further integration with the CasperLabs Signer
#### ☐ Setup additional api route examples for storing / updating more complex data types, making transfers between difference users.
