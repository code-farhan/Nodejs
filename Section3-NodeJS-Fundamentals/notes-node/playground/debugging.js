var person = {
    name: 'Tolios'
};

person.age = 26;


debugger;// use it to stop to the place you want. Adds a breakpoint
// from here you can use the "repl" command to inspect your variables and objects


person.name = 'Mike';

console.log(person);


/*
* Summarize
* use "debugger;" inside your code to create a break point
* from termnal:
* a. run: node insect someFile.js someCommand
* or
* b. 0: run: node --inspect-brk someFile.js someCommand
*    1: go to chrome and type: chrome://inspect/
*       From there, make sure you are in the Devices submenu
*       and click on the link: "Open dedicated DevTools for Node"
* The first will run debugger in the cmd, while the latter
* will run in google dev tools!
*
* */


