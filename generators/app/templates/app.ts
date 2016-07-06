import * as nconf from "nconf";
export class App {
    private static config = nconf.env().argv().file('config', 'config.json');
    
    static main(args : string[]) {
        console.log('Hello world!')
    }
}

App.main(process.argv)