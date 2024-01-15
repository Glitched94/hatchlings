import { Args } from "grimoire-kolmafia";
import { args } from "./lib/args";
import { Familiar, Item, buy, print, printHtml, retrievePrice, toString, use } from "kolmafia";
import { $familiars, have } from "libram";

export default function main(command: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  var hatchlings: Familiar[] = $familiars``.filter((fam) => !have(fam));

  if (args.buy) {
    if (args.buyLimit <= 0) {
      throw "You buyLimit is set to 0, please set a real value and try again.";
    }

    buyItems(hatchlings);
  }

  // Get just the list of items they have available
  const haveFams: Familiar[] = hatchlings.filter((fam) => have(fam.hatchling));

  if (args.use) {
    useHatchlings(haveFams);
    return;
  }

  if (!args.buy) {
    print(
      `Found ${haveFams.length} hatchlings in your inventory that you haven't hatched before...`,
      "green"
    );
    const output = [
      "<table border=2 cols=3><tr><th>Familiar</th><th>Hatchling</th><th>Mall Price</th></tr>",
    ];

    haveFams.forEach((fam) => {
      output.push(
        "<tr>" +
          `<td><p>${fam}</p></td>` +
          `<td><p>${fam.hatchling}</p></td>` +
          `<td><p>${toString(retrievePrice(fam.hatchling), "%,d")}</p></td>` +
          "</tr>"
      );
    });

    output.push("</table>");
    printHtml(output.join(""));
  }
}

function buyItems(fams: Familiar[]): void {
  const dontHave = fams.filter((fam) => !have(fam.hatchling));
  let totalPrice = 0;
  let hatchlingCount = 0;
  dontHave.forEach((fam) => {
    const itemPrice = retrievePrice(fam.hatchling);
    if (itemPrice > 0 && itemPrice < args.buyLimit) {
      totalPrice += itemPrice;
      hatchlingCount++;
      if (args.sim) {
        print(`Sim: Buying 1 ${fam.hatchling} at ${toString(itemPrice, "%,d")}`);
      } else {
        buy(1, fam.hatchling, args.buyLimit);
      }
    }
  });

  if (args.sim) {
    print(
      `You'd spend ${toString(totalPrice, "%,.0f")} meat to get ${hatchlingCount} new hatchlings`,
      "green"
    );
  }
}

function useHatchlings(inv: Familiar[]): void {
  print(
    `Found ${inv.length} familiar hatchlings in your inventory that you haven't hatched before...`,
    "green"
  );

  inv.forEach((item) => {
    if (args.sim) {
      simUsage(item);
    } else {
      realUsage(item);
    }
  });
}

function simUsage(fam: Familiar): void {
  const price = retrievePrice(fam.hatchling);
  if (args.useLimit > 0 && price > args.useLimit) {
    print(
      `Sim: Skipping ${fam.hatchling} because it's too expensive. (${toString(price, "%,d")} meat)`,
      "orange"
    );
  } else {
    print(`Sim: Using 1 ${fam.hatchling}`);
  }
}

function realUsage(fam: Familiar): void {
  const price = retrievePrice(fam.hatchling);
  if (args.useLimit > 0 && price > args.useLimit) {
    print(
      `Skipping ${fam.hatchling} because it's too expensive. (${toString(price, "%,d")} meat)`,
      "orange"
    );
  } else {
    use(1, fam.hatchling);
  }
}
