import { Args } from "grimoire-kolmafia";

export const args = Args.create(
  "hatchlings",
  "A simple script to help you find and use familiar hatchlings you didn't know you had.",
  {
    use: Args.flag({
      setting: "",
      default: false,
      help: "When used, will attempt to use any familiar hatchlings for familiars you don't have in your terrarium.",
    }),
    useLimit: Args.number({
      setting: "tptb.hatchlings.useLimit",
      default: 0,
      help: "Defines the price limit when using hatchlings. For example, if you set this to 10000, it won't use any hatchlings with an acquire price greater than 10,000 meat.",
    }),
    buy: Args.flag({
      setting: "",
      default: false,
      help: 'When used, will attempt to acquire any hatchlings that hatch into familiars you don\'t have priced below your "buyLimit". Does not use the hatchlings, you can use this in conjunction with the use command to buy and use.',
    }),
    buyLimit: Args.number({
      setting: "tptb.hatchlings.buyLimit",
      default: 0,
      help: "Defines the price limit for buying hatchlings.",
    }),
    sim: Args.flag({
      setting: "",
      default: false,
      help: "When used with another flag, will simply simulate what the result would be instead of actually performing it.",
    }),
  }
);
