import Express from "express";
import Dotenv from "dotenv";
Dotenv.config();

import { ChatConnector, UniversalBot, LuisRecognizer } from "botbuilder";

const server = Express();
server.listen(process.env.port || process.env.PORT || 3978, () => {
   console.log("%s listening to %s", server.name, server.path());
});

const connector = new ChatConnector();

server.post("/api/messages", connector.listen());

const bot = new UniversalBot(connector);

const luisAppId = process.env.LuisAppId;
const luisAPIKey = process.env.LuisAPIKey;
const luisAPIHostName = process.env.LuisAPIHostName || "westus.api.cognitive.microsoft.com";

const LuisModelUrl = "https://" + luisAPIHostName + "/luis/v2.0/apps/" + luisAppId + "?subscription-key=" + luisAPIKey;

// Create a recognizer that gets intents from LUIS, and add it to the bot
const recognizer = new LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);

bot.dialog("jobInfo", (session) => {
    session.send(session.message as any);
}).triggerAction({
    matches: "GetJobInformation"
});

bot.dialog("jobApply", (session) => {
    session.send(session.message as any);
}).triggerAction({
    matches: "ApplyForJob"
});

bot.dialog("noneIntent", (session) => {
    session.send(session.message as any);
}).triggerAction({
    matches: "Nonde"
});

bot.dialog("Utilities.Cancel", (session) => {
    session.send(session.message);
}).triggerAction({
    matches: "Utilities.Cancel"
});

bot.dialog("Utilities.Confirm", (session) => {
    session.send(session.message);
}).triggerAction({
    matches: "Utilities.Confirm"
});

bot.dialog("Utilities.Help", (session) => {
    session.send(session.message);
}).triggerAction({
    matches: "Utilities.Help"
});

bot.dialog("Utilities.StartOver", (session) => {
    session.send(session.message);
}).triggerAction({
    matches: "Utilities.StartOver"
});

bot.dialog("Utilities.Stop", (session) => {
    session.send(session.message);
}).triggerAction({
    matches: "Utilities.Stop"
});

bot.dialog("FindForm", (session) => {
    session.send(session.message);
}).triggerAction({
    matches: "FindForm"
});

bot.dialog("MoveEmployee", (session) => {
    session.send(session.message);
}).triggerAction({
    matches: "MoveEmployee"
});
