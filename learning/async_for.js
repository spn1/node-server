async function fetch_fruits() {
  const fruits = ["apple", "banana", "orange", "grape"];

  for await (const fruit of fruits) {
    console.log(fruit);

    // a dummy async operation simulation
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  }
}

fetch_fruits();
