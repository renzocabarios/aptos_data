import {
  Account,
  AccountAddressInput,
  Aptos,
  AptosConfig,
  Network,
} from "@aptos-labs/ts-sdk";
import fs from "fs";
// User wallet

async function main() {
  const config = new AptosConfig({ network: Network.MAINNET });
  const aptos = new Aptos(config);

  const transactions = await aptos.getAccountTransactions({
    accountAddress:
      "0x97a1720cd5f84a739e8427533bfdfbbc32f41298b88dad69652e9cec9138540b" as AccountAddressInput,
  });

  for (const transaction of transactions) {
    if (transaction.type == "user_transaction") {
      for (const event of transaction.events) {
        console.log(event);
      }
      //   console.log(transaction.payload);
      //   console.log(transaction.timestamp);
    }
  }

  const textData =
    transactions
      .map(
        (tx: any) =>
          `Hash: ${tx.hash} | Sender: ${tx.sender} | Function: ${tx.payload.function}`
      )
      .join("\n") + "\n";

  fs.appendFileSync("module_transactions.txt", textData);
  console.log(transactions.length);

  //   const transactions = await aptos.getTransactions({});

  //   for (const transaction of transactions) {
  //     if (transaction.type == "user_transaction") {
  //       //   console.log(transaction);
  //       console.log(transaction.payload);
  //       console.log(transaction.timestamp);
  //     }
  //   }
}

main()
  .then((e) => {
    console.log("Script Done");
  })
  .catch((e) => {
    console.log(e);
  });

// Transfer Events
// Mint Events

// Choose a random wallet from the explorer
// Create a script that can fetch the events of a transaction
// Persist the data to a text file. Sample format could be. Time stamp, Event Name
// NOTICE: After some time ask the participants to dictate all the events created, What's the most called event, and the least called event
