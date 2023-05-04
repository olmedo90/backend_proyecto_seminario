import App from "./app";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}
//todo : is necessary review all env variables

const server: App = new App();
server.getAppServer().listen(process.env.PORT, () => {
    console.log(` App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});