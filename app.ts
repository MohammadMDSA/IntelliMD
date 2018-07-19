import Restify from "restify";
import { ChatConnector, UniversalBot } from "botbuilder";

const server = Restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
   console.log("%s listening to %s", server.name, server.url);
});

const connector = new ChatConnector();

server.post("/api/messages", connector.listen());

const bot = new UniversalBot(connector, session => {
    session.send(session.message.text as string);
});
